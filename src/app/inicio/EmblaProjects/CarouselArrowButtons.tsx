// https://www.embla-carousel.com/examples/predefined/
'use client'
import React, { ComponentPropsWithRef, useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType } from 'embla-carousel'
import styles from './Carousel.module.css'
import { Button, ButtonProps, IconButton } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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
    const { children, ...restProps } = props;

    return (
        <IconButton
            className={`${styles.embla__button} ${styles['embla__button--prev']}`}
            type='button'
            {...restProps}
        >
            <ArrowForwardIosIcon />
            {children}
        </IconButton>
    )
}


export const NextButton: React.FC<PropType> = (props) => {
    const { children, ...restProps } = props

    return (
        <IconButton
            className={`${styles.embla__button} ${styles['embla__button--next']}`}
            type="button"
            {...restProps}
        >
            <ArrowBackIosIcon />
            {children}
        </IconButton>
    )
}