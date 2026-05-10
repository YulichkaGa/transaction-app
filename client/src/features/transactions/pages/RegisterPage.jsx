import { useState } from 'react';

import { register } from '../../../api/authApi';

import { translations } from '../constants/translations.js'

function RegisterPage() {
    const [fullName, setFullName] = useState('');

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [language, setLanguage] = useState('en');

    const t = translations[language];

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const result = await register({
                fullName,
                email,
                password,
            });

            localStorage.setItem(
                'token',
                result.token
            );

            alert(t.register);
        } catch {
            alert(t.registerFailed);
        }
    };

    return (
        <div
            style={{
                padding: 40,
                direction:
                    language === 'he'
                        ? 'rtl'
                        : 'ltr',
            }}
        >
            <button
                type="button"
                onClick={() =>
                    setLanguage(
                        language === 'en'
                            ? 'he'
                            : 'en'
                    )
                }
            >
                {language === 'en'
                    ? 'עברית'
                    : 'English'}
            </button>

            <h1>{t.register}</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder={t.fullName}
                    value={fullName}
                    onChange={(event) =>
                        setFullName(
                            event.target.value
                        )
                    }
                />

                <br />
                <br />

                <input
                    type="email"
                    placeholder={t.email}
                    value={email}
                    onChange={(event) =>
                        setEmail(
                            event.target.value
                        )
                    }
                />

                <br />
                <br />

                <input
                    type="password"
                    placeholder={t.password}
                    value={password}
                    onChange={(event) =>
                        setPassword(
                            event.target.value
                        )
                    }
                />

                <br />
                <br />

                <button type="submit">
                    {t.register}
                </button>
            </form>
        </div>
    );
}

export default RegisterPage;