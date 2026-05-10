import { useState } from 'react';

import { login } from '../../../api/authApi';

import { translations } from '../constants/translations.js';

function LoginPage() {
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const language =
        localStorage.getItem('language') || 'en';

    const t = translations[language];

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const result = await login({
                email,
                password,
            });

            localStorage.setItem(
                'token',
                result.token
            );

            window.location.href = '/';
        } catch {
            alert(t.loginFailed);
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
            <h1>{t.login}</h1>

            <form onSubmit={handleSubmit}>
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
                    {t.login}
                </button>
            </form>
        </div>
    );
}

export default LoginPage;