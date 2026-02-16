import React from 'react';

const PlaceholderPage = ({ title }) => {
    return (
        <div className="placeholder-page container flex-col justify-center" style={{
            padding: 'var(--space-64) 0',
            marginTop: '60px', /* Offset for fixed nav */
            minHeight: 'calc(100vh - 60px)'
        }}>
            <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-3xl)',
                marginBottom: 'var(--space-16)',
                fontWeight: 700
            }}>
                {title}
            </h1>
            <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-lg)',
                color: 'var(--text-secondary)',
                opacity: 0.7
            }}>
                This section will be built in the next step.
            </p>
        </div>
    );
};

export default PlaceholderPage;
