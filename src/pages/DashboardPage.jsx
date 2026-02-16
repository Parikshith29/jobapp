import React, { useState, useEffect } from 'react';
import { jobs } from '../data/jobs';
import JobCard from '../components/jobs/JobCard';
import JobModal from '../components/jobs/JobModal';
import FilterBar from '../components/jobs/FilterBar';

const DashboardPage = () => {
    const [savedJobIds, setSavedJobIds] = useState(() => {
        const saved = localStorage.getItem('savedJobIds');
        return saved ? JSON.parse(saved) : [];
    });

    const [filters, setFilters] = useState({
        keyword: '',
        location: '',
        mode: '',
        experience: '',
        sort: 'latest'
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

    const filteredJobs = jobs.filter(job => {
        const matchesKeyword = job.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
            job.company.toLowerCase().includes(filters.keyword.toLowerCase());
        const matchesLocation = filters.location ? job.location === filters.location : true;
        const matchesMode = filters.mode ? job.mode === filters.mode : true;
        const matchesExperience = filters.experience ? job.experience === filters.experience : true;

        return matchesKeyword && matchesLocation && matchesMode && matchesExperience;
    }).sort((a, b) => {
        if (filters.sort === 'latest') return a.postedDaysAgo - b.postedDaysAgo;
        if (filters.sort === 'oldest') return b.postedDaysAgo - a.postedDaysAgo;
        return 0;
    });

    return (
        <div className="container" style={{ padding: 'var(--space-40) var(--space-24)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-24)' }}>
                <h1 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--text-2xl)',
                    margin: 0
                }}>
                    Dashboard
                </h1>
                <span style={{ color: 'var(--text-secondary)' }}>
                    Showing {filteredJobs.length} jobs
                </span>
            </div>

            <FilterBar filters={filters} setFilters={setFilters} />

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 'var(--space-24)'
            }}>
                {filteredJobs.map(job => (
                    <JobCard
                        key={job.id}
                        job={job}
                        onSave={handleSave}
                        onView={handleView}
                        isSaved={savedJobIds.includes(job.id)}
                    />
                ))}
            </div>

            {filteredJobs.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: 'var(--space-64)',
                    color: 'var(--text-secondary)'
                }}>
                    No jobs match your filters.
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

export default DashboardPage;
