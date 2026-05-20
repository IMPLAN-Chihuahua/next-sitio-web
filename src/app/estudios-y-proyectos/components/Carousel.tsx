'use client'

import { createContext, ReactNode, useState } from "react"
import styles from '@/app/inicio/EmblaProjects/Carousel.module.css'
import useEmblaCarousel from "embla-carousel-react";
import { usePrevNextbuttons } from "@/app/inicio/EmblaProjects/CarouselArrowButtons";
import { Box, Link, Typography } from "@mui/material";
import { Overlay } from "@/app/components/LandingPageBanner";
import { CarouselDotButton, useDotButton } from "@/app/inicio/EmblaProjects/CarouselDotButton";
import Image from "next/image";

const CarouselContext = createContext(null);


export default function Carousel(props: { children: ReactNode }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ direction: 'ltr' });
  const {
    scrollSnaps,
    onDotButtonClick,
    selectedIndex
  } = useDotButton(emblaApi);

  return (
    <Box className={styles.embla} my={3}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {props.children}
        </div>
      </div>
      <Box className={styles.embla__controls} mt={1.5} display={'flex'} justifyContent={'center'}>
        <Box className={styles.embla__dots}>
          {
            scrollSnaps.map((_, idx) => (
              <CarouselDotButton
                key={idx}
                onClick={() => onDotButtonClick(idx)}
                className={`${styles.embla__dot} ${idx === selectedIndex ? styles['embla__dot--selected'] : ''}`}
                sx={{
                  ':after': {
                    width: '1rem',
                    height: '1rem',
                    borderRadius: '50%',
                    content: '""'
                  }
                }}
              />
            ))
          }
        </Box>
      </Box>
    </Box>
  )
}


export function Slide(props: { desc?: string, url: string }) {
  return (
    <Box
      className={styles.embla__slide}
      minHeight={'35rem'}
      position={'relative'}>
      <Image
        alt={props.desc ? props.desc : ''}
        src={props.url}
        fill
        unoptimized
        style={{
          objectFit: 'contain',
        }}
      />
      {
        props.desc && (
          <Typography
            bgcolor={'primary.900'}
            p={1.5}
            position={'absolute'}
            bottom={20}
            left={30}
            right={30}
            borderRadius={1}
            mx='auto'
            width='fit-content'
            color="whitesmoke"
            zIndex={1000}
            fontWeight={500}
          >
            {props.desc}
          </Typography>
        )
      }
    </Box>
  )
}