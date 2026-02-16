import React, { useState, useEffect } from 'react';
import { jobs } from '../data/jobs';
import { calculateMatchScore } from '../utils/scoring';

const DigestPage = () => {
    const [digest, setDigest] = useState(null);
    const [generatedDate, setGeneratedDate] = useState(null);
    const [preferences, setPreferences] = useState(null);

    useEffect(() => {
        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (savedPrefs) {
            setPreferences(JSON.parse(savedPrefs));
        }

        const today = new Date().toISOString().split('T')[0];
        const savedDigest = localStorage.getItem(`jobTrackerDigest_${today}`);

        if (savedDigest) {
            setDigest(JSON.parse(savedDigest));
            setGeneratedDate(today);
        }
    }, []);

    const generateDigest = () => {
        if (!preferences) return;

        const today = new Date().toISOString().split('T')[0];

        // Scoring and Sorting descending
        const scoredJobs = jobs.map(job => ({
            ...job,
            matchScore: calculateMatchScore(job, preferences)
        })).filter(job => job.matchScore > 0); // Only positive matches

        scoredJobs.sort((a, b) => {
            if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore; // Score desc
            return a.postedDaysAgo - b.postedDaysAgo; // Date asc (fresher first)
        });

        const top10 = scoredJobs.slice(0, 10);

        setDigest(top10);
        setGeneratedDate(today);
        localStorage.setItem(`jobTrackerDigest_${today}`, JSON.stringify(top10));
    };

    const handleCopy = () => {
        if (!digest) return;
        const text = digest.map(job =>
            `${job.title} at ${job.company}\nLocation: ${job.location} (${job.mode})\nMatch: ${job.matchScore}%\nApply: ${job.applyUrl}\n`
        ).join('\n---\n\n');

        navigator.clipboard.writeText(text);
        alert('Digest copied to clipboard!');
    };

    const handleEmail = () => {
        if (!digest) return;
        const subject = "My 9AM Job Digest";
        const body = digest.map(job =>
            `${job.title} at ${job.company}\nLocation: ${job.location} (${job.mode})\nMatch: ${job.matchScore}%\nApply: ${job.applyUrl}\n`
        ).join('\n---\n\n');

        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    if (!preferences) {
        return (
            <div className="container" style={{ padding: 'var(--space-40) var(--space-24)' }}>
                <div style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-64)',
                    textAlign: 'center',
                    border: '1px solid var(--border-color)'
                }}>
                    <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-16)' }}>Set Preferences First</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-24)' }}>
                        Set your preferences to generate a personalized digest.
                    </p>
                    <a href="/settings" style={{
                        backgroundColor: 'var(--accent-color)',
                        color: '#FFFFFF',
                        padding: '12px 24px',
                        borderRadius: 'var(--radius-md)',
                        textDecoration: 'none',
                        fontWeight: 600
                    }}>
                        Go to Settings
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: 'var(--space-40) var(--space-24)', maxWidth: '800px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-24)' }}>
                <h1 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--text-2xl)',
                    margin: 0
                }}>
                    Daily Digest
                </h1>
                {!digest && (
                    <button
                        onClick={generateDigest}
                        style={{
                            backgroundColor: 'var(--text-primary)',
                            color: '#FFFFFF',
                            padding: '12px 24px',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer',
                            fontWeight: 600
                        }}
                    >
                        Generate Today's 9AM Digest (Simulated)
                    </button>
                )}
            </div>

            {digest && (
                <div style={{
                    backgroundColor: '#FFFFFF', // White card
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    border: '1px solid var(--border-color)',
                    overflow: 'hidden'
                }}>
                    {/* Header */}
                    <div style={{
                        padding: 'var(--space-40)',
                        borderBottom: '1px solid var(--border-color)',
                        textAlign: 'center',
                        backgroundColor: '#FAFAFA'
                    }}>
                        <h2 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'var(--text-2xl)',
                            marginBottom: 'var(--space-8)'
                        }}>
                            Top 10 Jobs For You — 9AM Digest
                        </h2>
                        <div style={{ color: 'var(--text-secondary)' }}>
                            {generatedDate} • <span style={{ fontSize: '12px', opacity: 0.7 }}>Demo Mode: Daily 9AM trigger simulated manually.</span>
                        </div>
                    </div>

                    {/* List */}
                    <div style={{ padding: 'var(--space-24)' }}>
                        {digest.length > 0 ? (
                            digest.map((job, index) => (
                                <div key={job.id} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: 'var(--space-24) 0',
                                    borderBottom: index < digest.length - 1 ? '1px solid var(--border-color)' : 'none'
                                }}>
                                    <div>
                                        <h3 style={{
                                            margin: '0 0 var(--space-4) 0',
                                            fontFamily: 'var(--font-heading)',
                                            fontSize: 'var(--text-lg)'
                                        }}>
                                            {job.title}
                                            <span style={{
                                                marginLeft: '12px',
                                                fontSize: '12px',
                                                backgroundColor: job.matchScore >= 80 ? 'var(--success-color)' : 'var(--warning-color)',
                                                color: '#fff',
                                                padding: '2px 8px',
                                                borderRadius: '12px',
                                                verticalAlign: 'middle',
                                                fontWeight: 600
                                            }}>{job.matchScore}%</span>
                                        </h3>
                                        <div style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
                                            {job.company} • {job.location}
                                        </div>
                                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                                            {job.experience} Yrs • posted {job.postedDaysAgo}d ago
                                        </div>
                                    </div>
                                    <a
                                        href={job.applyUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            padding: '8px 16px',
                                            border: '1px solid var(--border-color)',
                                            borderRadius: 'var(--radius-md)',
                                            textDecoration: 'none',
                                            color: 'var(--text-primary)',
                                            fontWeight: 500,
                                            fontSize: 'var(--text-sm)'
                                        }}
                                    >
                                        Apply
                                    </a>
                                </div>
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', padding: 'var(--space-40)', color: 'var(--text-secondary)' }}>
                                No matching roles today. Check again tomorrow.
                            </div>
                        )}
                    </div>

                    {/* Footer / Actions */}
                    <div style={{
                        padding: 'var(--space-24)',
                        backgroundColor: '#FAFAFA',
                        borderTop: '1px solid var(--border-color)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                            This digest was generated based on your preferences.
                        </div>
                        <div style={{ display: 'flex', gap: 'var(--space-16)' }}>
                            <button
                                onClick={handleCopy}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--text-primary)',
                                    cursor: 'pointer',
                                    fontSize: 'var(--text-sm)',
                                    fontWeight: 500,
                                    textDecoration: 'underline'
                                }}
                            >
                                Copy to Clipboard
                            </button>
                            <button
                                onClick={handleEmail}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--text-primary)',
                                    cursor: 'pointer',
                                    fontSize: 'var(--text-sm)',
                                    fontWeight: 500,
                                    textDecoration: 'underline'
                                }}
                            >
                                Create Email Draft
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DigestPage;
