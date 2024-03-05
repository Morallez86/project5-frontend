import React from 'react';
import Sidebar from '../components/navbar/Sidebar';

function Activity(){
    return(
        <div className="Activity" id="activity-outer-container">
            <Sidebar pageWrapId={'activity-page-wrap'} outerContainerId={'activity-outer-continer'} />
            <div className="page-wrap" id="activity-page-wrap">
                <h1>My Activities</h1>
            </div>
        </div>
    );
};

export default Activity;