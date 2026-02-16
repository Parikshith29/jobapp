import React from 'react';
import TopBar from './TopBar';
import ContextHeader from './ContextHeader';
import ProofFooter from './ProofFooter';

const MainLayout = ({ children, title, description, step = 1, totalSteps = 4, status = "In Progress" }) => {
    return (
        <div className="main-layout" style={{ minHeight: '100vh', paddingBottom: '50px' }}>
            <TopBar step={step} totalSteps={totalSteps} status={status} />

            <ContextHeader title={title} description={description} />

            <main className="workspace-container">
                {children}
            </main>

            <ProofFooter />
        </div>
    );
};

export default MainLayout;
