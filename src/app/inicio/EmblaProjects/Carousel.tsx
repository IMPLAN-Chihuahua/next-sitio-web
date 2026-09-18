'use client'
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaOptionsType } from 'embla-carousel'
import { CarouselDotButton, useDotButton } from './CarouselDotButton'
import { PrevButton, NextButton, usePrevNextbuttons } from './CarouselArrowButtons'
import styles from './Carousel.module.css'
import { Box, Button, Grid, Typography, Stack, Paper, IconButton } from '@mui/material'
import { Project } from '@/app/definitions'
import Image from "next/image";
import VerMasButton from '@/app/components/VerMasButton'
import { ArrowLeft, ChevronRight, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import Link from 'next/link'

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
        <Box className={styles.embla} dir="ltr" mx={{ md: 5 }}>
            <Box className={styles.embla__viewport} ref={emblaRef}>
                <Box className={styles.embla__container}>
                    {slides.map((project, index) => (
                        <Box
                            className={styles.embla__slide}
                            sx={{
                                flex: "0 0 92%",
                            }}
                            key={index}>
                            <Grid
                                component={Paper}
                                variant='outlined'
                                container
                                sx={{
                                    height: { xs: '100%', md: '450px' },
                                    p: { xs: 1, md: 3 }
                                }}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography
                                        variant='h2'
                                        component='h3'
                                        mt={{ md: 3 }}
                                    >
                                        {project.title}
                                    </Typography>

                                    <Box sx={{ mx: { xs: 'auto', md: 0 }, my: 2 }}>
                                        <Typography
                                            sx={{
                                                fontSize: { xs: '0.9rem', md: '1.05rem' },
                                                color: 'text.secondary',
                                                lineHeight: 1.6,
                                                textDecoration: 'none',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 4,
                                                WebkitBoxOrient: 'vertical',
                                                wordBreak: 'break-word',
                                                overflow: 'hidden'
                                            }}>
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
                                            <VerMasButton
                                                key={idx}
                                                href={btn.url}
                                                target={'blank'}
                                            >
                                                {btn.text}
                                            </VerMasButton>
                                        ))}
                                    </Stack>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }} sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-end',
                                }}>
                                    <Box sx={{
                                        position: 'relative',
                                        width: { xs: '100%', md: '80%' },
                                        height: { xs: '280px', md: '380px' },
                                        overflow: 'hidden',
                                        borderRadius: 1,
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
                                            style={{ objectFit: 'cover', userSelect: 'none' }}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Box className={styles.embla__controls} sx={{
                justifyContent: 'center',
                gridTemplateColumns: 'repeat(3, 1fr)',
            }}>
                <Box
                    alignSelf={'center'}
                    justifySelf={{ xs: 'center', md: 'flex-start' }}
                    sx={{
                        gridRowStart: { xs: 2, md: 1 },
                        gridColumn: { xs: '1/4', md: '1/1' }
                    }}
                >
                    <Button
                        LinkComponent={Link}
                        href="/planeacion"
                        variant="outlined"
                        endIcon={<ChevronRight />}
                        sx={{
                            color: 'primary.100',
                            fontWeight: 600, borderRadius: '50px'
                        }}
                        size="large"
                    >
                        Ver más
                    </Button>
                </Box>
                <Box
                    className={styles.embla__arrow__buttons}
                    sx={{
                        gridColumnStart: 2,
                        justifySelf: 'center'
                    }}>
                    <IconButton
                        className={styles.embla__arrow__button}
                        type='button'
                        disabled={prevBtnDisabled}
                        onClick={onPrevButtonClick}
                        aria-label='Instrumento previo'
                        sx={{
                            color: 'primary.50',
                            ':hover': {
                                bgcolor: 'primary.800'
                            },
                            '&.Mui-disabled': {
                                color: 'primary.500'
                            }
                        }}
                    >
                        <KeyboardArrowLeft sx={{
                            fontSize: 40
                        }} />
                    </IconButton>

                    <IconButton
                        className={styles.embla__arrow__button}
                        type='button'
                        disabled={nextBtnDisabled}
                        sx={{
                            color: 'primary.50',
                            ':hover': {
                                bgcolor: 'primary.800'
                            },
                            '&.Mui-disabled': {
                                color: 'primary.500'
                            }
                        }}
                        onClick={onNextButtonClick}
                        aria-label='Siguiente instrumento'
                    >
                        <KeyboardArrowRight sx={{
                            fontSize: 40
                        }} />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        gridColumnStart: 3,
                        alignSelf: 'center',
                        justifySelf: 'end'
                    }}
                >
                    {
                        scrollSnaps.length > 0 && (

                            <Typography
                                sx={{ userSelect: 'none' }}
                                fontSize={18}
                                fontWeight={500}
                                color='primary.100'>{selectedIndex + 1} / {scrollSnaps.length}</Typography>
                        )
                    }
                </Box>
            </Box>
        </Box >
    )
}

export default Carousel