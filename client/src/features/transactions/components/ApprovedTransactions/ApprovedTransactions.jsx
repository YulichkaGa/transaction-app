import { useRef } from 'react';

import './ApprovedTransactions.css';

function ApprovedTransactions({ transactions = [], t }) {
    const listRef = useRef(null);

    const scrollCards = (direction) => {
        if (!listRef.current) return;

        listRef.current.scrollBy({
            left: direction === 'left' ? -360 : 360,
            behavior: 'smooth',
        });
    };

    return (
        <section className="approved-transactions">
            <h2>{t.approvedTransactions}</h2>

            <div className="transactions-wrapper">
                <button
                    type="button"
                    className="arrow-button"
                    onClick={() => scrollCards('left')}
                >
                    ←
                </button>

                <div className="transactions-grid" ref={listRef}>
                    {transactions.map((transaction) => (
                        <article
                            key={transaction.id}
                            className="transaction-card"
                        >
                            <h3>
                                {t.time}:{' '}
                                {new Date(transaction.localTime)
                                    .toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                            </h3>

                            <p>
                                {t.timeZone}: {transaction.region}
                            </p>
                        </article>
                    ))}
                </div>

                <button
                    type="button"
                    className="arrow-button"
                    onClick={() => scrollCards('right')}
                >
                    →
                </button>
            </div>
        </section>
    );
}

export default ApprovedTransactions;