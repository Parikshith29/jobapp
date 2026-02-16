import React from 'react';

const ProofItem = ({ label, checked }) => (
    <div className="proof-item flex items-center gap-8" style={{ opacity: checked ? 1 : 0.5 }}>
        <div style={{
            width: '16px',
            height: '16px',
            border: `1px solid ${checked ? 'var(--text-primary)' : 'var(--text-secondary)'}`,
            backgroundColor: checked ? 'var(--text-primary)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            color: 'var(--bg-primary)'
        }}>
            {checked && "✓"}
        </div>
        <span style={{ fontSize: 'var(--text-sm)' }}>{label}</span>
    </div>
);

const ProofFooter = () => {
    return (
        <div className="proof-footer flex items-center justify-between" style={{
            height: '50px',
            borderTop: '1px solid var(--border-color)',
            padding: '0 var(--space-24)',
            backgroundColor: 'var(--bg-secondary)',
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            zIndex: 100
        }}>
            <div className="proof-label" style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-sm)',
                fontStyle: 'italic',
                marginRight: 'var(--space-24)'
            }}>
                Build Proof:
            </div>

            <div className="checklist flex gap-24">
                <ProofItem label="UI Built" checked={false} />
                <ProofItem label="Logic Working" checked={false} />
                <ProofItem label="Test Passed" checked={false} />
                <ProofItem label="Deployed" checked={false} />
            </div>

            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                KodNest System v1.0
            </div>
        </div>
    );
};

export default ProofFooter;
