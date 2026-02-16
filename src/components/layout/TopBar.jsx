import React from 'react';

const TopBar = ({ step, totalSteps, status }) => {
    return (
        <div className="top-bar flex items-center justify-between" style={{
            height: '60px',
            borderBottom: '1px solid var(--border-color)',
            padding: '0 var(--space-24)',
            backgroundColor: 'var(--bg-secondary)',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 100
        }}>
            <div className="logo" style={{ fontWeight: 600, fontSize: 'var(--text-base)' }}>
                KodNest <span style={{ opacity: 0.5 }}>Premium Build</span>
            </div>

            <div className="progress flex items-center gap-8" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                <span>Step {step}</span>
                <span style={{ opacity: 0.3 }}>/</span>
                <span>{totalSteps}</span>
            </div>

            <div className="status" style={{
                fontSize: 'var(--text-xs)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(0,0,0,0.05)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: 500
            }}>
                {status}
            </div>
        </div>
    );
};

export default TopBar;
