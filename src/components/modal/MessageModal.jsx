import React from 'react';
import languages from '../../translations';
import { FormattedMessage, IntlProvider } from 'react-intl';
import { userStore } from "../../stores/UserStore";

const MessageModal = ({ isOpen, onClose, title, message}) => {
  const locale = userStore((state) => state.locale);

  return (
    <>
    <IntlProvider locale={locale} messages={languages[locale]}>
      {isOpen && (
        <div className=" inset-0 z-10 flex">
          <div className="fixed inset-0 bg-black opacity-75"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-white bg-cyan-900 p-6 rounded-lg z-20">
            <h2 className="text-lg font-bold mb-4 text-white">{title}</h2>
            <p className=" text-white">{message}</p>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-slate-400 text-white rounded hover:bg-slate-500"
                onClick={onClose}
              >
                <FormattedMessage id="cancelButton" defaultMessage="Cancel" />
              </button>
            </div>
          </div>
        </div>
      )}
      </IntlProvider>
    </>
  );
};

export default MessageModal;
