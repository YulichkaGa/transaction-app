import { useEffect, useState } from 'react';

import {
    getApprovedTransactions,
    simulateTransaction,
} from '../../../api/transactionsApi';

import { translations } from '../constants/translations';

function useTransactions() {
    const [region, setRegion] = useState('Israel');

    const [hour, setHour] = useState('10');

    const [minute, setMinute] = useState('00');

    const [approvedTransactions, setApprovedTransactions] =
        useState([]);

    const [lastResult, setLastResult] =
        useState(null);

    const [isLoading, setIsLoading] =
        useState(false);

    const [error, setError] =
        useState('');

    const [language, setLanguage] = useState(
        localStorage.getItem('language') || 'en'
    );

    const t = translations[language];
    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const loadApprovedTransactions = async () => {
        try {
            const data =
                await getApprovedTransactions();

            setApprovedTransactions(data);
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem('token');

                return;
            }

            setError(t.loadApprovedError);
        }
    };

    useEffect(() => {
        const token =
            localStorage.getItem('token');

        if (!token) {
            return;
        }

        const timeoutId = setTimeout(() => {
            void loadApprovedTransactions();
        }, 0);

        return () => clearTimeout(timeoutId);
    }, []);

    const clearResult = () => {
        setLastResult(null);

        setError('');
    };

    const submitTransaction = async (event) => {
        event.preventDefault();

        const token =
            localStorage.getItem('token');

        if (!token) {
            setError('Please login first.');

            return;
        }

        setIsLoading(true);

        setError('');

        try {
            const now = new Date();

            const utcDate = new Date(
                Date.UTC(
                    now.getUTCFullYear(),
                    now.getUTCMonth(),
                    now.getUTCDate(),
                    Number(hour),
                    Number(minute),
                    0
                )
            );

            const result =
                await simulateTransaction({
                    region,
                    submittedUtcTime:
                        utcDate.toISOString(),
                });

            setLastResult(result);

            await loadApprovedTransactions();
        } catch {
            setError(t.simulateError);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        region,
        setRegion,

        hour,
        setHour,

        minute,
        setMinute,

        approvedTransactions,

        lastResult,

        isLoading,

        error,

        language,
        setLanguage,

        t,

        submitTransaction,

        clearResult,
    };
}

export default useTransactions;