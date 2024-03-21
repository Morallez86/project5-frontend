import React from 'react';

function TasksListColumn({ title, children }) {
    return (
        <div className="text-white items-center basis-1/3 text-center text-main">
            <div className="bg-cyan-900/60 border h-full border-cyan-950 rounded-md p-8 backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
                <h2 className="text-2xl border-2 border-cyan-950 bg-cyan-900/80 rounded p-2 mx-0">{title}</h2>
                <div className="mt-4">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default TasksListColumn;
