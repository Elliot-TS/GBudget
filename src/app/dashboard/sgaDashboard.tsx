import {BudgetList} from './budget';
import {SGADashboardSidebar} from './sidebar';
import {DataModel, User} from 'lib/data';

export async function SGADashboard({
  user,
  dataModel: dataModel,
}: {
  user: User;
  dataModel: DataModel;
  TESTING_FLAG?: boolean;
}) {
  const budgets = await dataModel.getBudgetsSubmitted();

  return (
    <>
      <SGADashboardSidebar user={user} />

      <main className="w-128 mt-16">
        <BudgetList budgets={budgets} show_organizer={true} />
      </main>
    </>
  );
}
