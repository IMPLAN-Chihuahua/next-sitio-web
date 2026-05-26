"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Box, Typography, Button, Container } from '@mui/material';

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {

    useEffect(() => {
        console.error("🚨 Error crítico capturado en el sitio:", error);
    }, [error]);

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: '#F8FAFC',
                padding: 3,
            }}
        >
            <Container maxWidth="md">
                <Box
                    sx={{
                        backgroundColor: 'background.paper',
                        padding: { xs: 4, md: 10 },
                        borderRadius: '24px',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.04)',
                    }}
                >
                    <Typography
                        variant="h3"
                        fontWeight="800"
                        sx={{
                            color: 'primary.main',
                            mb: 1.5,
                            fontSize: { xs: '1.8rem', md: '2.5rem' },
                        }}
                    >
                        Algo salió mal
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: 'text.secondary',
                            mb: 5,
                            fontSize: '1.1rem',
                            maxWidth: 500
                        }}
                    >
                        Hubo un problema de conexión o un error interno al cargar los datos de esta sección. Por favor, vuelve a intentarlo o regresa al inicio.
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                        <Button
                            onClick={() => reset()}
                            variant="contained"
                            sx={{
                                backgroundColor: 'primary.main',
                                borderRadius: '50px',
                                textTransform: 'none',
                                paddingX: 4,
                                paddingY: 1.2,
                                fontWeight: 600,
                                '&:hover': { backgroundColor: 'primary.dark' }
                            }}
                        >
                            Intentar de nuevo
                        </Button>

                        <Button
                            component={Link}
                            href="/"
                            variant="outlined"
                            sx={{
                                borderColor: 'primary.main',
                                color: 'primary.main',
                                borderRadius: '50px',
                                textTransform: 'none',
                                paddingX: 4,
                                paddingY: 1.2,
                                fontWeight: 600,
                                '&:hover': {
                                    borderColor: 'primary.dark',
                                    backgroundColor: 'rgba(0, 51, 102, 0.04)' // Un hover sutil con tu azul
                                }
                            }}
                        >
                            Ir al inicio
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}