// https://www.embla-carousel.com/examples/predefined/
'use client'
import React, { ComponentPropsWithRef, useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType } from 'embla-carousel'
import styles from './Carousel.module.css'
import { Button, ButtonProps, IconButton } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

type UsePrevNextButtonsType = {
    prevBtnDisabled: boolean
    nextBtnDisabled: boolean
    onPrevButtonClick: () => void
    onNextButtonClick: () => void
}

export const usePrevNextbuttons = (emblaApi: EmblaCarouselType | undefined): UsePrevNextButtonsType => {
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

    const onPrevButtonClick = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollPrev()
    }, [emblaApi])

    const onNextButtonClick = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollNext()
    }, [emblaApi])

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setPrevBtnDisabled(!emblaApi.canScrollPrev())
        setNextBtnDisabled(!emblaApi.canScrollNext())
    }, [])

    useEffect(() => {
        if (!emblaApi) return

        onSelect(emblaApi)
        emblaApi.on('reInit', onSelect).on('select', onSelect)
    }, [emblaApi, onSelect])

    return {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    }
};


type PropType = ButtonProps
export const PrevButton = (props: PropType) => {
    const { ...restProps } = props;

    return (
        <IconButton
            className={styles.embla__arrow__button}
            type='button'
            {...restProps}
            sx={{
                backgroundColor: '#F5F5F5',
                '&:hover': {
                    backgroundColor: 'secondary.main' // Color un poco más oscuro, por ejemplo
                },
            }}
        >
            <KeyboardArrowRightOutlinedIcon sx={{
                fontSize: 40
            }} />
        </IconButton>
    )
}


export const NextButton: React.FC<PropType> = (props) => {
    const { ...restProps } = props

    return (
        <IconButton
            className={styles.embla__arrow__button}
            type="button"
            {...restProps}
            sx={{
                backgroundColor: '#F5F5F5',
                '&:hover': {
                    backgroundColor: 'secondary.main' // Color un poco más oscuro, por ejemplo
                },
            }}
        >
            <KeyboardArrowLeftOutlinedIcon sx={{
                fontSize: 40
            }} />
        </IconButton>
    )
}