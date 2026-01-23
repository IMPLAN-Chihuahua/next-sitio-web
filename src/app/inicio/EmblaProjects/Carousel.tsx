'use client'
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaOptionsType } from 'embla-carousel'
import { CarouselDotButton, useDotButton } from './CarouselDotButton'
import { PrevButton, NextButton, usePrevNextbuttons } from './CarouselArrowButtons'
import styles from './Carousel.module.css'
import { Box, Button, Grid, Typography } from '@mui/material'
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
        <Box className={styles.embla} dir="ltr" sx={{ mb: 5 }}>
            <Box className={styles.embla__viewport} ref={emblaRef}>
                <Box className={styles.embla__container}>
                    {slides.map((project, index) => (
                        <Box className={styles.embla__slide} key={index}>
                            <Grid container className={styles.embla__slide__number}>
                                <Grid size={{
                                    xs: 12,
                                    md: 6
                                }}
                                    sx={{
                                        p: 3
                                    }}
                                >
                                    <Typography variant='h4' fontWeight={'bold'}>
                                        {project.title}
                                    </Typography>
                                    <br></br>
                                    <Box sx={{
                                        maxWidth: 500
                                    }}>
                                        <Typography>
                                            {project.description}
                                        </Typography>
                                    </Box>
                                    <br />
                                    {project.buttons.map((btn, idx) => {
                                        console.log(project)
                                        return (
                                            <Button key={idx} variant='contained' sx={{ textTransform: "none" }}>{btn.text}</Button>
                                        )
                                    })}
                                </Grid>
                                <Grid size={{
                                    xs: 15,
                                    md: 6
                                }}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Box style={{
                                        position: 'relative',
                                        width: '70%',
                                        height: '280px',
                                        boxShadow: '0px 4px 20px rgba(0,0,0,0.1)', // Opcional: Una sombrita para que resalte
                                        borderRadius: 1,
                                        overflow: 'hidden'
                                    }}>
                                        <Image
                                            src={`http://localhost:1337${project.media[0].url}`}
                                            unoptimized={true}
                                            alt=''
                                            fill
                                            loading="eager"
                                            style={{
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Box className={styles.embla__controls}>
                <Box className={styles.embla__arrow__buttons}>
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                </Box>

                <Box className={styles.embla__dots}>
                    {scrollSnaps.map((_, index) => (
                        <CarouselDotButton
                            key={index}
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