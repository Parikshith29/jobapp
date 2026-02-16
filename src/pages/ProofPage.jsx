import React from 'react';

const ProofPage = () => {
    return (
        <div className="container" style={{ padding: 'var(--space-40) var(--space-24)' }}>
            <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-2xl)',
                marginBottom: 'var(--space-24)'
            }}>
                Proof of Work
            </h1>
            <div style={{
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-64)',
                textAlign: 'center',
                border: '1px solid var(--border-color)',
                minHeight: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)'
            }}>
                Artifact collection placeholder.
            </div>
        </div>
    );
};

export default ProofPage;
