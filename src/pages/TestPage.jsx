import React, { useState, useEffect } from 'react';

const checklistItems = [
    { id: 1, text: "Preferences persist after refresh", tip: "Reload /settings and check values" },
    { id: 2, text: "Match score calculates correctly", tip: "Check job scores vs preferences" },
    { id: 3, text: "\"Show only matches\" toggle works", tip: "Toggle on dashboard and check logic" },
    { id: 4, text: "Save job persists after refresh", tip: "Save job, reload, check /saved" },
    { id: 5, text: "Apply opens in new tab", tip: "Click Apply on any job" },
    { id: 6, text: "Status update persists after refresh", tip: "Change status, reload, verify" },
    { id: 7, text: "Status filter works correctly", tip: "Filter by status on dashboard" },
    { id: 8, text: "Digest generates top 10 by score", tip: "Generate digest and count/check scores" },
    { id: 9, text: "Digest persists for the day", tip: "Reload /digest" },
    { id: 10, text: "No console errors on main pages", tip: "Open DevTools console" },
];

const TestPage = () => {
    const [checkedItems, setCheckedItems] = useState({});

    useEffect(() => {
        const saved = localStorage.getItem('testChecklist');
        if (saved) {
            setCheckedItems(JSON.parse(saved));
        }
    }, []);

    const toggleItem = (id) => {
        setCheckedItems(prev => {
            const newState = { ...prev, [id]: !prev[id] };
            localStorage.setItem('testChecklist', JSON.stringify(newState));
            return newState;
        });
    };

    const resetChecklist = () => {
        setCheckedItems({});
        localStorage.removeItem('testChecklist');
    };

    const passedCount = Object.values(checkedItems).filter(Boolean).length;
    const isComplete = passedCount === checklistItems.length;

    return (
        <div className="container" style={{ padding: 'var(--space-40) var(--space-24)', maxWidth: '800px' }}>
            <div style={{
                marginBottom: 'var(--space-32)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', margin: 0 }}>
                    Test Checklist
                </h1>
                <div style={{
                    backgroundColor: isComplete ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 193, 7, 0.1)',
                    color: isComplete ? 'var(--success-color)' : 'var(--warning-color)',
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 600
                }}>
                    Tests Passed: {passedCount} / {checklistItems.length}
                </div>
            </div>

            <div style={{
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                padding: 'var(--space-24)'
            }}>
                {checklistItems.map(item => (
                    <div key={item.id} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 'var(--space-16)',
                        padding: 'var(--space-16) 0',
                        borderBottom: '1px solid var(--border-color)'
                    }}>
                        <input
                            type="checkbox"
                            checked={!!checkedItems[item.id]}
                            onChange={() => toggleItem(item.id)}
                            style={{ marginTop: '4px', cursor: 'pointer', transform: 'scale(1.2)' }}
                        />
                        <div>
                            <div style={{
                                fontSize: 'var(--text-lg)',
                                fontWeight: 500,
                                textDecoration: checkedItems[item.id] ? 'line-through' : 'none',
                                color: checkedItems[item.id] ? 'var(--text-secondary)' : 'var(--text-primary)'
                            }}>
                                {item.text}
                            </div>
                            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: '4px' }}>
                                Tip: {item.tip}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: 'var(--space-32)', textAlign: 'right' }}>
                <button
                    onClick={resetChecklist}
                    style={{
                        background: 'none',
                        border: '1px solid var(--border-color)',
                        padding: '8px 16px',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        color: 'var(--text-secondary)',
                        fontSize: 'var(--text-sm)'
                    }}
                >
                    Reset Test Status
                </button>
            </div>

            {!isComplete && (
                <div style={{
                    marginTop: 'var(--space-24)',
                    textAlign: 'center',
                    color: 'var(--warning-color)',
                    fontWeight: 500
                }}>
                    Resolve all issues before shipping.
                </div>
            )}
        </div>
    );
};

export default TestPage;
