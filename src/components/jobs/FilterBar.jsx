import React from 'react';

const FilterBar = ({ filters, setFilters }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const selectStyle = {
        padding: 'var(--space-8)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-secondary)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-sm)',
        color: 'var(--text-primary)',
        cursor: 'pointer'
    };

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-16)',
            marginBottom: 'var(--space-24)',
            padding: 'var(--space-16)',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)'
        }}>
            <input
                type="text"
                name="keyword"
                placeholder="Search role or company..."
                value={filters.keyword}
                onChange={handleChange}
                style={{
                    flex: '2 1 200px',
                    padding: 'var(--space-8) var(--space-16)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)'
                }}
            />

            <select name="location" value={filters.location} onChange={handleChange} style={selectStyle}>
                <option value="">All Locations</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
                <option value="Chennai">Chennai</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Gurgaon">Gurgaon</option>
                <option value="Noida">Noida</option>
                <option value="Remote">Remote</option>
            </select>

            <select name="mode" value={filters.mode} onChange={handleChange} style={selectStyle}>
                <option value="">All Modes</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Onsite">Onsite</option>
            </select>

            <select name="experience" value={filters.experience} onChange={handleChange} style={selectStyle}>
                <option value="">All Experience</option>
                <option value="Fresher">Fresher</option>
                <option value="0-1">0-1 Years</option>
                <option value="1-3">1-3 Years</option>
                <option value="3-5">3-5 Years</option>
            </select>

            <select name="sort" value={filters.sort} onChange={handleChange} style={selectStyle}>
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
            </select>
        </div>
    );
};

export default FilterBar;
