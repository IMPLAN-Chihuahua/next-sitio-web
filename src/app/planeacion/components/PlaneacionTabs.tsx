'use client';

import { Tab, Tabs } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';

const tabs = [
    { label: 'Sistemas de Planeación', value: 'sistemas-planeacion' },
    { label: 'Datos Abiertos', value: 'datos-abiertos' },
    { label: 'Tableros', value: 'tableros' },
    { label: 'Guías y Manuales', value: 'guias-manuales' },
];

export default function PlaneacionTabs() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentTab = searchParams.get('tab') ?? 'sistemas-planeacion';

    const handleChange = (_event: React.SyntheticEvent, value: string) => {
        router.push(`/planeacion?tab=${value}`, {
            scroll: false,
        });
    };

    return (
        <Tabs
            value={currentTab}
            onChange={handleChange}
            sx={{
                minHeight: 66,

                '& .MuiTabs-indicator': {
                    height: 2,
                    backgroundColor: '#C6A535',
                },

                '& .MuiTab-root': {
                    minHeight: 66,
                    minWidth: 170,
                    px: 3,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    color: 'text.secondary',

                    '&.Mui-selected': {
                        color: 'text.primary',
                    },
                },
            }}
        >
            {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
        </Tabs>
    );
}
