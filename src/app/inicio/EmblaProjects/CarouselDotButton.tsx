// https://www.embla-carousel.com/examples/predefined/
'use client'
import React, { ComponentPropsWithRef, useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType } from 'embla-carousel'
import styles from './Carousel.module.css'
import { Button, ButtonProps } from '@mui/material'

type UseDotButtonType = {
    selectedIndex: number
    scrollSnaps: number[]
    onDotButtonClick: (index: number) => void
}

export const useDotButton = (
    emblaApi: EmblaCarouselType | undefined
): UseDotButtonType => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onDotButtonClick = useCallback(
        (index: number) => {
            if (!emblaApi) return
            emblaApi.scrollTo(index)
        },
        [emblaApi]
    );

    const onInit = useCallback((emblaApi: EmblaCarouselType) => {
        setScrollSnaps(emblaApi.scrollSnapList())
    }, []);

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        onInit(emblaApi)
        onSelect(emblaApi)
        emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
    }, [emblaApi, onInit, onSelect]);

    return {
        selectedIndex, scrollSnaps, onDotButtonClick
    }
};

type PropType = ButtonProps
export const CarouselDotButton = (props: PropType) => {
    const { children, ...restProps } = props
    return (
        <Button type='button' {...restProps}>
            {children}
        </Button>
    )
}
