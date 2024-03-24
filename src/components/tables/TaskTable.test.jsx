import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import TaskTable from './TaskTable';

describe('TaskTable component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter> {/* Wrap TaskTable with BrowserRouter */}
        <TaskTable />
      </BrowserRouter>
    );
  });

  it('displays tasks fetched from API', async () => {
    // Mock the fetch function to return a specific set of tasks
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { id: 1, title: 'Task 1', owner: { username: 'user1' }, category: { title: 'Category 1' }, status: 100, active: true },
          { id: 2, title: 'Task 2', owner: { username: 'user2' }, category: { title: 'Category 2' }, status: 200, active: true }
        ]),
      })
    );

    const { getByText } = render(
      <BrowserRouter> {/* Wrap TaskTable with BrowserRouter */}
        <TaskTable />
      </BrowserRouter>
    );

    // Wait for the component to render and fetch data
    await waitFor(() => {
      // Check if the task titles are rendered
      expect(getByText('Task 1')).toBeInTheDocument();
      expect(getByText('Task 2')).toBeInTheDocument();

      // You can add more assertions here based on your component's rendering logic
    });
  });
});
