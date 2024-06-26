import {User, Budget, Item} from 'lib/data';
import {
  createItem,
  createBudget,
  createBudgetSync,
  createUser,
} from 'lib/data/utils';

// This file exists so tests can reuse these fake mock types
// whenever updating data types, we can change them here so tests don't break
export const defaultTestUser: User = createUser({
  id: 'test_user',
  total_budget: 2000,
  remaining_budget: 2000,
  pending_event: 0,
  completed_event: 0,
  planned_event: 0,
  name: 'test_user',
  user_type: 'RSO',
});

export const defaultTestBudget: Budget = createBudgetSync({
  id: 'test_budget',
  user_id: 'test_user',
  user_name: 'test_user',
  event_name: 'event_name',
  event_description: 'test description',
  event_type: 'Food',
});

export const defaultTestItem: Item = createItem({
  budget_id: 'test_budget_for_items',
  unit_price: 10,
  id: 'test_item',
  name: 'testing item',
  quantity: 2,
  current_status: 'created',
  url: 'test',
  vendor: 'test',
});
