import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
// import { Menu, X } from 'lucide-react'; // Removed as we are using inline SVGs

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { to: "/dashboard", label: "Dashboard" },
        { to: "/saved", label: "Saved" },
        { to: "/digest", label: "Digest" },
        { to: "/settings", label: "Settings" },
        { to: "/proof", label: "Proof" },
    ];

    const activeStyle = {
        color: 'var(--accent-color)',
        borderBottom: '2px solid var(--accent-color)',
        fontWeight: 500
    };

    const defaultStyle = {
        color: 'var(--text-secondary)',
        textDecoration: 'none',
        padding: 'var(--space-8) 0',
        borderBottom: '2px solid transparent',
        transition: 'all var(--transition-fast)'
    };

    return (
        <nav className="navigation" style={{
            backgroundColor: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-color)',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 100,
            height: '60px'
        }}>
            <div className="container h-full flex items-center justify-between">
                {/* Logo */}
                <div style={{ fontWeight: 600, fontSize: 'var(--text-base)' }}>
                    KodNest <span style={{ opacity: 0.5 }}>Tracker</span>
                </div>

                {/* Desktop Menu */}
                <div className="desktop-menu flex gap-24 items-center" style={{ display: 'none' }}>
                    {/* I'll use a media query in CSS to toggle this, but inline styles are tricky for media queries. 
              I'll add a class 'desktop-nav' and 'mobile-nav' to a new CSS file or index.css to handle responsiveness properly.
          */}
                    {links.map(link => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            style={({ isActive }) => (isActive ? activeStyle : defaultStyle)}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="mobile-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ background: 'none', border: 'none', padding: 0 }}
                >
                    {isOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="mobile-menu" style={{
                    position: 'absolute',
                    top: '60px',
                    left: 0,
                    width: '100%',
                    backgroundColor: 'var(--bg-secondary)',
                    borderBottom: '1px solid var(--border-color)',
                    padding: 'var(--space-24)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-16)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                }}>
                    {links.map(link => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            onClick={() => setIsOpen(false)}
                            style={({ isActive }) => ({
                                ...defaultStyle,
                                ...(isActive ? { color: 'var(--accent-color)', fontWeight: 500 } : {}),
                                fontSize: 'var(--text-lg)',
                                padding: 'var(--space-8)'
                            })}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>
            )}
            <style>{`
        @media (min-width: 768px) {
          .desktop-menu { display: flex !important; }
          .mobile-toggle { display: none !important; }
          .mobile-menu { display: none !important; }
        }
      `}</style>
        </nav>
    );
};

export default Navigation;
