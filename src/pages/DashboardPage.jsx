import React from 'react';

const DashboardPage = () => {
    return (
        <div className="container" style={{ padding: 'var(--space-40) var(--space-24)' }}>
            <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-2xl)',
                marginBottom: 'var(--space-24)'
            }}>
                Dashboard
            </h1>
            <div style={{
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-64)',
                textAlign: 'center',
                border: '1px solid var(--border-color)',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    fontSize: 'var(--text-xl)',
                    fontWeight: 500,
                    marginBottom: 'var(--space-8)',
                    color: 'var(--text-primary)'
                }}>
                    No jobs yet.
                </div>
                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: 'var(--text-base)'
                }}>
                    In the next step, you will load a realistic dataset.
                </p>
            </div>
        </div>
    );
};

export default DashboardPage;
