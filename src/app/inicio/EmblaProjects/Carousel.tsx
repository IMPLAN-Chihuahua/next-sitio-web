'use client'
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaOptionsType } from 'embla-carousel'
import { CarouselDotButton, useDotButton } from './CarouselDotButton'
import { PrevButton, NextButton, usePrevNextbuttons } from './CarouselArrowButtons'
import styles from './Carousel.module.css'
import { Box } from '@mui/material'

type PropType = {
    slides: number[],
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
                    {slides.map((index) => (
                        <Box className={styles.embla__slide} key={index}>
                            <Box className={styles.embla__slide__number}>{index + 1}</Box>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Box className={styles.embla__controls}>
                <Box className={styles.embla__buttons}>
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                </Box>

                <Box className={styles.embla__dots}>
                    {scrollSnaps.map((_, index) => (
                        <CarouselDotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={`
                                ${styles.embla__dot} 
                                ${index === selectedIndex ? styles['embla__dot--selected'] : ''}
                            `}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default Carousel