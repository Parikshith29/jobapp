import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const SecondaryPanel = () => {
    return (
        <div className="secondary-panel h-full flex-col gap-24">
            <Card title="Instructions" className="flex-col gap-16">
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                    Configure the base settings for your new project. Ensure the naming conventions follow the system guidelines.
                </p>

                <div className="prompt-box" style={{
                    backgroundColor: '#F5F5F5',
                    padding: 'var(--space-16)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px dashed var(--border-color)',
                    fontSize: 'var(--text-xs)',
                    fontFamily: 'monospace',
                    color: 'var(--text-secondary)'
                }}>
                    Create a new React project with the specified configuration...
                </div>

                <Button variant="secondary" className="w-full">Copy Prompt</Button>
            </Card>

            <Card title="Actions" className="flex-col gap-16">
                <Button variant="primary" className="w-full">Build in Lovable</Button>
                <div className="grid-actions" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)' }}>
                    <Button variant="secondary" style={{ fontSize: 'var(--text-xs)' }}>It Worked</Button>
                    <Button variant="secondary" style={{ fontSize: 'var(--text-xs)', color: 'var(--warning-color)', borderColor: 'var(--warning-color)' }}>Error</Button>
                </div>
                <Button variant="ghost" className="w-full" style={{ fontSize: 'var(--text-xs)' }}>Add Screenshot</Button>
            </Card>
        </div>
    );
};

export default SecondaryPanel;
