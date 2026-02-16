import React from 'react';

const JobModal = ({ job, onClose, onSave, isSaved }) => {
    if (!job) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: 'var(--space-24)'
        }}
            onClick={onClose}
        >
            <div style={{
                backgroundColor: 'var(--bg-secondary)',
                padding: 'var(--space-40)',
                borderRadius: 'var(--radius-lg)',
                maxWidth: '600px',
                width: '100%',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                position: 'relative',
                maxHeight: '90vh',
                overflowY: 'auto'
            }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 'var(--space-24)',
                        right: 'var(--space-24)',
                        background: 'none',
                        border: 'none',
                        fontSize: '24px',
                        cursor: 'pointer',
                        color: 'var(--text-secondary)'
                    }}
                >
                    &times;
                </button>

                <h2 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--text-2xl)',
                    marginBottom: 'var(--space-8)'
                }}>
                    {job.title}
                </h2>
                <div style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: 500,
                    marginBottom: 'var(--space-24)',
                    color: 'var(--text-secondary)'
                }}>
                    {job.company} • {job.location} ({job.mode})
                </div>

                <div style={{ marginBottom: 'var(--space-24)' }}>
                    <div style={{ fontWeight: 600, marginBottom: 'var(--space-8)' }}>Description</div>
                    <p style={{
                        lineHeight: 1.6,
                        color: 'var(--text-secondary)'
                    }}>
                        {job.description}
                    </p>
                </div>

                <div style={{ marginBottom: 'var(--space-24)' }}>
                    <div style={{ fontWeight: 600, marginBottom: 'var(--space-8)' }}>Skills</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-8)' }}>
                        {job.skills.map(skill => (
                            <span key={skill} style={{
                                backgroundColor: 'var(--bg-primary)',
                                padding: '4px 12px',
                                borderRadius: '16px',
                                fontSize: 'var(--text-sm)',
                                color: 'var(--text-secondary)',
                                border: '1px solid var(--border-color)'
                            }}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div style={{ marginBottom: 'var(--space-40)' }}>
                    <div style={{ fontWeight: 600, marginBottom: 'var(--space-8)' }}>Details</div>
                    <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                        <li>Salary: {job.salaryRange}</li>
                        <li>Experience: {job.experience} Years</li>
                        <li>Source: {job.source}</li>
                        <li>Posted: {job.postedDaysAgo} days ago</li>
                    </ul>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-16)' }}>
                    <button
                        onClick={() => onSave(job.id)}
                        style={{
                            flex: 1,
                            padding: '12px 24px',
                            backgroundColor: isSaved ? 'var(--accent-color)' : 'transparent',
                            color: isSaved ? '#FFFFFF' : 'var(--accent-color)',
                            border: '1px solid var(--accent-color)',
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--text-base)',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        {isSaved ? 'Saved' : 'Save Job'}
                    </button>
                    <a
                        href={job.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            flex: 1,
                            padding: '12px 24px',
                            backgroundColor: 'var(--text-primary)',
                            color: '#FFFFFF',
                            textAlign: 'center',
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--text-base)',
                            fontWeight: 600,
                            textDecoration: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Apply Now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default JobModal;
