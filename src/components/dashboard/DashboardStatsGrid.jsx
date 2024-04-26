import React, { useState, useEffect } from 'react';
import { ImUsers } from "react-icons/im";
import { FaTasks } from "react-icons/fa";
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { userStore } from '../../stores/UserStore';
import { BiSolidCategory } from "react-icons/bi";
import { FormattedMessage, IntlProvider } from 'react-intl';
import languages from '../../translations';

export default function DashboardStatsGrid({averageTaskCompletionTime, webSocketupdateUserDashboardStats, webSocketcategoryStats}) {
	const locale = userStore((state) => state.locale);
    const [searchResults, setSearchResults] = useState([]);
    const [dashboardStats, setDashboardStats] = useState(null);
	const token = userStore((state) => state.token);
    const [userDetails, setUserDetails] = useState(null);
    const [searchedUserId, setSearchedUserId] = useState(null);
    // Check if userDetails is null, and provide default values for taskCounts and totalTasks for a User
    const { taskCounts = {}, totalTasks = 0 } = userDetails || {};
    // Assign counts for tasks in each status (To Do, Doing, Done), or default to 0 if not available
    const tasksTodoUser = taskCounts[100] || 0;
    const tasksDoingUser = taskCounts[200] || 0;
    const tasksDoneUser = taskCounts[300] || 0;
    const [categoryStats, SetCategoryStats] = useState([]);

    useEffect(() => {
        if (webSocketupdateUserDashboardStats) {
            setDashboardStats(webSocketupdateUserDashboardStats);
        }
    }, [webSocketupdateUserDashboardStats]);

    useEffect(() => {
    if (webSocketcategoryStats) {
        SetCategoryStats(webSocketcategoryStats);
    }
    }, [webSocketcategoryStats]);

    // Fetch dashboard statistics
    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/dashboards/userTaskStats', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        token: token,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setDashboardStats(data);
                    console.log(data);
                } else {
                    throw new Error('Failed to fetch dashboard statistics');
                }
            } catch (error) {
                console.error('Error fetching dashboard statistics:', error);
            }
        };

        if (token) {
            fetchDashboardStats();
        }
    }, [token]);

    useEffect(() => {
        const fetchCategoryStats = async () => {
            try {
                const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/dashboards/categoryStats', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        token: token,
                    },
                });

                if (response.ok) {
                    const categoryStats = await response.json();
                    SetCategoryStats(categoryStats)
                    console.log('Category Stats:', categoryStats);
                } else {
                    throw new Error('Failed to fetch category statistics');
                }
            } catch (error) {
                console.error('Error fetching category statistics:', error);
            }
        };

        if (token) {
            fetchCategoryStats();
        }
    }, [token]);

    // Fetch user profile details based on searchedUserId
    useEffect(() => {
        const fetchUserProfileDetails = async () => {
            if (searchedUserId && token) {
                try {
                    const response = await fetch(
                        `http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/profileDetails/${searchedUserId}`,
                        {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                token: token,
                            },
                        }
                    );

                    if (response.ok) {
                        const userDetails = await response.json();
                        setUserDetails(userDetails);
                    } else {
                        throw new Error('Failed to fetch user details');
                    }
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            }
        };

        fetchUserProfileDetails();
    }, [searchedUserId, token]);

    if (!dashboardStats) {
        return <div>Loading...</div>;
    }

    const handleSearch = (string) => {
        if (string.length >= 2) {
            fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/search?query=${string}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    token: token,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Search request failed');
                    }
                })
                .then((data) => {
                    const formattedResults = data.map((item) => ({
                        id: item.id,
                        name: item.username,
                    }));
                    setSearchResults(formattedResults);
                })
                .catch((error) => {
                    console.error('Error searching users:', error);
                    setSearchResults([]);
                });
        } else {
            setSearchResults([]);
        }
    };

	const handleOnHover = (result) => {
    };

	const handleOnSelect = (item) => {
        setSearchedUserId(item.id);
    };

    const handleOnFocus = () => {
    };

    const formatResult = (item) => {
        return (
            <div>
                <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span>
                <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>
            </div>
        );
    };

    const averageTasksPerUser = dashboardStats.totalActiveUsers
    ? (dashboardStats.totalTasks / dashboardStats.totalActiveUsers).toFixed(2)
    : 0;

	return (
        <IntlProvider locale={locale} messages={languages[locale]}>
    <div className="flex flex-col gap-8 sm:flex-row sm:gap-12">
        <BoxWrapper>
            <div className="grid grid-cols-2 h-full">
                <div className="flex flex-col items-center space-y-4 p-2 border-r border-gray-300">
                    <div>
						<div className='flex items-center justify-center'>
                        <div className="rounded-full h-12 w-12 m-2 flex items-center  justify-center bg-sky-500">
                            <ImUsers className="text-2xl text-white" />
                        </div>
						</div>
                    <div className="p-2 text-center">
                        <span className="text-sm text-gray-500 font-light">
                            <FormattedMessage id="totalUsers" defaultMessage="Total Users" />
                        </span>
                        <div className="flex items-center justify-center">
                            <strong className="text-xl text-gray-700 font-semibold">{dashboardStats.totalUsers}</strong>
                        </div>
                        <span className="text-sm text-gray-500 font-light">
                            <FormattedMessage id="confirmedUsers" defaultMessage="Confirmed Users" />
                        </span>
                        <div className="flex items-center justify-center">
                            <strong className="text-xl text-gray-700 font-semibold">{dashboardStats.totalActiveUsers}</strong>
                        </div>
                        <span className="text-sm text-gray-500 font-light">
                            <FormattedMessage id="pendingUsers" defaultMessage="Pending Users" />
                        </span>
                        <div className="flex items-center justify-center">
                            <strong className="text-xl text-gray-700 font-semibold">{dashboardStats.totalPendingUsers}</strong>
                        </div>
						<span className="text-sm text-gray-500 font-light invisible">Pending Users</span>
                        <div className="flex items-center justify-center">
                            <strong className="text-xl text-gray-700 font-semibold invisible"></strong>
                        </div>
                    </div>
					</div>
                </div>
                <div className="border-b-2 py-4 px-2 cursor-progress">
                    <ReactSearchAutocomplete
                        items={searchResults}
                        onSearch={handleSearch}
                        onHover={handleOnHover}
                        onSelect={handleOnSelect}
                        onFocus={handleOnFocus}
                        autoFocus
                        formatResult={formatResult}
                    />
                    <div className="p-2 text-center">
                        <span className="text-sm text-gray-500 font-light">
                            <FormattedMessage id="totalTasks" defaultMessage="Total Tasks" />
                        </span>
                        <div className="flex items-center justify-center">
                            <strong className="text-xl text-gray-700 font-semibold">{totalTasks}</strong>
                        </div>
                        <span className="text-sm text-gray-500 font-light">
                            <FormattedMessage id="toDoTasks" defaultMessage="To Do Tasks" />
                        </span>
                        <div className="flex items-center justify-center">
                            <strong className="text-xl text-gray-700 font-semibold">{tasksTodoUser}</strong>
                        </div>
                        <span className="text-sm text-gray-500 font-light">
                            <FormattedMessage id="doingTasks" defaultMessage="Doing Tasks" />
                        </span>
                        <div className="flex items-center justify-center">
                            <strong className="text-xl text-gray-700 font-semibold">{tasksDoingUser}</strong>
                        </div>
                        <span className="text-sm text-gray-500 font-light">
                            <FormattedMessage id="doneTasks" defaultMessage="Done Tasks" />
                        </span>
                        <div className="flex items-center justify-center">
                            <strong className="text-xl text-gray-700 font-semibold">{tasksDoneUser}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </BoxWrapper>
        <BoxWrapper>
            <div className="grid grid-cols-2 h-full">
                <div className="flex flex-col items-center space-y-4 p-2 border-r border-gray-300">
                    <div>
						<div className='flex items-center justify-center'>
                        <div className="rounded-full h-12 w-12 m-2 flex items-center  justify-center bg-sky-500">
                            <FaTasks className="text-2xl text-white" />
                        </div>
						</div>
						<div className="p-2 text-center">
                    <span className="text-sm text-gray-500 font-light">
                        <FormattedMessage id="averageTasksUser" defaultMessage="Average Tasks/User" />
                    </span>
                    <div className="flex items-center justify-center">
                        <strong className="text-xl text-gray-700 font-semibold">{averageTasksPerUser}</strong>
                    </div>
                    <span className="text-sm text-gray-500 font-light">
                        <FormattedMessage id="avarageTaskCompletion" defaultMessage="Avarage Task Completion" />
                    </span>
                    <div className="flex items-center justify-center">
                        <strong className="text-xl text-gray-700 font-semibold">{averageTaskCompletionTime}</strong>
                    </div>
                    <span className="text-sm text-gray-500 font-light">
                        <FormattedMessage id="toDoTasks" defaultMessage="To Do Tasks" />
                    </span>
                    <div className="flex items-center justify-center">
                        <strong className="text-xl text-gray-700 font-semibold">{dashboardStats.taskCountsByStatus[100]}</strong>
                    </div>
                    <span className="text-sm text-gray-500 font-light">
                        <FormattedMessage id="doingTasks" defaultMessage="Doing Tasks" />
                    </span>
                    <div className="flex items-center justify-center">
                        <strong className="text-xl text-gray-700 font-semibold">{dashboardStats.taskCountsByStatus[200]}</strong>
                    </div>
                    <span className="text-sm text-gray-500 font-light">
                        <FormattedMessage id="doneTasks" defaultMessage="Done Tasks" />
                    </span>
                    <div className="flex items-center justify-center">
                        <strong className="text-xl text-gray-700 font-semibold">{dashboardStats.taskCountsByStatus[300]}</strong>
                    </div>
                </div>
				</div>
				</div>
				<div className="flex flex-col items-center space-y-4 p-2 border-gray-300">
                    <div>
						<div className='flex items-center justify-center'>
                        <div className="rounded-full h-12 w-12 m-2 flex items-center  justify-center bg-sky-500">
                            <BiSolidCategory className="text-2xl text-white" />
                        </div>
						</div>
                        <span className="text-sm text-gray-500 font-light">
                            <FormattedMessage id="CategoryListCount" defaultMessage="Category List (count)" />
                        </span>
						<div className="overflow-y-auto max-52 ">
                            
                            {categoryStats.map((category, index) => (
                            <div key={index} className="flex flex-row items-center rounded mt-2 mb-2 border border-black p-1">
                            <strong className="text-l text-gray-700 font-semibold">{category.categoryTitle}</strong>
                            <span className="ml-auto text-sm text-gray-500 font-light">{category.taskCount}</span>
                        </div>
                    ))}
                </div>

				</div>
				</div>
            </div>
        </BoxWrapper>
    </div>
    </IntlProvider>
	)
}

function BoxWrapper({ children }) {
	return <div className="bg-white rounded-md p-4 flex-1 border border-gray-200  items-center justify-center">{children}</div>
}