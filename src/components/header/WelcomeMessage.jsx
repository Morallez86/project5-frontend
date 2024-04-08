import React from 'react';
import { FormattedMessage } from 'react-intl';

const WelcomeMessage = ({ username }) => {
  return (
    <span className="text-lg font-bold ml-4">
      <FormattedMessage id="greeting" values={{ username }} />
    </span>
  );
};

export default WelcomeMessage;
