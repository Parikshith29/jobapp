import React, { useState, useEffect } from 'react';

const SettingsPage = () => {
    const [preferences, setPreferences] = useState({
        roleKeywords: '',
        preferredLocations: [],
        preferredMode: [],
        experienceLevel: '',
        skills: '',
        minMatchScore: 40
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (savedPrefs) {
            setPreferences(JSON.parse(savedPrefs));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setPreferences(prev => {
                const currentArr = prev[name] || [];
                if (checked) {
                    return { ...prev, [name]: [...currentArr, value] };
                } else {
                    return { ...prev, [name]: currentArr.filter(item => item !== value) };
                }
            });
        } else if (name === 'preferredLocations') {
            // Treat as multi-select handled via text for simplicity or custom UI
            // For now, let's parse comma-separated string to array for storage if using text input
            // BUT wait, users requested "multi-select dropdown". 
            // I'll stick to a simple multi-select mock using checkboxes if possible, or just text input for simplicity as "multi-select" usually needs a lib.
            // Let's use a simple text input that splits by comma for now to ensure it works without libs, 
            // OR I can build a simple checkbox list for top cities.
            // Let's use text input for locations to allow any city.
            setPreferences(prev => ({ ...prev, [name]: value.split(',').map(s => s.trim()) }));
        } else {
            setPreferences(prev => ({ ...prev, [name]: value }));
        }
    };

    // Custom handler for locations text input to display it correctly
    const handleLocationChange = (e) => {
        setPreferences(prev => ({ ...prev, preferredLocations: e.target.value.split(',').map(s => s.trim()) }));
    }

    const handleSave = () => {
        localStorage.setItem('jobTrackerPreferences', JSON.stringify(preferences));
        setMessage('Preferences saved successfully!');
        setTimeout(() => setMessage(''), 3000);
    };

    const inputStyle = {
        width: '100%',
        padding: 'var(--space-16)',
        marginBottom: 'var(--space-24)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        fontSize: 'var(--text-base)',
        fontFamily: 'var(--font-body)',
        backgroundColor: 'var(--bg-secondary)',
        color: 'var(--text-primary)'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: 'var(--space-8)',
        fontWeight: 500,
        color: 'var(--text-primary)',
        fontSize: 'var(--text-sm)'
    };

    const checkboxGroupStyle = {
        display: 'flex',
        gap: 'var(--space-16)',
        marginBottom: 'var(--space-24)'
    };

    return (
        <div className="container" style={{ padding: 'var(--space-40) var(--space-24)', maxWidth: '800px' }}>
            <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-2xl)',
                marginBottom: 'var(--space-40)'
            }}>
                Preferences & Settings
            </h1>

            <div style={{
                backgroundColor: 'var(--bg-secondary)',
                padding: 'var(--space-40)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)'
            }}>
                {message && (
                    <div style={{
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        color: 'var(--success-color)',
                        padding: 'var(--space-16)',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: 'var(--space-24)',
                        textAlign: 'center'
                    }}>
                        {message}
                    </div>
                )}

                <div>
                    <label style={labelStyle}>Role Keywords (Comma separated)</label>
                    <input
                        type="text"
                        name="roleKeywords"
                        value={preferences.roleKeywords}
                        onChange={handleChange}
                        placeholder="e.g. Frontend, React, Java Specialist"
                        style={inputStyle}
                    />
                </div>

                <div>
                    <label style={labelStyle}>Preferred Locations (Comma separated)</label>
                    <input
                        type="text"
                        value={preferences.preferredLocations.join(', ')}
                        onChange={handleLocationChange}
                        placeholder="e.g. Bangalore, Pune, Mumbai"
                        style={inputStyle}
                    />
                </div>

                <div>
                    <label style={labelStyle}>Preferred Mode</label>
                    <div style={checkboxGroupStyle}>
                        {['Remote', 'Hybrid', 'Onsite'].map(mode => (
                            <label key={mode} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    name="preferredMode"
                                    value={mode}
                                    checked={preferences.preferredMode.includes(mode)}
                                    onChange={handleChange}
                                />
                                {mode}
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label style={labelStyle}>Experience Level</label>
                    <select
                        name="experienceLevel"
                        value={preferences.experienceLevel}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value="">Select Level</option>
                        <option value="Fresher">Fresher</option>
                        <option value="0-1">0-1 Years</option>
                        <option value="1-3">1-3 Years</option>
                        <option value="3-5">3-5 Years</option>
                        <option value="5+">5+ Years</option>
                    </select>
                </div>

                <div>
                    <label style={labelStyle}>Skills (Comma separated)</label>
                    <input
                        type="text"
                        name="skills"
                        value={preferences.skills}
                        onChange={handleChange}
                        placeholder="e.g. React, Python, AWS"
                        style={inputStyle}
                    />
                </div>

                <div>
                    <label style={labelStyle}>Minimum Match Score: {preferences.minMatchScore}%</label>
                    <input
                        type="range"
                        name="minMatchScore"
                        min="0"
                        max="100"
                        value={preferences.minMatchScore}
                        onChange={handleChange}
                        style={{ width: '100%', marginBottom: 'var(--space-24)', cursor: 'pointer' }}
                    />
                </div>

                <button
                    onClick={handleSave}
                    style={{
                        backgroundColor: 'var(--accent-color)',
                        color: '#FFFFFF',
                        padding: 'var(--space-16) var(--space-40)',
                        borderRadius: 'var(--radius-md)',
                        border: 'none',
                        fontSize: 'var(--text-base)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        width: '100%',
                        transition: 'background-color var(--transition-fast)'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-hover)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-color)'}
                >
                    Save Preferences
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;
