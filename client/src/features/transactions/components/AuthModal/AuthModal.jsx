import { useState } from 'react';

import { login, register } from '../../../../api/authApi';

import './AuthModal.css';

function AuthModal({
                       mode,
                       setMode,
                       t,
                       language,
                   }) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const isLogin = mode === 'login';

    const resetForm = () => {
        setFullName('');
        setEmail('');
        setPassword('');
        setError('');
    };

    const handleSwitchMode = () => {
        resetForm();

        setMode(isLogin ? 'register' : 'login');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError('');
        setIsLoading(true);

        try {
            const result = isLogin
                ? await login({ email, password })
                : await register({
                    fullName,
                    email,
                    password,
                });

            localStorage.setItem('token', result.token);

            window.location.reload();
        } catch {
            setError(
                isLogin
                    ? t.loginFailed
                    : t.registerFailed
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-overlay">
            <form
                className="auth-modal"
                onSubmit={handleSubmit}
                dir={language === 'he' ? 'rtl' : 'ltr'}
            >
                <h2>
                    {isLogin ? t.login : t.register}
                </h2>

                {!isLogin && (
                    <input
                        type="text"
                        placeholder={t.fullName}
                        value={fullName}
                        onChange={(event) =>
                            setFullName(event.target.value)
                        }
                    />
                )}

                <input
                    type="email"
                    placeholder={t.email}
                    value={email}
                    onChange={(event) =>
                        setEmail(event.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder={t.password}
                    value={password}
                    onChange={(event) =>
                        setPassword(event.target.value)
                    }
                />

                {error && (
                    <p className="auth-error">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading
                        ? t.loading
                        : isLogin
                            ? t.login
                            : t.register}
                </button>

                <p className="auth-switch">
                    {isLogin
                        ? t.dontHaveAccount
                        : t.alreadyHaveAccount}

                    <button
                        type="button"
                        onClick={handleSwitchMode}
                    >
                        {isLogin ? t.register : t.login}
                    </button>
                </p>
            </form>
        </div>
    );
}

export default AuthModal;