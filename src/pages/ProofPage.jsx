import React, { useState, useEffect } from 'react';

const steps = [
    { id: 1, label: "Project Setup", status: "Completed" },
    { id: 2, label: "Dashboard Logic", status: "Completed" },
    { id: 3, label: "Match Scoring Engine", status: "Completed" },
    { id: 4, label: "Saved Jobs Feature", status: "Completed" },
    { id: 5, label: "Daily Digest Engine", status: "Completed" },
    { id: 6, label: "Status Tracking System", status: "Completed" },
    { id: 7, label: "Test Checklist", status: "Pending" }, // Dynamic check
    { id: 8, label: "Final Polish", status: "Completed" },
];

const ProofPage = () => {
    const [artifacts, setArtifacts] = useState({
        lovableLink: '',
        githubLink: '',
        deployLink: ''
    });

    const [testsPassed, setTestsPassed] = useState(false);
    const [isShipped, setIsShipped] = useState(false);

    useEffect(() => {
        // Load artifacts
        const savedArtifacts = localStorage.getItem('jobTrackerArtifacts');
        if (savedArtifacts) {
            setArtifacts(JSON.parse(savedArtifacts));
        }

        // Check tests
        const savedTests = localStorage.getItem('testChecklist');
        if (savedTests) {
            const checkedItems = JSON.parse(savedTests);
            const passedCount = Object.values(checkedItems).filter(Boolean).length;
            setTestsPassed(passedCount === 10);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newArtifacts = { ...artifacts, [name]: value };
        setArtifacts(newArtifacts);
        localStorage.setItem('jobTrackerArtifacts', JSON.stringify(newArtifacts));
    };

    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    const allLinksValid = artifacts.lovableLink && isValidUrl(artifacts.lovableLink) &&
        artifacts.githubLink && isValidUrl(artifacts.githubLink) &&
        artifacts.deployLink && isValidUrl(artifacts.deployLink);

    const canShip = testsPassed && allLinksValid;

    useEffect(() => {
        if (canShip) {
            setIsShipped(true);
        } else {
            setIsShipped(false);
        }
    }, [canShip]);

    const handleCopy = () => {
        const text = `
Job Notification Tracker — Final Submission

Lovable Project:
${artifacts.lovableLink}

GitHub Repository:
${artifacts.githubLink}

Live Deployment:
${artifacts.deployLink}

Core Features:
- Intelligent match scoring
- Daily digest simulation
- Status tracking
- Test checklist enforced
`.trim();

        navigator.clipboard.writeText(text);
        alert('Final submission copied to clipboard!');
    };

    return (
        <div className="container" style={{ padding: 'var(--space-40) var(--space-24)', maxWidth: '800px' }}>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-8)' }}>
                Project 1 — Job Notification Tracker
            </h1>
            <div style={{ marginBottom: 'var(--space-24)', display: 'flex', alignItems: 'center', gap: 'var(--space-16)' }}>
                <span style={{
                    backgroundColor: isShipped ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 193, 7, 0.1)',
                    color: isShipped ? 'var(--success-color)' : 'var(--warning-color)',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 600,
                    fontSize: 'var(--text-sm)'
                }}>
                    {isShipped ? 'Shipped' : 'In Progress'}
                </span>
                {isShipped && <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>Project 1 Shipped Successfully.</span>}
            </div>

            {/* Step Summary */}
            <div style={{
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-24)',
                marginBottom: 'var(--space-32)',
                border: '1px solid var(--border-color)'
            }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-16)' }}>
                    Step Completion Summary
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-12)' }}>
                    {steps.map(step => {
                        const isTestStep = step.id === 7;
                        const isCompleted = isTestStep ? testsPassed : true;

                        return (
                            <div key={step.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
                                <span style={{ color: 'var(--text-primary)' }}>{step.label}</span>
                                <span style={{
                                    color: isCompleted ? 'var(--success-color)' : 'var(--warning-color)',
                                    fontWeight: 500
                                }}>
                                    {isCompleted ? 'Completed' : 'Pending'}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Artifact Collection */}
            <div style={{ marginBottom: 'var(--space-32)' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-16)' }}>
                    Artifact Collection
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-16)' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: 'var(--space-8)', fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                            Lovable Project Link
                        </label>
                        <input
                            type="text"
                            name="lovableLink"
                            value={artifacts.lovableLink}
                            onChange={handleChange}
                            placeholder="https://lovable.dev/..."
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border-color)',
                                fontSize: 'var(--text-base)'
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: 'var(--space-8)', fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                            GitHub Repository Link
                        </label>
                        <input
                            type="text"
                            name="githubLink"
                            value={artifacts.githubLink}
                            onChange={handleChange}
                            placeholder="https://github.com/..."
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border-color)',
                                fontSize: 'var(--text-base)'
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: 'var(--space-8)', fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                            Deployed URL
                        </label>
                        <input
                            type="text"
                            name="deployLink"
                            value={artifacts.deployLink}
                            onChange={handleChange}
                            placeholder="https://..."
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border-color)',
                                fontSize: 'var(--text-base)'
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Actions */}
            <button
                onClick={handleCopy}
                disabled={!isShipped}
                style={{
                    backgroundColor: isShipped ? 'var(--text-primary)' : 'var(--text-secondary)', // Use text-secondary (usually grey) for disabled
                    color: '#FFFFFF',
                    padding: '14px 28px',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: 'var(--text-base)',
                    cursor: isShipped ? 'pointer' : 'not-allowed',
                    width: '100%',
                    opacity: isShipped ? 1 : 0.7
                }}
            >
                {isShipped ? 'Copy Final Submission' : 'Complete All Steps to Ship'}
            </button>
        </div>
    );
};

export default ProofPage;
