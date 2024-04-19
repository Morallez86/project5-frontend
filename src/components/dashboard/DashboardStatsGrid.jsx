import React from 'react'
import { ImUsers } from "react-icons/im";
import { FaTasks } from "react-icons/fa";
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

export default function DashboardStatsGrid() {
	return (
		<div className="flex gap-12">
            <BoxWrapper>
				<div className="grid grid-cols-2 h-full">
                <div className="flex flex-col items-center space-y-4 justify-center border-r border-gray-300 ">
					<div>
                    <div className="rounded-full h-12 w-12 m-2 flex items-center justify-center bg-sky-500">
                        <ImUsers className="text-2xl text-white" />
                    </div>
					</div>
                    <div className="p-2 text-center">
                        <span className="text-sm text-gray-500 font-light">Total Users</span>
                        <div className="flex items-center justify-center">
                            <strong className="text-xl text-gray-700 font-semibold">$54232</strong>
                        </div>
                        <span className="text-sm text-gray-500 font-light">Confirmed Users</span>
                        <div className="flex items-center justify-center">
                            <strong className="text-xl text-gray-700 font-semibold">$54232</strong>
                        </div>
                        <span className="text-sm text-gray-500 font-light">Pending Users</span>
                        <div className="flex items-center justify-center">
                            <strong className="text-xl text-gray-700 font-semibold">$54232</strong>
                        </div>
                    </div>
                </div>

				</div>
            </BoxWrapper>
			<BoxWrapper>
                <div className="flex flex-col items-center justify-center">
                    <div className="rounded-full h-12 w-12 m-2 flex items-center justify-center bg-sky-500">
                        <FaTasks className="text-2xl text-white" />
                    </div>
                    <div className="p-2 text-center">
                        <span className="text-sm text-gray-500 font-light">Average Tasks/User</span>
                        <div className="flex items-center justify-center">
                            <strong className="text-xl text-gray-700 font-semibold">$54232</strong>
                        </div>
                        <span className="text-sm text-gray-500 font-light">Confirmed Users</span>
                        <div className="flex items-center justify-center">
                            <strong className="text-xl text-gray-700 font-semibold">$54232</strong>
                        </div>
                        <span className="text-sm text-gray-500 font-light">Pending Users</span>
                        <div className="flex items-center justify-center">
                            <strong className="text-xl text-gray-700 font-semibold">$54232</strong>
                        </div>
						<span className="text-sm text-gray-500 font-light">Pending Users</span>
                        <div className="flex items-center justify-center">
                            <strong className="text-xl text-gray-700 font-semibold">$54232</strong>
                        </div>
                    </div>
                </div>
			</BoxWrapper>
			
		</div>
	)
}

function BoxWrapper({ children }) {
	return <div className="bg-white rounded-md p-4 flex-1 border border-gray-200  items-center justify-center">{children}</div>
}