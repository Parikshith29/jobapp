import React, { useState, useEffect } from 'react';
import { jobs } from '../data/jobs';
import JobCard from '../components/jobs/JobCard';
import JobModal from '../components/jobs/JobModal';

const SavedPage = () => {
    const [savedJobIds, setSavedJobIds] = useState(() => {
        const saved = localStorage.getItem('savedJobIds');
        return saved ? JSON.parse(saved) : [];
    });
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        localStorage.setItem('savedJobIds', JSON.stringify(savedJobIds));
    }, [savedJobIds]);

    const handleSave = (id) => {
        setSavedJobIds(prev =>
            prev.includes(id) ? prev.filter(jobId => jobId !== id) : [...prev, id]
        );
    };

    const handleView = (job) => {
        setSelectedJob(job);
    };

    const handleCloseModal = () => {
        setSelectedJob(null);
    };

    const savedJobs = jobs.filter(job => savedJobIds.includes(job.id));

    return (
        <div className="container" style={{ padding: 'var(--space-40) var(--space-24)' }}>
            <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-2xl)',
                marginBottom: 'var(--space-24)'
            }}>
                Saved Jobs
            </h1>

            {savedJobs.length > 0 ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: 'var(--space-24)'
                }}>
                    {savedJobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            onSave={handleSave}
                            onView={handleView}
                            isSaved={true}
                        />
                    ))}
                </div>
            ) : (
                <div style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-64)',
                    textAlign: 'center',
                    border: '1px solid var(--border-color)',
                    minHeight: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)'
                }}>
                    <div style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-8)' }}>
                        No saved jobs yet.
                    </div>
                    <div>
                        Visist the Dashboard to find and save jobs.
                    </div>
                </div>
            )}

            <JobModal
                job={selectedJob}
                onClose={handleCloseModal}
                onSave={handleSave}
                isSaved={selectedJob ? savedJobIds.includes(selectedJob.id) : false}
            />
        </div>
    );
};

export default SavedPage;
