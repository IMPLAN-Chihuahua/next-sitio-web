"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Box, Typography, Container } from '@mui/material';

export default function NotFound() {
    const router = useRouter();

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
                        backgroundColor: 'white',
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
                            color: 'secondary.main',
                            mb: 1.5,
                            fontSize: { xs: '1.8rem', md: '2.5rem' },
                            fontFamily: 'inherit'
                        }}
                    >
                        Página no encontrada
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: 'primary.main',
                            fontSize: '1.1rem',
                            maxWidth: 500
                        }}
                    >
                        Parece que la página que buscas no se encuentra en nuestro servidor.
                    </Typography>

                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: 550,
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Image
                            src="/404.png"
                            alt="Error 404 IMPLAN"
                            width={600}
                            height={400}
                            priority
                            style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'contain',
                            }}
                        />
                    </Box>

                    <Typography
                        variant="body1"
                        sx={{
                            color: 'primary.900',
                            fontSize: '1.05rem'
                        }}
                    >
                        Puedes volver a la{' '}
                        <Box
                            component="span"
                            onClick={() => router.back()}
                            sx={{
                                color: 'secondary.main',
                                fontWeight: 700,
                                textDecoration: 'underline',
                                cursor: 'pointer',
                                '&:hover': { color: 'secondary.900' }
                            }}
                        >
                            página anterior
                        </Box>
                        {' '}o a la{' '}
                        <Box
                            component={'span'}
                            sx={{

                                color: 'secondary.main',
                                '&:hover': { color: 'secondary.900' }
                            }}>

                            <Link
                                href="/"
                                style={{
                                    fontWeight: 700,
                                    textDecoration: 'underline',
                                }}
                            >
                                página de inicio
                            </Link>
                        </Box>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}

