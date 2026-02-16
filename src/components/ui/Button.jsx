import React from 'react';

const Button = ({ children, variant = "primary", onClick, className = "", ...props }) => {
    const baseStyles = {
        padding: '10px 20px',
        borderRadius: 'var(--radius-md)',
        fontSize: 'var(--text-base)',
        fontWeight: 500,
        border: '1px solid transparent',
        transition: 'all var(--transition-fast)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-8)'
    };

    const variants = {
        primary: {
            backgroundColor: 'var(--accent-color)',
            color: '#FFFFFF',
            border: '1px solid var(--accent-color)',
        },
        secondary: {
            backgroundColor: 'transparent',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
        },
        ghost: {
            backgroundColor: 'transparent',
            color: 'var(--text-secondary)',
            border: '1px solid transparent',
        }
    };

    const style = { ...baseStyles, ...variants[variant] };

    return (
        <button
            className={`btn-${variant} ${className}`}
            style={style}
            onClick={onClick}
            onMouseOver={(e) => {
                if (variant === 'primary') e.currentTarget.style.backgroundColor = 'var(--accent-hover)';
                if (variant === 'secondary') e.currentTarget.style.borderColor = 'var(--text-primary)';
            }}
            onMouseOut={(e) => {
                // Reset to original
                Object.assign(e.currentTarget.style, variants[variant]);
            }}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
