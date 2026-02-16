import React from 'react';

const SettingsPage = () => {
    const inputStyle = {
        width: '100%',
        padding: 'var(--space-16)',
        marginBottom: 'var(--space-24)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        fontSize: 'var(--text-base)',
        fontFamily: 'var(--font-body)',
        backgroundColor: 'var(--bg-secondary)'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: 'var(--space-8)',
        fontWeight: 500,
        color: 'var(--text-primary)',
        fontSize: 'var(--text-sm)'
    };

    return (
        <div className="container" style={{ padding: 'var(--space-40) var(--space-24)', maxWidth: '800px' }}>
            <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-2xl)',
                marginBottom: 'var(--space-40)'
            }}>
                Settings
            </h1>

            <div style={{
                backgroundColor: 'var(--bg-secondary)',
                padding: 'var(--space-40)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)'
            }}>
                <div>
                    <label style={labelStyle}>Role Keywords</label>
                    <input type="text" placeholder="e.g. Senior Frontend Engineer, React Developer" style={inputStyle} disabled />
                </div>

                <div>
                    <label style={labelStyle}>Preferred Locations</label>
                    <input type="text" placeholder="e.g. San Francisco, New York, Remote" style={inputStyle} disabled />
                </div>

                <div>
                    <label style={labelStyle}>Mode</label>
                    <select style={inputStyle} disabled>
                        <option>Remote</option>
                        <option>Hybrid</option>
                        <option>Onsite</option>
                    </select>
                </div>

                <div>
                    <label style={labelStyle}>Experience Level</label>
                    <select style={{ ...inputStyle, marginBottom: 0 }} disabled>
                        <option>Junior (0-2 years)</option>
                        <option>Mid-Level (3-5 years)</option>
                        <option>Senior (5+ years)</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
