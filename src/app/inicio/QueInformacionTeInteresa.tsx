'use client'

import { Box, Grid, Typography, Link as MuiLink, Button, Paper } from "@mui/material";
import { Apartment, ArrowForward, ArrowForwardIos, Article, Grass, OpenInNew, Place, Subject } from "@mui/icons-material";
import Link from "next/link";

const SLIDES = [{
    title: 'Información cartográfica',
    desc: 'Para proyectos, tareas e investigaciones.',
    icon: <Place sx={{ fontSize: 40, color: 'primary.800' }} />,
    urls: [{
        label: 'Zonificación secundaria',
        href: '/cartografia/rzzdw2ql4pumwni4a7hsp3d6'
    }, {
        label: 'Estructura vial',
        href: '/cartografia/hogjhx2erwnjrfpdtk7ba60f'
    }, {
        label: 'Geo IMPLAN',
        href: 'https://idecuu.mpiochih.gob.mx/implan/apps/experiencebuilder/experience/?id=cd1420d3cbef4892881c5a9484a7363b#zoom_to_selection=true'
    },],
}, {
    title: 'El estado de un dictamen',
    desc: 'Da seguimiento a solicitudes del PDU y Ciudad Cercana.',
    icon: <Subject sx={{ fontSize: 40, color: 'primary.800' }} />,
    urls: [{
        label: 'Modificaciones al PDUCP',
        href: 'https://app.powerbi.com/view?r=eyJrIjoiY2I0Y2MyMjAtYjcwNi00NjhlLWIyN2UtYTgwZTllYThkYTQ1IiwidCI6IjQwNjJiMTc3LWEwMWMtNGM4Zi1iNDRkLWFlYjc1ODcwOGNkMCIsImMiOjR9'
    }, {
        label: 'Solicitudes de Ciudad Cercana',
        href: 'https://app.powerbi.com/view?r=eyJrIjoiNDIzN2ZlZjktOWFjMS00NzA0LTllYzQtNGU0MGYxMTU2ZmJhIiwidCI6IjQwNjJiMTc3LWEwMWMtNGM4Zi1iNDRkLWFlYjc1ODcwOGNkMCIsImMiOjR9'
    }]
}, {
    title: 'Planes de desarrollo urbano',
    icon: <Grass sx={{ fontSize: 40, color: 'primary.800' }} />,
    desc: 'Conoce los instrumentos de planeación vigentes.',
    urls: [{
        label: 'PDU 7ma actualización',
        href: '/planeacion/pdu-2040-7ma-actualizacion'
    }, {
        label: 'Patrimonio',
        href: '/',
    }, {
        label: 'Equipamiento',
        href: '/'
    }]
}, {
    icon: <Apartment sx={{ fontSize: 40, color: 'primary.800' }} />,
    title: 'Información de la ciudad',
    desc: 'Explora datos, mapas y estadísticas urbanas.',
    urls: [{
        label: 'Mapa de la ciudad',
        href: '/cartografia/u681svginu9l9tsc25448q4k'
    }, {
        label: 'Chihuahua métrica',
        href: 'https://www.chihuahuametrica.online/'
    }]
}]

const QueInformacionTeInteresa = () => {
    return (
        <Box>
            <Grid container spacing={2}>
                {
                    SLIDES.map((s, idx) => (
                        <Grid key={idx}
                            size={{ xs: 12, md: 6 }}
                            height={{ md: 220 }}
                            color='primary.900'
                            p={2}
                            sx={{
                                position: 'relative',
                                pl: 2,

                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    left: 0,
                                    top: '7%',
                                    height: '25%',
                                    width: '4px',
                                    bgcolor: 'secondary.900',
                                },
                            }}
                        >
                            {s.icon && s.icon}
                            <Typography mt={2} fontSize={22} fontWeight={600} component='h3' color='inherit'>{s.title}</Typography>
                            <Typography color='inherit'>{s.desc}</Typography>
                            <Box my={1} display='flex' flexWrap='wrap' gap={2}>
                                {
                                    s?.urls?.map((u, idx) => (
                                        <Button
                                            key={idx}
                                            LinkComponent={Link}
                                            href={u.href}
                                            target={u.href.startsWith('http') ? '_blank' : '_self'}
                                            variant="text"
                                            endIcon={u.href.startsWith('http') ? <OpenInNew /> : <ArrowForwardIos />}
                                            sx={{
                                                color: 'primary.900',
                                                textTransform: 'none'
                                            }}
                                        >{u.label}</Button>
                                        // <MuiLink key={idx} href={u.href}>{u.label}</MuiLink>
                                    ))
                                }
                            </Box>
                        </Grid>
                    ))
                }
            </Grid>
        </Box >
    )
}


export default QueInformacionTeInteresa;