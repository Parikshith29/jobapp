import React from 'react';

const Input = ({ label, placeholder, value, onChange, type = "text", ...props }) => {
    return (
        <div className="input-group flex-col gap-8" style={{ width: '100%' }}>
            {label && (
                <label style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 500,
                    color: 'var(--text-secondary)'
                }}>
                    {label}
                </label>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    fontSize: 'var(--text-base)',
                    fontFamily: 'var(--font-body)',
                    width: '100%',
                    outline: 'none',
                    transition: 'border-color var(--transition-fast)',
                    backgroundColor: 'var(--bg-secondary)'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--text-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                {...props}
            />
        </div>
    );
};

export default Input;
