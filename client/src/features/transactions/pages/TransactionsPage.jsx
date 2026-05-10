import { useState } from 'react';

import './TransactionsPage.css';

import shvaLogo from '../../../assets/shva-logo.png';

import LanguageToggle from '../components/LanguageToggle/LanguageToggle.jsx';
import TransactionForm from '../components/TransactionForm/TransactionForm.jsx';
import HeroIllustration from '../components/HeroIllustration/ HeroIllustration.jsx'
import ApprovedTransactions from '../components/ApprovedTransactions/ApprovedTransactions.jsx';

import AuthModal from '../components/AuthModal/AuthModal.jsx';

import useTransactions from '../hooks/useTransactions.js';

function TransactionsPage() {
    const {
        region,
        setRegion,

        hour,
        setHour,

        minute,
        setMinute,

        approvedTransactions,
        lastResult,

        submitTransaction,

        isLoading,
        error,
        clearResult,

        language,
        setLanguage,

        t,
    } = useTransactions();

    const [authMode, setAuthMode] = useState('login');

    const isAuthenticated = Boolean(localStorage.getItem('token'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    return (
        <>
            <main className="transactions-page">
                <header className="transactions-header">
                    <div className="logo">
                        <img
                            src={shvaLogo}
                            alt="Shva Logo"
                            className="logo-image"
                        />
                    </div>

                    <div className="header-actions">
                        <LanguageToggle
                            language={language}
                            setLanguage={setLanguage}
                            t={t}
                        />

                        {isAuthenticated && (
                            <button
                                type="button"
                                className="logout-button"
                                onClick={handleLogout}
                            >
                                {t.logout}
                            </button>
                        )}
                    </div>
                </header>

                <section className="hero-section">
                    <div className="hero-left">
                        <TransactionForm
                            t={t}
                            region={region}
                            setRegion={setRegion}
                            hour={hour}
                            setHour={setHour}
                            clearResult={clearResult}
                            minute={minute}
                            setMinute={setMinute}
                            onSubmit={submitTransaction}
                            isLoading={isLoading}
                        />

                        {error && (
                            <p className="error-message">
                                {error}
                            </p>
                        )}

                        {lastResult && (
                            <div
                                className={
                                    lastResult.status === 'Approved'
                                        ? 'result-card approved-result'
                                        : 'result-card rejected-result'
                                }
                            >
                                <h3>
                                    {lastResult.status === 'Approved'
                                        ? 'Approved ✅'
                                        : 'Rejected ❌'}
                                </h3>

                                <p>{lastResult.region}</p>

                                <span>
                                    {new Date(
                                        lastResult.localTime
                                    ).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="hero-right">
                        <HeroIllustration t={t} />
                    </div>
                </section>

                <ApprovedTransactions
                    t={t}
                    transactions={approvedTransactions}
                />
            </main>

            {!isAuthenticated && (
                <AuthModal
                    mode={authMode}
                    setMode={setAuthMode}
                    t={t}
                    language={language}
                    setLanguage={setLanguage}
                />
            )}
        </>
    );
}

export default TransactionsPage;