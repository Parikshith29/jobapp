export const calculateMatchScore = (job, preferences) => {
    if (!preferences) return 0;

    let score = 0;
    const {
        roleKeywords = '',
        preferredLocations = [],
        preferredMode = [],
        experienceLevel = '',
        skills = '',
    } = preferences;

    // Helper for case-insensitive check
    const containsKeyword = (text, keyword) => {
        if (!text || !keyword) return false;
        return text.toLowerCase().includes(keyword.trim().toLowerCase());
    };

    // 1. Role Keywords (+25 Title, +15 Description)
    const keywords = roleKeywords.split(',').filter(k => k.trim());
    let titleMatch = false;
    let descMatch = false;

    for (const keyword of keywords) {
        if (containsKeyword(job.title, keyword)) titleMatch = true;
        if (containsKeyword(job.description, keyword)) descMatch = true;
    }

    if (titleMatch) score += 25;
    if (descMatch) score += 15;

    // 2. Location (+15)
    // preferredLocations is an array of strings
    if (preferredLocations.some(loc => containsKeyword(job.location, loc))) {
        score += 15;
    }

    // 3. Mode (+10)
    // preferredMode is an array of strings (Remote, Hybrid, Onsite)
    if (preferredMode.includes(job.mode)) {
        score += 10;
    }

    // 4. Experience (+10)
    // Check for exact match or if job experience string contains the preferred level
    if (experienceLevel && (job.experience === experienceLevel || job.experience.includes(experienceLevel))) {
        score += 10;
    }

    // 5. Skills Overlap (+15)
    const userSkills = skills.split(',').map(s => s.trim().toLowerCase()).filter(s => s);
    const jobSkills = job.skills.map(s => s.toLowerCase());
    const hasSkillMatch = userSkills.some(skill => jobSkills.some(jobSkill => jobSkill.includes(skill) || skill.includes(jobSkill)));

    if (hasSkillMatch) {
        score += 15;
    }

    // 6. Freshness (+5 if <= 2 days)
    if (job.postedDaysAgo <= 2) {
        score += 5;
    }

    // 7. Source (+5 if LinkedIn)
    if (job.source === 'LinkedIn') {
        score += 5;
    }

    // Cap at 100
    return Math.min(score, 100);
};
