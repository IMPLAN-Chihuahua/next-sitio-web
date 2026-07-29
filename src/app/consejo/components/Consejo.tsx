'use client'

import React, { useState, useMemo } from 'react'
import {
    Box,
    Container,
    Typography,
    TextField,
    InputAdornment,
    Chip,
    Button,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ConsejoCard from './ConsejoCard'
import { Consejero, SectorType } from '../definitions'
import { SubtitleH2, TitleH1 } from '@/app/components/Titles'

const BOARD_SECTORS = [
    {
        label: 'Social',
        value: SectorType.SOCIAL,
        color: '#2E7D32',
        gridColumn: '1 / 2',
        gridRow: '1',
        spanTwoColumns: false,
    },
    {
        label: 'Público',
        value: SectorType.PUBLICO,
        color: '#1565C0',
        gridColumn: '2 / 3',
        gridRow: '1',
        spanTwoColumns: false,
    },
    {
        label: 'Privado',
        value: SectorType.PRIVADO,
        color: '#D32F2F',
        gridColumn: '3 / 4',
        gridRow: '1',
        spanTwoColumns: false,
    },
    {
        label: 'Técnico-Académico',
        value: SectorType.TECNICO_ACADEMICO,
        color: '#F9A825',
        gridColumn: '4 / 5',
        gridRow: '1',
        spanTwoColumns: false,
    },
    {
        label: 'Público Federal',
        value: SectorType.PUBLICO_FEDERAL,
        color: '#0288D1',
        gridColumn: '1 / 2',
        gridRow: '2',
        spanTwoColumns: false,
    },
    {
        label: 'Público Estatal',
        value: SectorType.PUBLICO_ESTATAL,
        color: '#1976D2',
        gridColumn: '2 / 3',
        gridRow: '2',
        spanTwoColumns: false,
    },
    {
        label: 'Público Municipal',
        value: SectorType.PUBLICO_MUNICIPAL,
        color: '#0D47A1',
        gridColumn: '3 / 5',
        gridRow: '2',
        spanTwoColumns: true,
    },
]

const FILTERS = [
    { label: 'Todos', value: 'ALL' },
    { label: 'Social', value: SectorType.SOCIAL },
    { label: 'Público', value: SectorType.PUBLICO },
    { label: 'Público Federal', value: SectorType.PUBLICO_FEDERAL },
    { label: 'Público Estatal', value: SectorType.PUBLICO_ESTATAL },
    { label: 'Público Municipal', value: SectorType.PUBLICO_MUNICIPAL },
    { label: 'Privado', value: SectorType.PRIVADO },
    { label: 'Técnico-Académico', value: SectorType.TECNICO_ACADEMICO },
]

const INITIAL_VISIBLE_CARDS = 3

const Consejo = ({ data }: { data: Consejero[] }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedSector, setSelectedSector] = useState<SectorType | 'ALL'>('ALL')
    const [expandedSectors, setExpandedSectors] = useState<Record<string, boolean>>({})

    const hasSearch = searchTerm.trim().length > 0
    const isFilteredBySector = selectedSector !== 'ALL'
    const isBoardLayout = !hasSearch && !isFilteredBySector

    const groupedCounselors = useMemo(() => {
        const searchLower = searchTerm.trim().toLowerCase()

        return BOARD_SECTORS
            .map((sector) => {
                const items = data
                    .filter((consejero) => {
                        const sectorMatch = consejero.sector === sector.value

                        const textMatch =
                            !searchLower ||
                            consejero.nombre?.toLowerCase().includes(searchLower) ||
                            consejero.title?.toLowerCase().includes(searchLower)

                        return sectorMatch && textMatch
                    })
                    .sort((a, b) =>
                        a.nombre.localeCompare(b.nombre, 'es', {
                            sensitivity: 'base',
                        })
                    )

                return {
                    ...sector,
                    items,
                }
            })
            .filter((group) => {
                const selectedMatch =
                    selectedSector === 'ALL' || group.value === selectedSector

                return selectedMatch && group.items.length > 0
            })
    }, [data, selectedSector, searchTerm])

    const totalResults = groupedCounselors.reduce(
        (total, group) => total + group.items.length,
        0
    )

    const isSingleGroupView = groupedCounselors.length === 1

    const toggleSector = (sector: string) => {
        setExpandedSectors((prev) => ({
            ...prev,
            [sector]: !prev[sector],
        }))
    }

    return (
        <Box sx={{ pb: 10, bgcolor: '#fafafa', minHeight: '100vh' }}>
            <Container maxWidth="xl">
                <Box sx={{ mb: 5, textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
                    <TitleH1 title="Consejeros" />

                    <TextField
                        fullWidth
                        placeholder="Buscar por nombre, cargo..."
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{
                            bgcolor: 'white',
                            borderRadius: 2,
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { border: 'none' },
                            },
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

                <Box
                    sx={{
                        mb: 4,
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: 1.5,
                    }}
                >
                    {FILTERS.map((filter) => {
                        const isSelected = selectedSector === filter.value

                        return (
                            <Chip
                                key={filter.value}
                                label={filter.label}
                                clickable
                                variant={isSelected ? 'filled' : 'outlined'}
                                onClick={() =>
                                    setSelectedSector(filter.value as SectorType | 'ALL')
                                }
                                sx={{
                                    fontWeight: isSelected ? 800 : 400,
                                    border: isSelected ? 'none' : '1px solid #e0e0e0',
                                    bgcolor: isSelected ? '#e9e9e9' : 'white',
                                    fontSize: '0.9rem',
                                    height: '34px',
                                    px: 0.5,
                                    '&:hover': {
                                        bgcolor: isSelected ? '#e0e0e0' : '#f5f5f5',
                                    },
                                }}
                            />
                        )
                    })}
                </Box>

                {totalResults > 0 ? (
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                sm: 'repeat(2, minmax(0, 1fr))',
                                lg: 'repeat(4, minmax(0, 1fr))',
                            },
                            gap: 3,
                            alignItems: 'start',
                        }}
                    >
                        {groupedCounselors.map((group) => {
                            const isExpanded = expandedSectors[group.value]

                            const shouldLimitCards = isBoardLayout && !isExpanded

                            const visibleItems = shouldLimitCards
                                ? group.items.slice(0, INITIAL_VISIBLE_CARDS)
                                : group.items

                            const hasMore =
                                isBoardLayout &&
                                group.items.length > INITIAL_VISIBLE_CARDS

                            const isWidePanel = isBoardLayout && group.spanTwoColumns

                            return (
                                <Box
                                    key={group.value}
                                    sx={{
                                        gridColumn: {
                                            xs: 'auto',
                                            sm: isSingleGroupView ? '1 / -1' : 'auto',
                                            lg: isSingleGroupView
                                                ? '1 / -1'
                                                : isBoardLayout
                                                    ? group.gridColumn
                                                    : 'auto',
                                        },
                                        gridRow: {
                                            xs: 'auto',
                                            sm: 'auto',
                                            lg: isSingleGroupView
                                                ? 'auto'
                                                : isBoardLayout
                                                    ? group.gridRow
                                                    : 'auto',
                                        },
                                        bgcolor: '#f7f7f7',
                                        border: '1px solid #e5e5e5',
                                        overflow: 'hidden',
                                        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.04)',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            px: 2.5,
                                            py: 2,
                                            bgcolor: 'white',
                                            borderBottom: '1px solid #e5e5e5',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                mb: 1.5,
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                <Box
                                                    sx={{
                                                        width: 14,
                                                        height: 14,
                                                        borderRadius: '50%',
                                                        bgcolor: group.color,
                                                        flexShrink: 0
                                                    }}
                                                />
                                                <Typography
                                                    sx={{
                                                        fontWeight: 900,
                                                        color: 'text.primary',
                                                        textTransform: 'uppercase',
                                                        fontSize: '0.95rem',
                                                        letterSpacing: 0.5,
                                                    }}
                                                >
                                                    {group.label}
                                                </Typography>
                                            </Box>

                                            <Box
                                                sx={{
                                                    bgcolor: '#f1f1f1',
                                                    color: '#111827',
                                                    borderRadius: 999,
                                                    px: 1.5,
                                                    py: 0.3,
                                                    fontSize: '0.8rem',
                                                    fontWeight: 800,
                                                    lineHeight: 1.5,
                                                }}
                                            >
                                                {group.items.length}
                                            </Box>
                                        </Box>

                                        <Box
                                            sx={{
                                                height: 3,
                                                borderRadius: 999,
                                                bgcolor: group.color,
                                            }}
                                        />
                                    </Box>

                                    <Box
                                        sx={{
                                            p: 2,
                                            display: 'grid',
                                            gridTemplateColumns: {
                                                xs: '1fr',
                                                sm: isSingleGroupView
                                                    ? 'repeat(2, minmax(0, 1fr))'
                                                    : '1fr',
                                                md: isSingleGroupView
                                                    ? 'repeat(3, minmax(0, 1fr))'
                                                    : isWidePanel
                                                        ? 'repeat(2, minmax(0, 1fr))'
                                                        : '1fr',
                                                lg: isSingleGroupView
                                                    ? 'repeat(4, minmax(0, 1fr))'
                                                    : isWidePanel
                                                        ? 'repeat(2, minmax(0, 1fr))'
                                                        : '1fr',
                                            },
                                            gap: 2,
                                        }}
                                    >
                                        {visibleItems.map((consejero) => (
                                            <Box
                                                key={consejero.id}
                                                sx={{
                                                    minHeight: 235,
                                                    '& > *': {
                                                        height: '100%',
                                                    },
                                                }}
                                            >
                                                <ConsejoCard data={consejero} />
                                            </Box>
                                        ))}

                                        {hasMore && (
                                            <Box sx={{ gridColumn: '1 / -1' }}>
                                                <Button
                                                    onClick={() => toggleSector(group.value)}
                                                    sx={{
                                                        alignSelf: 'flex-start',
                                                        color: group.color,
                                                        fontWeight: 800,
                                                        textTransform: 'none',
                                                        px: 1,
                                                        '&:hover': {
                                                            bgcolor: `${group.color}14`,
                                                        },
                                                    }}
                                                >
                                                    {isExpanded
                                                        ? 'Ver menos'
                                                        : `Ver todos (${group.items.length})`}
                                                </Button>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                            )
                        })}
                    </Box>
                ) : (
                    <Box sx={{ width: '100%', textAlign: 'center', py: 10 }}>
                        <Typography variant="h6" color="text.disabled">
                            No se encontraron consejeros con esos criterios.
                        </Typography>
                    </Box>
                )}
            </Container>
        </Box>
    )
}

export default Consejo