import { useState } from 'react';

import './TransactionForm.css';

const REGIONS = [
    'France',
    'Israel',
    'USA',
    'Japan',
];

function TransactionForm({
                             t,
                             region,
                             setRegion,
                             hour,
                             setHour,
                             minute,
                             setMinute,
                             onSubmit,
                             clearResult,
                             isLoading,
                         }) {
    const [isOpen, setIsOpen] = useState(false);

    const selectRegion = (value) => {
        setRegion(value);
        setIsOpen(false);
    };

    return (
        <form
            className="transaction-form"
            onSubmit={onSubmit}
        >
            <label className="field-label">
                {t.regionLabel}
            </label>

            <div className="region-select-wrapper">
                <div
                    className="search-box"
                    onClick={() =>
                        setIsOpen((prev) => !prev)
                    }
                >
                    <span className="selected-region">
                        {region}
                    </span>

                    <span className="clear-icon">
                        {isOpen ? '−' : '+'}
                    </span>
                </div>

                {isOpen && (
                    <div className="region-list">
                        {REGIONS.map((item) => (
                            <button
                                key={item}
                                type="button"
                                className={
                                    item === region
                                        ? 'region-item active-region'
                                        : 'region-item'
                                }
                                onClick={() =>
                                    selectRegion(item)
                                }
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="time-picker">
                <p className="time-title">
                    {t.enterTime}
                </p>

                <div className="time-inputs-row">
                    <div className="time-input-group">
                        <input
                            type="number"
                            min="0"
                            max="23"
                            value={hour}
                            onChange={(event) =>
                                setHour(event.target.value)
                            }
                        />

                        <span>{t.hour}</span>
                    </div>

                    <strong className="time-separator">
                        :
                    </strong>

                    <div className="time-input-group">
                        <input
                            type="number"
                            min="0"
                            max="59"
                            value={minute}
                            onChange={(event) =>
                                setMinute(event.target.value)
                            }
                        />

                        <span>{t.minute}</span>
                    </div>
                </div>

                <div className="time-actions">
                    <span className="clock-icon">
                        ◷
                    </span>

                    <button
                        type="button"
                        className="text-button"
                        onClick={() => {
                            setHour('20');
                            setMinute('00');

                            clearResult();
                        }}
                    >
                        {t.cancel}
                    </button>

                    <button
                        type="submit"
                        className="text-button"
                        disabled={isLoading}
                    >
                        {isLoading ? t.loading : t.ok}
                    </button>
                </div>
            </div>
        </form>
    );
}

export default TransactionForm;