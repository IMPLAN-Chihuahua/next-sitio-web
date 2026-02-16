'use client'
import React, { useMemo, useState } from 'react';
import {
    Container, Grid, Typography, Box, Link, Dialog, DialogContent, IconButton,
    TextField,
    InputAdornment,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import TeamMemberCard from './TeamMembers';
import { Media, TeamMember } from '@/app/definitions';
import Image from 'next/image';

import { SvgIconComponent } from "@mui/icons-material";
import CodeIcon from '@mui/icons-material/Code';
import GavelIcon from '@mui/icons-material/Gavel';
import BrushIcon from '@mui/icons-material/Brush';
import MapIcon from '@mui/icons-material/Map';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import HiveIcon from '@mui/icons-material/Hive';
import { motion, AnimatePresence } from 'framer-motion';

const departmentStyles: Record<string, { icon: SvgIconComponent }> = {
    'Infraestructura Tecnológica': { icon: CodeIcon },
    'Jurídico': { icon: GavelIcon, },
    'Diseño': { icon: BrushIcon, },
    'Dirección': { icon: HiveIcon, },
    'Vinculación': { icon: CameraAltRoundedIcon, },
    'Geomática': { icon: MapIcon, },
    'Planes y Programas': { icon: ArchitectureIcon, },
    'default': { icon: AccountCircleIcon },
};

const getDeptStyle = (deptName: string | undefined | null) => {
    if (deptName && departmentStyles[deptName]) {
        return departmentStyles[deptName];
    }
    return departmentStyles['default'];
};

const getStrapiImage = (photo: any) => {
    if (!photo) return null;

    const selectedUrl = photo.formats?.small?.url ||
        photo.formats?.medium?.url ||
        photo.url;

    return selectedUrl.startsWith('http')
        ? selectedUrl
        : `${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${selectedUrl}`;
};


const TeamDirectory = ({ data, organigrama }: { data: TeamMember[], organigrama: Media }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDept, setSelectedDept] = useState('Todos');

    const uniqueDepartments = useMemo(() => {
        const depts = data
            .map(m => m.departamento?.nombre) // Obtener nombres
            .filter((nombre): nombre is string => !!nombre); // Quitar nulls/undefined

        return Array.from(new Set(depts)).sort();
    }, [data]);

    const filteredData = useMemo(() => {
        const sorted = [...data].sort((a, b) => {
            const fullNameA = `${a.apellidos} ${a.nombres}`.toLowerCase();
            const fullNameB = `${b.apellidos} ${b.nombres}`.toLowerCase();
            return fullNameA.localeCompare(fullNameB, 'es', { sensitivity: 'base' });
        });

        return sorted.filter((member) => {
            const fullName = `${member.nombres} ${member.apellidos}`.toLowerCase();
            const matchesSearch =
                fullName.includes(searchTerm.toLowerCase()) ||
                member.titulo?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesDept =
                selectedDept === 'Todos' ||
                member.departamento?.nombre === selectedDept;

            return matchesSearch && matchesDept;
        });
    }, [data, searchTerm, selectedDept]);


    const PLACEHOLDER_IMAGE = 'https://i.pravatar.cc/300?u=placeholder';

    const sortedData = useMemo(() => {
        const dataCopy = [...data];

        return dataCopy.sort((a, b) => {
            const fullNameA = `${a.apellidos} ${a.nombres}`.toLowerCase();
            const fullNameB = `${b.apellidos} ${b.nombres}`.toLowerCase();
            return fullNameA.localeCompare(fullNameB, 'es', { sensitivity: 'base' });
        });
    }, [data]);

    return (
        <Box sx={{ bgcolor: '#f9fafb' }}>
            <Container maxWidth="lg">
                <Box textAlign="center" mb={8}>
                    <Typography variant="h3" fontWeight="800" gutterBottom color="text.primary">
                        Conócenos
                    </Typography>
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ maxWidth: 700, mx: 'auto', fontWeight: 'normal' }}
                    >
                        Conoce las caras que están detrás del Instituto o{' '}
                        <Link
                            component="button"
                            variant="inherit"
                            onClick={handleOpenDialog}
                            sx={{
                                color: 'primary.main',
                                textDecorationColor: (theme) => theme.palette.primary.main,
                                cursor: 'pointer',
                                fontWeight: 'medium',
                                verticalAlign: 'baseline'
                            }}
                        >
                            consulta el organigrama
                        </Link>
                    </Typography>

                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        justifyContent="center"
                        sx={{
                            mt: 4
                        }}
                    >
                        {/* Input de Búsqueda */}
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Buscar por nombre o puesto..."
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
                            sx={{ bgcolor: 'white' }}
                        />

                        <FormControl sx={{ minWidth: 280, bgcolor: 'white' }}>
                            <InputLabel id="dept-select-label">Departamento</InputLabel>
                            <Select
                                labelId="dept-select-label"
                                value={selectedDept}
                                label="Departamento"
                                onChange={(e) => setSelectedDept(e.target.value)}
                                startAdornment={
                                    <InputAdornment position="start" sx={{ mr: 1, ml: 1 }}>
                                        <FilterListIcon color="action" fontSize="small" />
                                    </InputAdornment>
                                }
                            >
                                <MenuItem value="Todos">
                                    <em>Todos los departamentos</em>
                                </MenuItem>
                                {uniqueDepartments.map((dept) => (
                                    <MenuItem key={dept} value={dept}>
                                        {dept}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                </Box>

                <Grid container spacing={6} justifyContent="center" component={motion.div}>
                    <AnimatePresence mode='popLayout'>
                        {filteredData.length > 0 ? (
                            filteredData.map((member) => {
                                const fullName = `${member.nombres} ${member.apellidos}`;

                                const imageUrl = getStrapiImage(member.photo) || PLACEHOLDER_IMAGE;

                                const deptStyle = getDeptStyle(member.departamento?.nombre);

                                return (
                                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={member.id}
                                        component={motion.div}
                                        layout
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <TeamMemberCard
                                            name={fullName}
                                            role={member.titulo}
                                            imageUrl={imageUrl}
                                            icon={deptStyle.icon}
                                            iconColor="secondary.main"
                                        />
                                    </Grid>
                                );
                            })
                        ) : (
                            <Grid size={{ xs: 12 }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
                                    No encontramos a nadie con esos criterios 🕵️‍♂️
                                </Typography>
                            </Grid>
                        )}
                    </AnimatePresence>
                </Grid>

                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    maxWidth="xl"
                    fullWidth
                    scroll="body"
                >
                    <IconButton
                        onClick={handleCloseDialog}
                        sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500], zIndex: 1, bgcolor: 'white' }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent
                        sx={{
                            p: 0,
                            bgcolor: 'background.paper',
                            position: 'relative',
                            width: '100%',
                            height: '80vh',
                            overflow: 'hidden',
                        }}
                    >
                        <Image
                            src={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${organigrama.url}`}
                            alt="Organigrama del Instituto IMPLAN"
                            fill
                            unoptimized={true}
                            style={{
                                objectFit: 'contain',
                            }}
                        />
                    </DialogContent>
                </Dialog>
            </Container>
        </Box>
    );
};

export default TeamDirectory;