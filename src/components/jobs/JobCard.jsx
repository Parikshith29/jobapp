import React from 'react';

const JobCard = ({ job, onSave, onView, isSaved }) => {
    const getScoreColor = (score) => {
        if (score >= 80) return 'var(--success-color)';
        if (score >= 60) return 'var(--warning-color)';
        if (score >= 40) return 'var(--text-secondary)';
        return '#9e9e9e'; // Grey
    };

    const hasScore = typeof job.matchScore === 'number';

    return (
        <div style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            padding: 'var(--space-24)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 'var(--space-16)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
            transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
            position: 'relative'
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.05)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.02)';
            }}
        >
            {hasScore && (
                <div style={{
                    position: 'absolute',
                    top: 'var(--space-16)',
                    right: 'var(--space-16)',
                    backgroundColor: getScoreColor(job.matchScore),
                    color: '#FFFFFF',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600
                }}>
                    {job.matchScore}% Match
                </div>
            )}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-8)' }}>
                    <h3 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'var(--text-lg)',
                        fontWeight: 700,
                        margin: 0,
                        color: 'var(--text-primary)',
                        paddingRight: hasScore ? '80px' : '0' // Make space for badge
                    }}>
                        {job.title}
                    </h3>
                </div>
                <span style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-secondary)',
                    backgroundColor: '#F0F0F0',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    display: 'inline-block', // Ensure it sits nicely
                    marginBottom: 'var(--space-8)'
                }}>
                    {job.postedDaysAgo === 0 ? 'Today' : `${job.postedDaysAgo}d ago`}
                </span>

                <div style={{
                    fontSize: 'var(--text-base)',
                    fontWeight: 500,
                    marginBottom: 'var(--space-4)',
                    color: 'var(--text-primary)'
                }}>
                    {job.company}
                </div>

                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 'var(--space-8)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-secondary)',
                    marginBottom: 'var(--space-16)'
                }}>
                    <span>📍 {job.location} ({job.mode})</span>
                    <span>•</span>
                    <span>💼 {job.experience} Yrs</span>
                </div>

                <div style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    color: 'var(--success-color)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    display: 'inline-block',
                    marginBottom: 'var(--space-16)'
                }}>
                    {job.salaryRange}
                </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-8)', marginTop: 'auto' }}>
                <button
                    onClick={() => onView(job)}
                    style={{
                        flex: 1,
                        padding: '8px 16px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'transparent',
                        borderRadius: 'var(--radius-md)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 500,
                        color: 'var(--text-primary)',
                        cursor: 'pointer'
                    }}
                >
                    View
                </button>
                <button
                    onClick={() => onSave(job.id)}
                    style={{
                        padding: '8px 16px',
                        border: '1px solid ' + (isSaved ? 'var(--accent-color)' : 'var(--border-color)'),
                        backgroundColor: isSaved ? 'var(--accent-color)' : 'transparent',
                        color: isSaved ? '#FFFFFF' : 'var(--text-primary)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 500,
                        cursor: 'pointer'
                    }}
                >
                    {isSaved ? 'Saved' : 'Save'}
                </button>
                <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        flex: 1,
                        padding: '8px 16px',
                        backgroundColor: 'var(--text-primary)',
                        color: '#FFFFFF',
                        borderRadius: 'var(--radius-md)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 500,
                        textDecoration: 'none',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                >
                    Apply
                </a>
            </div>
        </div>
    );
};

export default JobCard;
