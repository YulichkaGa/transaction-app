import './LanguageToggle.css';

function LanguageToggle({ language, setLanguage, t }) {
    return (
        <div className="language-toggle">
            <button
                type="button"
                className={language === 'en' ? 'active-language' : ''}
                onClick={() => setLanguage('en')}
            >
                {t.languageEnglish}
            </button>

            <button
                type="button"
                className={language === 'he' ? 'active-language' : ''}
                onClick={() => setLanguage('he')}
            >
                {t.languageHebrew}
            </button>
        </div>
    );
}

export default LanguageToggle;