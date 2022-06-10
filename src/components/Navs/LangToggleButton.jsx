import React, { useEffect, useState } from 'react';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const LangToggleButton = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const onSetLang = ([, newLang]) => setLanguage(newLang);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <ToggleButtonGroup
      type="checkbox"
      className="ms-3 btn-light"
      value={language}
      onChange={onSetLang}

    >
      <ToggleButton variant="outline-secondary" id="tbg-btn-1" value="en">
        {t('languages.en')}
      </ToggleButton>
      <ToggleButton variant="outline-secondary" id="tbg-btn-2" value="ru">
        {t('languages.ru')}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LangToggleButton;
