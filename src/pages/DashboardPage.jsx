import React, { useState, useEffect, useMemo } from 'react';
import { jobs } from '../data/jobs';
import JobCard from '../components/jobs/JobCard';
import JobModal from '../components/jobs/JobModal';
import FilterBar from '../components/jobs/FilterBar';
import { calculateMatchScore } from '../utils/scoring';

const DashboardPage = () => {
    const [savedJobIds, setSavedJobIds] = useState(() => {
        const saved = localStorage.getItem('savedJobIds');
        return saved ? JSON.parse(saved) : [];
    });

    const [preferences, setPreferences] = useState(null);

    const [filters, setFilters] = useState({
        keyword: '',
        location: '',
        mode: '',
        experience: '',
        sort: 'latest',
        showOnlyMatches: false
    });

    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (savedPrefs) {
            setPreferences(JSON.parse(savedPrefs));
        }
    }, []);

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

    const scoredJobs = useMemo(() => {
        return jobs.map(job => ({
            ...job,
            matchScore: preferences ? calculateMatchScore(job, preferences) : 0
        }));
    }, [preferences]);

    const filteredJobs = scoredJobs.filter(job => {
        const matchesKeyword = job.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
            job.company.toLowerCase().includes(filters.keyword.toLowerCase());
        const matchesLocation = filters.location ? job.location === filters.location : true;
        const matchesMode = filters.mode ? job.mode === filters.mode : true;
        const matchesExperience = filters.experience ? job.experience === filters.experience : true;

        // Match Score Filter
        const matchesScore = filters.showOnlyMatches && preferences
            ? job.matchScore >= (preferences.minMatchScore || 0)
            : true;

        return matchesKeyword && matchesLocation && matchesMode && matchesExperience && matchesScore;
    }).sort((a, b) => {
        if (filters.sort === 'match_score') return b.matchScore - a.matchScore;
        if (filters.sort === 'latest') return a.postedDaysAgo - b.postedDaysAgo;
        if (filters.sort === 'oldest') return b.postedDaysAgo - a.postedDaysAgo;
        return 0;
    });

    return (
        <div className="container" style={{ padding: 'var(--space-40) var(--space-24)' }}>
            {!preferences && (
                <div style={{
                    backgroundColor: 'var(--text-primary)',
                    color: '#FFFFFF',
                    padding: 'var(--space-16) var(--space-24)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: 'var(--space-24)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <span>Set your preferences to activate intelligent matching.</span>
                    <a href="/settings" style={{ color: '#FFFFFF', fontWeight: 600 }}>Configure Now &rarr;</a>
                </div>
            )}

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
