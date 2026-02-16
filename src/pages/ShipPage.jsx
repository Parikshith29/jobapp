import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const ShipPage = () => {
    const [isLocked, setIsLocked] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem('testChecklist');
        if (saved) {
            const checkedItems = JSON.parse(saved);
            // Must have 10 items checked. We know IDs 1-10.
            const passedCount = Object.values(checkedItems).filter(Boolean).length;
            if (passedCount === 10) {
                setIsLocked(false);
            }
        }
    }, []);

    if (isLocked) {
        return (
            <div className="container" style={{ padding: 'var(--space-40) var(--space-24)', maxWidth: '800px', textAlign: 'center' }}>
                <div style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-64)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 'var(--space-24)'
                }}>
                    <div style={{ fontSize: '48px' }}>🔒</div>
                    <h1 style={{ fontFamily: 'var(--font-heading)', margin: 0 }}>Shipment Locked</h1>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '400px' }}>
                        Please complete the test checklist at /jt/07-test to unlock shipping. All 10 tests must pass.
                    </p>
                    <NavLink to="/jt/07-test" style={{
                        backgroundColor: 'var(--accent-color)',
                        color: '#FFFFFF',
                        padding: '12px 24px',
                        borderRadius: 'var(--radius-md)',
                        textDecoration: 'none',
                        fontWeight: 600
                    }}>
                        Go to Test Checklist
                    </NavLink>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: 'var(--space-40) var(--space-24)', maxWidth: '800px', textAlign: 'center' }}>
            <div style={{
                backgroundColor: '#FAFAFA',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-64)',
                border: '1px solid var(--success-color)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-24)'
            }}>
                <div style={{ fontSize: '48px' }}>🚀</div>
                <h1 style={{ fontFamily: 'var(--font-heading)', margin: 0, color: 'var(--success-color)' }}>Ready to Ship</h1>
                <p style={{ color: 'var(--text-primary)', fontSize: 'var(--text-lg)' }}>
                    All systems go. Build approved.
                </p>
                <div style={{ color: 'var(--text-secondary)' }}>
                    Great job! The application is verified and ready for deployment.
                </div>
            </div>
        </div>
    );
};

export default ShipPage;
