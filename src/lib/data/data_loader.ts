import {Comment, Budget, Item, Status, StatusChange, User} from '.';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {IDatabase} from './database';
import {Collections} from '../firebase/config';
import {Filter, Sort, Database} from './database';

export class DataModel {
  database: IDatabase;
  constructor(database: IDatabase = Database) {
    this.database = database;
  }

  /** BUDGETS **/
  // Get a budget by ID
  getBudget(budgetID: string): Promise<Budget> {
    return this.database.getDocument<Budget>(Collections.Budgets, budgetID);
  }

  // Get a sorted and filtered list of budgets
  getBudgets(
    filters: Filter[] = [],
    howMany = 25,
    sort?: Sort
  ): Promise<Budget[]> {
    return this.database.getDocuments<Budget>(
      Collections.Budgets,
      filters,
      sort,
      howMany
    );
  }

  // Get a sorted and filtered list of budgets from a particular user
  getBudgetsForUser(
    user_id: string,
    filters: Filter[] = [],
    howMany = 25,
    sort?: Sort
  ): Promise<Budget[]> {
    filters.push(new Filter('user_id', '==', user_id));
    return this.getBudgets(filters, howMany, sort);
  }

  // Get a sorted and filtered list of submitted budgetes
  getBudgetsSubmitted(
    filters: Filter[] = [],
    howMany = 25,
    sort?: Sort
  ): Promise<Budget[]> {
    filters.push(new Filter('current_status', '==', 'submitted'));
    return this.getBudgets(filters, howMany, sort);
  }

  // Adds the given budget to the database
  async addBudget(budget: Budget): Promise<void> {
    const user_id = budget.user_id;
    const user = (await this.getUser(user_id)) as User;
    user.planned_event += 1;
    await this.database.addDocument(Collections.Users, user);
    return this.database.addDocument(Collections.Budgets, budget);
  }

  /** ITEMS **/
  // getItemsForBudget returns 'howMany' items in budget 'budgetID's'
  async getItemsForBudget(
    budgetID: string,
    sort?: Sort,
    filters: Filter[] = [],
    howMany = 25
  ): Promise<Item[]> {
    filters.push(new Filter('budget_id', '==', budgetID));
    return this.database.getDocuments<Item>(
      Collections.Items,
      filters,
      sort,
      howMany
    );
  }

  async addItem(item: Item): Promise<void> {
    await this.database.addDocument(Collections.Items, item);
    try {
      const budget: Budget = await this.getBudget(item.budget_id);
      const user: User = await this.getUser(budget.user_id);
      const total = item.unit_price * item.quantity;
      budget.total_cost += total;
      user.remaining_budget -= total;

      // Write changes to Firestore
      await this.addBudget(budget);
      await this.setUser(user);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async addItems(items: Item[]): Promise<void> {
    if (items.length === 0) return Promise.resolve();
    let sameBudget = true;
    const lastId = items[0].budget_id;
    items.forEach(
      item => (sameBudget = sameBudget && lastId === item.budget_id)
    );
    if (!sameBudget) {
      return Promise.reject(
        new Error('all items passed to addItems should have the same budget_id')
      );
    }
    try {
      const budget: Budget = await this.getBudget(lastId);
      const user: User = await this.getUser(budget.user_id);
      const total: number = items.reduce((cumulative, current) => {
        return cumulative + current.unit_price * current.quantity;
      }, 0);
      budget.total_cost += total;
      user.remaining_budget -= total;
      // Write changes to Firestore
      await this.database.addManyDocuments(Collections.Items, items);
      await this.addBudget(budget);
      await this.setUser(user);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  // [This function was generated with copilot]
  async getItem(itemID: string): Promise<Item> {
    return this.database.getDocument<Item>(Collections.Items, itemID);
  }

  /** COMMENTS **/
  // Get a comment by ID
  getComment(commentID: string): Promise<Comment> {
    return this.database.getDocument<Comment>(Collections.Comments, commentID);
  }

  // Adds a comment to an item
  // The comment will not be added to the list of previous comments
  // until pushItemComment is called.  If stageItemComment is called
  // twice without a pushItemComment, the first comment will be lost.
  // This will also add the item to the budget's list of denied items.
  // [This function was generated with copilot and then edited]
  async stageItemComment(itemID: string, comment: Comment): Promise<void> {
    await this.database.addDocument(Collections.Comments, comment);
    const item: Item = await this.database.getDocument<Item>(
      Collections.Items,
      itemID
    );
    item.commentID = comment.id;
    await this.database.addDocument(Collections.Items, item);

    const budget: Budget = await this.getBudget(item.budget_id);
    budget.denied_items.push(item.id);
    await this.database.addDocument(Collections.Budgets, budget);
  }

  // Deletes the item's staged comment.  If the comment is pushed, it can no longer
  // be deleted.  This will also remove the item from the budget's list of
  // denied items.
  async popItemComment(itemID: string): Promise<void> {
    const item = await this.getItem(itemID);
    const budget = await this.getBudget(item.budget_id);
    const comment = await this.getComment(item.commentID);
    await this.database.deleteDocument(Collections.Comments, comment);
    item.commentID = '';
    budget.denied_items = budget.denied_items.filter(id => id !== itemID); // Copilot
    await this.database.addDocument(Collections.Items, item);
    await this.database.addDocument(Collections.Budgets, budget);
  }

  // Pushes the staged comment to the item's list of previous comments
  // Clear the current comment.  Once a comment is pushed, it cannot
  // be edited.  RSO comments are intended to be pushed when the budget
  // is resubmitted.  SGA comments are intended to be pushed when the
  // budget review is submitted (i.e. denied)
  // TODO: Throw an error if there is no staged comment
  async pushItemComment(itemID: string): Promise<void> {
    const item: Item = await this.database.getDocument<Item>(
      Collections.Items,
      itemID
    );
    item.prev_commentIDs.push(item.commentID);
    item.commentID = '';

    // Remove the item from the budget's list of denied items
    const budget = await this.getBudget(item.budget_id);
    budget.denied_items = budget.denied_items.filter(id => id !== itemID); // Copilot
    await this.database.addDocument(Collections.Budgets, budget);

    return await this.database.addDocument(Collections.Items, item);
  }

  // Stage a comment for a budget
  // See the comment on stageItemComment for more information
  async stageBudgetComment(budgetID: string, comment: Comment): Promise<void> {
    await this.database.addDocument(Collections.Comments, comment);
    const budget: Budget = await this.database.getDocument<Budget>(
      Collections.Budgets,
      budgetID
    );
    budget.commentID = comment.id;
    return await this.database.addDocument(Collections.Budgets, budget);
  }

  // Deletes the staged budget comment
  async popBudgetComment(budgetID: string): Promise<void> {
    const budget = await this.getBudget(budgetID);
    const comment = await this.getComment(budget.commentID);
    await this.database.deleteDocument(Collections.Comments, comment);
    budget.commentID = '';
    return this.database.addDocument(Collections.Budgets, budget);
  }

  // Push a comment for a budget
  // TODO: Throw an error if there is no staged comment
  // [This function was generated with copilot]
  async pushBudgetComment(budgetID: string): Promise<void> {
    const budget: Budget = await this.database.getDocument<Budget>(
      Collections.Budgets,
      budgetID
    );
    budget.prev_commentIDs.push(budget.commentID);
    budget.commentID = '';
    return await this.database.addDocument(Collections.Budgets, budget);
  }

  // Push all comments for a budget including item comments
  // TODO: Throw an error if there is no staged comment
  async pushAllBudgetComments(budgetID: string): Promise<void> {
    const items = await this.getItemsForBudget(budgetID);
    items.forEach(async item => {
      await this.pushItemComment(item.id);
    });
    return await this.pushBudgetComment(budgetID);
  }

  // Clear all comments on items
  async clearItemComments(budgetID: string): Promise<void> {
    const items = await this.getItemsForBudget(budgetID);
    items.forEach(async item => {
      await this.popItemComment(item.id);
    });
  }

  /** USERS **/
  getUser(userID: string): Promise<User> {
    return this.database.getDocument<User>(Collections.Users, userID);
  }

  async setUser(user: User): Promise<void> {
    await this.database.addDocument(Collections.Users, user);
  }

  async changeBudgetStatus(budget: Budget, newStatus: Status) {
    budget.current_status = newStatus;
    const currentDateTime = new Date().toISOString();
    // Create new status by tuple type format
    const newStatusChange: StatusChange = {
      status: newStatus,
      when: currentDateTime,
    };
    // Chage the tuple to array to save previous status. Tuple -> Array -> Add newStatusChange -> Tuple
    const historyLog: StatusChange[] = budget.status_history as StatusChange[];
    historyLog.unshift(newStatusChange);
    budget.status_history = historyLog as [StatusChange];
    return this.database.addDocument(Collections.Budgets, budget); // Save the change to the document
  }

  async changeItemStatus(item: Item, newStatus: Status) {
    item.current_status = newStatus;
    return this.database.addDocument(Collections.Items, item);
  }
}

export const DefaultModel = new DataModel(Database);
