import React from 'react';

const Card = ({ children, title, actions, className = "" }) => {
    return (
        <div className={`card ${className}`} style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-24)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-16)'
        }}>
            {(title || actions) && (
                <div className="card-header flex items-center justify-between" style={{ marginBottom: 'var(--space-8)' }}>
                    {title && <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>{title}</h3>}
                    {actions && <div className="card-actions">{actions}</div>}
                </div>
            )}
            <div className="card-content">
                {children}
            </div>
        </div>
    );
};

export default Card;
