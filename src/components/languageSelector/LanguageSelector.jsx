import React from 'react';
import { userStore } from '../../stores/UserStore';
import languages from '../../translations';

const LanguageSelector = () => {
    const locale = userStore((state) => state.locale);
    const setLocale = userStore((state) => state.updateLocale);

    const handleLocaleChange = (e) => {
        const selectedLocale = e.target.value;
        setLocale(selectedLocale);
    };

    return (
        <select
        className="text-black ml-2 rounded"
        value={locale}
        onChange={handleLocaleChange}
        >
        {Object.keys(languages).map((lang) => (
            <option key={lang} value={lang}>
            {lang}
            </option>
        ))}
        </select>
    );
    };

export default LanguageSelector;
