'use client'
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaOptionsType } from 'embla-carousel'
import { CarouselDotButton, useDotButton } from './CarouselDotButton'
import { PrevButton, NextButton, usePrevNextbuttons } from './CarouselArrowButtons'
import styles from './Carousel.module.css'
import { Box, Button, Grid, Typography, Stack, Paper } from '@mui/material'
import { Project } from '@/app/definitions'
import Image from "next/image";

type PropType = {
    slides: Project[],
    options?: EmblaOptionsType
}

const Carousel = (props: PropType) => {
    const { slides, options } = props;

    const [emblaRef, emblaApi] = useEmblaCarousel(options)
    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextbuttons(emblaApi)

    return (
        <Box className={styles.embla} dir="ltr" >
            <Box className={styles.embla__viewport} ref={emblaRef}>
                <Box className={styles.embla__container}>
                    {slides.map((project, index) => (
                        <Box className={styles.embla__slide} key={index} sx={{ px: { xs: 1, md: 2 } }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    border: '1px solid',
                                    borderColor: 'grey.200',
                                    overflow: 'hidden',
                                    height: { xs: 'auto', md: '100%' },
                                    transition: 'all 0.3s ease-in-out',

                                }}
                            >
                                <Grid container sx={{
                                    flexDirection: { xs: 'column-reverse', md: 'row' },
                                    alignItems: 'center',
                                    height: { xs: 'auto', md: '100%' },
                                    bgcolor: 'background.paper'
                                }}>
                                    <Grid size={{ xs: 12, md: 6 }} sx={{
                                        p: { xs: 3, md: 5 },
                                        textAlign: { xs: 'center', md: 'left' }
                                    }}>
                                        <Typography
                                            variant='h4'
                                            fontWeight={'bold'}
                                            sx={{ fontSize: { xs: '1.5rem', md: '2.125rem' } }}
                                        >
                                            {project.title}
                                        </Typography>

                                        <Box sx={{ maxWidth: 500, mx: { xs: 'auto', md: 0 }, my: 2 }}>
                                            <Typography sx={{ fontSize: { xs: '0.9rem', md: '1.05rem' }, color: 'text.secondary', lineHeight: 1.6 }}>
                                                {project.description}
                                            </Typography>
                                        </Box>

                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            justifyContent={{ xs: 'center', md: 'flex-start' }}
                                            sx={{ mb: { xs: 2, md: 0 }, mt: 3 }}
                                        >
                                            {project.buttons.map((btn, idx) => (
                                                <Button
                                                    key={idx}
                                                    variant='contained'
                                                    sx={{ textTransform: "none", px: 4, fontWeight: 'bold', boxShadow: 'none' }}
                                                    href={btn.url}
                                                    target="_blank"
                                                >
                                                    {btn.text}
                                                </Button>
                                            ))}
                                        </Stack>
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 6 }} sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        pt: { xs: 4, md: 0 },
                                        pb: { xs: 0, md: 0 },
                                        height: { xs: 'auto', md: '100%' },
                                        width: '100%'
                                    }}>
                                        <Box sx={{
                                            position: 'relative',
                                            width: { xs: '90%', md: '80%' },
                                            height: { xs: '220px', md: '320px' },
                                            boxShadow: { xs: 'none', md: '0px 4px 20px rgba(0,0,0,0.15)' },
                                            overflow: 'hidden'
                                        }}>
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${project.media[0].formats?.medium?.url ||
                                                    project.media[0].formats?.small?.url ||
                                                    project.media[0].url
                                                    }`}
                                                unoptimized={true}
                                                alt={project.title}
                                                fill
                                                loading="eager"
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Box className={styles.embla__controls} sx={{
                px: { xs: 1, md: 2 },
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Box className={styles.embla__arrow__buttons} sx={{ display: 'flex', gap: 1 }}>
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} aria-label='Proyecto previo' />
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} aria-label='Proyecto siguiente' />
                </Box>

                <Box className={styles.embla__dots}>
                    {scrollSnaps.map((_, index) => (
                        <CarouselDotButton
                            key={index}
                            sx={{
                                '&:focus-visible': {
                                    outline: '3px solid',
                                    outlineColor: 'secondary.main',
                                    outlineOffset: '2px',
                                    borderRadius: '4px'
                                }
                            }}
                            aria-label={`Proyecto ${index + 1}`}
                            onClick={() => onDotButtonClick(index)}
                            className={`${styles.embla__dot} ${index === selectedIndex ? styles['embla__dot--selected'] : ''}`}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default Carousel