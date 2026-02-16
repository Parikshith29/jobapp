import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'calc(100vh - 60px)', // Adjust for nav height if visible, or full screen
            backgroundColor: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            textAlign: 'center',
            padding: 'var(--space-24)'
        }}>
            <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-3xl)',
                fontWeight: 700,
                marginBottom: 'var(--space-16)',
                color: 'var(--text-primary)'
            }}>
                Stop Missing The Right Jobs.
            </h1>
            <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-lg)',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-40)',
                maxWidth: '600px'
            }}>
                Precision-matched job discovery delivered daily at 9AM.
            </p>
            <button
                onClick={() => navigate('/settings')}
                style={{
                    backgroundColor: 'var(--accent-color)',
                    color: '#FFFFFF',
                    padding: 'var(--space-16) var(--space-40)',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    fontSize: 'var(--text-base)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'background-color var(--transition-fast)'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-hover)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-color)'}
            >
                Start Tracking
            </button>
        </div>
    );
};

export default LandingPage;
