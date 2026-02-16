import React from 'react';

const ContextHeader = ({ title, description }) => {
    return (
        <div className="context-header" style={{
            padding: 'var(--space-40) var(--space-24) var(--space-24)',
            maxWidth: '1200px',
            margin: '60px auto 0' // 60px TopBar offset
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
                maxWidth: '720px',
                margin: 0
            }}>
                {description}
            </p>
        </div>
    );
};

export default ContextHeader;
