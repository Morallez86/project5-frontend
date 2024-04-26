import languages from '../../translations';
import { FormattedMessage, IntlProvider } from 'react-intl';
import { userStore } from "../../stores/UserStore";

const TaskInformation = ({ userDetails }) => {
    const locale = userStore((state) => state.locale);
    // Check if userDetails is null, and provide default values for taskCounts and totalTasks
    const { taskCounts = {}, totalTasks = 0 } = userDetails || {};

    // Assign counts for tasks in each status (To Do, Doing, Done), or default to 0 if not available
    const tasksTodo = taskCounts[100] || 0;
    const tasksDoing = taskCounts[200] || 0;
    const tasksDone = taskCounts[300] || 0;

    return (
        <IntlProvider locale={locale} messages={languages[locale]}>
        <div className="text-white mt-8 flex justify-center">
            <div className="bg-cyan-900/60 border border-cyan-950 rounded-md p-6 md:p-12 backdrop-filter backdrop-blur-sm bg-opacity-30">
                <h2 className="text-2xl font-semibold text-white mb-4">
                    <FormattedMessage id="userTasks" defaultMessage="User Tasks" />
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <p className="text-lg font-semibold mb-2">
                            <FormattedMessage id="todoP" defaultMessage="To Do: " />
                        {tasksTodo}</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold mb-2">
                            <FormattedMessage id="doingP" defaultMessage="Doing: " />
                        {tasksDoing}</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold mb-2">
                            <FormattedMessage id="doneP" defaultMessage="Done: " />
                        {tasksDone}</p>
                    </div>
                </div>
                <p className="mt-4 text-lg">
                    <FormattedMessage id="totalTasksP" defaultMessage="Total Tasks: " />
                    {totalTasks}</p>
            </div>
        </div>
        </IntlProvider>
    );
}

export default TaskInformation;
