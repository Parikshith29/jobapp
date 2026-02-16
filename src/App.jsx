import React from 'react';
import MainLayout from './components/layout/MainLayout';
import PrimaryWorkspace from './components/workspace/PrimaryWorkspace';
import SecondaryPanel from './components/workspace/SecondaryPanel';

function App() {
  return (
    <MainLayout
      title="Project Initialization"
      description="Configure the fundamental settings and dependencies for your new KodNest application."
      step={1}
      totalSteps={5}
      status="In Progress"
    >
      <div className="workspace-grid">
        <PrimaryWorkspace />
        <SecondaryPanel />
      </div>
    </MainLayout>
  );
}

export default App;
