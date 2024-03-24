import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddTaskInformation from './AddTaskInformation';

describe('AddTaskInformation component', () => {
  it('fetches categories and displays them in the select element', async () => {
    const categoriesMock = [
      { id: 1, title: 'Category 1' },
      { id: 2, title: 'Category 2' },
      { id: 3, title: 'Category 3' },
    ];

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(categoriesMock),
    });

    const {getByText } = render(
      <MemoryRouter>
        <AddTaskInformation />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getByText('Category 1')).toBeInTheDocument();
      expect(getByText('Category 2')).toBeInTheDocument();
      expect(getByText('Category 3')).toBeInTheDocument();
    });
  });
});
