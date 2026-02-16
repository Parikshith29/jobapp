import React from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

const PrimaryWorkspace = () => {
    return (
        <div className="primary-workspace h-full flex-col gap-24">
            <Card title="Project Configuration" className="flex-1">
                <div className="grid-form" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-24)' }}>
                    <Input label="Project Name" placeholder="e.g. KodNest CRM" />
                    <Input label="Version" placeholder="e.g. 1.0.0" />
                    <Input label="Author" placeholder="e.g. John Doe" />
                    <Input label="License" placeholder="MIT" />
                </div>

                <div style={{ marginTop: 'var(--space-24)' }}>
                    <Input label="Description" placeholder="Brief application description..." />
                </div>

                <div className="actions flex justify-end gap-16" style={{ marginTop: 'var(--space-40)' }}>
                    <Button variant="secondary">Reset</Button>
                    <Button variant="primary">Generate Config</Button>
                </div>
            </Card>

            <Card title="Dependencies" className="h-[200px]">
                <div className="deps-list flex-col gap-8">
                    <div className="flex items-center gap-8">
                        <input type="checkbox" checked readOnly style={{ accentColor: 'var(--accent-color)' }} />
                        <span>React</span>
                    </div>
                    <div className="flex items-center gap-8">
                        <input type="checkbox" checked readOnly style={{ accentColor: 'var(--accent-color)' }} />
                        <span>Vite</span>
                    </div>
                    <div className="flex items-center gap-8">
                        <input type="checkbox" style={{ accentColor: 'var(--accent-color)' }} />
                        <span>TailwindCSS</span>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default PrimaryWorkspace;
