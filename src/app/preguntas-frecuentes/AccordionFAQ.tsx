'use client'
import { Accordion, Box, Container, Typography, AccordionSummary, AccordionDetails, Button, Stack } from '@mui/material';
import React, { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FaqItem } from './definitions';
import { TitleH1 } from '../components/Titles';
import { visuallyHidden } from '@mui/utils';

const AccordionFAQ = ({ data, urlContacto }: { data: FaqItem[], urlContacto: string }) => {
    const [expanded, setExpanded] = useState<number | false>(false);

    const handleChange = (panelId: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panelId : false);
    };

    return (
        <Container sx={{ my: 3 }}>
            <TitleH1 title='Preguntas frecuentes' />
            <Typography component="h2" sx={visuallyHidden}>
                Categorías y preguntas
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {data.length > 0 ? (
                    data.map((faq) => (
                        <Accordion
                            key={faq.id}
                            expanded={expanded === faq.id}
                            onChange={handleChange(faq.id)}
                            disableGutters
                            elevation={0}
                            sx={{
                                '&:before': { display: 'none' },
                                borderBottom: '1px solid #EAECF0',
                                backgroundColor: 'transparent'
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: '#98A2B3' }} />}
                                aria-controls={`${faq.id}-content`}
                                id={`${faq.id}-header`}
                                sx={{ px: 0 }}
                            >
                                <Typography variant="body1" fontWeight="600" color="#101828">
                                    {faq.question}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ px: 0, pb: 3 }}>
                                <Typography variant="body2" color="text.primary" lineHeight={1.6}>
                                    {faq.answer}
                                </Typography>
                                {faq.extras && faq.extras.length > 0 && (
                                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                                        {faq.extras.map((extra) => (
                                            <Button
                                                key={extra.id}
                                                variant="contained"
                                                size="small"
                                                href={extra.url || '#'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                sx={{
                                                    textTransform: 'none',
                                                    borderRadius: 2
                                                }}
                                            >
                                                {extra.text}
                                            </Button>
                                        ))}
                                    </Stack>
                                )}
                            </AccordionDetails>
                        </Accordion>
                    ))
                ) : (
                    <Typography variant="body1" component={'p'} textAlign="center" color="text.secondary">
                        No hay preguntas en esta categoría.
                    </Typography>
                )}
            </Box>

            <Box sx={{ textAlign: 'center', bgcolor: '#F9FAFB', p: 4, borderRadius: 4 }}>
                <Typography variant="body1" component={'p'} fontWeight="bold" gutterBottom>
                    ¿No encontraste lo que buscabas?
                </Typography>
                <Typography variant="body1" color="text.primary" paragraph>
                    Ponte en contacto con nosotros
                </Typography>
                <Button
                    variant="contained"
                    href={urlContacto || '#'}
                    target="_blank"
                    sx={{
                        mt: 1,
                        color: 'black',
                        bgcolor: 'secondary.main',
                        textTransform: 'none',
                        borderRadius: '8px',
                        fontWeight: 600
                    }}
                >
                    Contactar
                </Button>
            </Box>
        </Container>
    )
}

export default AccordionFAQ