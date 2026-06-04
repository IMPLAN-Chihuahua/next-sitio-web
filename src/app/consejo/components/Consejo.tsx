'use client'
import React, { useState, useMemo } from 'react'
import { Box, Container, Grid, Typography, TextField, InputAdornment, Chip, Stack } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ConsejoCard from './ConsejoCard'
import { Consejero, SectorType } from '../definitions'
import { SubtitleH2 } from '@/app/components/Titles'

const FILTERS = [
    { label: 'Todos', value: 'ALL', color: 'default' },
    { label: 'Social', value: SectorType.SOCIAL, color: 'success' }, // Verde
    { label: 'Público', value: SectorType.PUBLICO, color: 'primary' }, // Azul (General)
    { label: 'Público Federal', value: SectorType.PUBLICO_FEDERAL, color: 'info' }, // Azul claro
    { label: 'Público Estatal', value: SectorType.PUBLICO_ESTATAL, color: 'error' }, // Rojo (o el color que quieras)
    { label: 'Público Municipal', value: SectorType.PUBLICO_MUNICIPAL, color: 'secondary' }, // Morado/Otro
    { label: 'Privado', value: SectorType.PRIVADO, color: 'warning' }, // Naranja
    { label: 'Técnico-Académico', value: SectorType.TECNICO_ACADEMICO, color: 'secondary' }, // Morado
]

const Consejo = ({ data }: { data: Consejero[] }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedSector, setSelectedSector] = useState('ALL')

    const filteredCounselors = useMemo(() => {
        return data.filter((consejero) => {
            const sectorMatch = selectedSector === 'ALL' || consejero.sector === selectedSector;

            const searchLower = searchTerm.toLowerCase();
            const textMatch =
                consejero.nombre.toLowerCase().includes(searchLower) ||
                consejero.title.toLowerCase().includes(searchLower);

            return sectorMatch && textMatch;
        });
    }, [data, selectedSector, searchTerm]);

    return (
        <Box sx={{ pb: 10, bgcolor: '#fafafa', minHeight: '100vh' }}>
            <Container maxWidth="xl">
                <Box sx={{ mb: 6, textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
                    <SubtitleH2 title='Consejeros' />

                    {/* 2. BARRA DE BÚSQUEDA */}
                    <TextField
                        fullWidth
                        placeholder="Buscar por nombre, cargo..."
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{
                            bgcolor: 'white',
                            borderRadius: 2,
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { border: 'none' },
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        mb: 5,
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: 1.5
                    }}
                >
                    {FILTERS.map((filter) => {
                        const isSelected = selectedSector === filter.value;
                        return (
                            <Chip
                                key={filter.value}
                                label={filter.label}
                                clickable
                                color={isSelected ? (filter.color as any) : 'default'}
                                variant={isSelected ? 'filled' : 'outlined'}
                                onClick={() => setSelectedSector(filter.value)}
                                sx={{
                                    fontWeight: isSelected ? 'bold' : 'normal',
                                    border: isSelected ? 'none' : '1px solid #e0e0e0',
                                    bgcolor: isSelected ? undefined : 'white',
                                    fontSize: '0.9rem',
                                    height: '32px',
                                    '&:hover': {
                                        bgcolor: isSelected ? undefined : '#f5f5f5'
                                    }
                                }}
                            />
                        )
                    })}
                </Stack>

                {/* 4. RESULTADOS (GRID) */}
                <Grid container spacing={3}>
                    {filteredCounselors.length > 0 ? (
                        filteredCounselors.map((consejero) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={consejero.id}>
                                <ConsejoCard data={consejero} />
                            </Grid>
                        ))
                    ) : (
                        <Box sx={{ width: '100%', textAlign: 'center', py: 10 }}>
                            <Typography variant="h6" color="text.disabled">
                                No se encontraron consejeros con esos criterios.
                            </Typography>
                        </Box>
                    )}
                </Grid>

            </Container>
        </Box>
    )
}

export default Consejo