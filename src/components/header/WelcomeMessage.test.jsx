// WelcomeMessage.test.jsx
import React from 'react';
import { render } from '@testing-library/react';
import WelcomeMessage from './WelcomeMessage';

describe('WelcomeMessage component', () => {
  it('renders the welcome message with the provided username', () => {
    const username = 'TestUser';
    const { getByText } = render(<WelcomeMessage username={username} />);
    const welcomeMessageElement = getByText(`Welcome, ${username}!`);
    expect(welcomeMessageElement).toBeInTheDocument();
  });
});
