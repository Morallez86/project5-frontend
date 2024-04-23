import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function LineChartComponent({ userRegistrationData, tasksFinalDate }) {

  return (
    <div className="flex flex-col gap-8 sm:flex-row sm:gap-12">
      <BoxWrapper>
        <div className="bg-white rounded-md p-4 flex-1 border border-gray-200  items-center justify-center">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={userRegistrationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name"  tick={{ fontSize: 10 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="bg-white rounded-md p-4 flex-1 border border-gray-200  items-center justify-center">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={tasksFinalDate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }}/>
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="tasks" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </BoxWrapper>
    </div>
  );
}

function BoxWrapper({ children }) {
  return <div className="bg-white rounded-md border w-full border-gray-200">{children}</div>;
}

export default LineChartComponent;
