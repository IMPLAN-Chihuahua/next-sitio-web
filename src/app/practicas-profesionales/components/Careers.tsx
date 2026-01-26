'use client'
import React, { useMemo, useState } from 'react';
import { Box, Container, TextField, Typography, InputAdornment, Stack, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import JobListingItem from '../../quienes-somos/components/JobListingItem';
import { Vacante } from '@/app/definitions';
import { motion, AnimatePresence } from 'framer-motion';

const TIPO_LABEL: Record<string, string> = {
    'Practicas': 'Prácticas Profesionales',
    'Trabajo': 'Bolsa de Trabajo',
    'Servicio': 'Servicio Social'
};

const HORARIO_LABEL: Record<string, string> = {
    'Flexible': 'Horario Flexible',
    'Completo': 'Tiempo Completo',
    'Objetivos': 'Por Objetivos'
};

const MODALIDAD_LABEL: Record<string, string> = {
    'presencial': 'Presencial',
    'hibrido': 'Híbrido',
    'remoto': '100% Remoto',
    'campo': 'Trabajo de Campo'
};

const Careers = ({ data }: { data: Vacante[] }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState<string | null>(null);

    const filteredJobs = useMemo(() => {
        return data.filter((job) => {
            const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.description.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory = activeFilter ? job.tipo === activeFilter : true;

            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, activeFilter, data]);

    if (!data || data.length === 0) {
        return null;
    }

    const getBadgesForJob = (job: Vacante) => {
        const badges = [];

        if (job.tipo) {
            badges.push({
                label: TIPO_LABEL[job.tipo] || job.tipo,
                iconType: 'type' as const
            });
        }

        if (job.horario) {
            badges.push({
                label: HORARIO_LABEL[job.horario] || job.horario,
                iconType: 'time' as const
            });
        }

        if (job.modalidad) {
            badges.push({
                label: MODALIDAD_LABEL[job.modalidad] || job.modalidad,
                iconType: 'location' as const
            });
        }

        return badges;
    };

    return (
        <Box sx={{ backgroundColor: 'background.paper' }}>
            <Container maxWidth="lg">
                <TextField
                    fullWidth
                    placeholder="Buscar vacante por puesto o palabras clave..."
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
                    <Typography variant="body2" sx={{ alignSelf: 'center', mr: 1, fontWeight: 'bold' }}>
                        Filtrar por:
                    </Typography>
                    <Chip
                        label="Todas"
                        onClick={() => setActiveFilter(null)}
                        variant={activeFilter === null ? "filled" : "outlined"}
                        color={activeFilter === null ? "primary" : "default"}
                    />
                    {Object.keys(TIPO_LABEL).map((key) => (
                        <Chip
                            key={key}
                            label={TIPO_LABEL[key]}
                            onClick={() => setActiveFilter(key)}
                            variant={activeFilter === key ? "filled" : "outlined"}
                            color={activeFilter === key ? "primary" : "default"}
                        />
                    ))}
                </Stack>

                <Box component={motion.div} layout sx={{ mt: 4 }}>
                    <AnimatePresence mode='popLayout'>
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job) => (
                                <motion.div
                                    key={job.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <JobListingItem
                                        title={job.title}
                                        description={job.description}
                                        applyUrl={`mailto:contacto@implan.gob.mx?subject=Aplicación para: ${job.title}`}
                                        badges={getBadgesForJob(job)}
                                    />
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <Typography variant="h6" sx={{ textAlign: 'center', py: 10, color: 'text.secondary' }}>
                                    No se encontraron vacantes...
                                </Typography>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Box>
            </Container>
        </Box>
    );
};

export default Careers;