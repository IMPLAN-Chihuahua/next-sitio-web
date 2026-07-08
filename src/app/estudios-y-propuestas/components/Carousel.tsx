'use client'

import { createContext, ReactNode, useState } from "react"
import styles from '@/app/inicio/EmblaProjects/Carousel.module.css'
import useEmblaCarousel from "embla-carousel-react";
import { NextButton, PrevButton, usePrevNextbuttons } from "@/app/inicio/EmblaProjects/CarouselArrowButtons";
import { Box, Link, Typography } from "@mui/material";
import { Overlay } from "@/app/components/LandingPageBanner";
import { CarouselDotButton, useDotButton } from "@/app/inicio/EmblaProjects/CarouselDotButton";
import Image from "next/image";

const CarouselContext = createContext(null);


export default function Carousel(props: { children: ReactNode }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ direction: 'ltr' });
  const { nextBtnDisabled, prevBtnDisabled, onNextButtonClick, onPrevButtonClick } = usePrevNextbuttons(emblaApi);

  return (
    <Box className={styles.embla}>
      <Box className={styles.embla__viewport} ref={emblaRef} borderRadius={1}>
        <div className={styles.embla__container}>
          {props.children}
        </div>
      </Box>
      <Box className={styles.embla__controls} mt={1.5} display={'flex'} justifyContent={'flex-end'}>
        <Box className={styles.embla__dots}>
          <Box className={styles.embla__arrow__buttons} sx={{ display: 'flex', gap: 1 }}>
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}


export function Slide(props: { desc?: string, url: string }) {

  return (
    <Box
      className={styles.embla__slide}
      minHeight={'600px'}
      sx={{
        ':before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${props.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(16px) brightness(0.55)',
          transform: 'scale(1.1)',
          zIndex: 0
        }
      }}
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
          <Box
            position={'absolute'}
            bottom={0}
            left={0}
            right={0}
          >
            <Overlay />
            <Typography
              p={3}
              color='primary.100'
              zIndex={1000}
              fontWeight={500}
              position={'relative'}
              sx={{
                textShadow: '1px 1px 2px black'
              }}
            >
              {props.desc}
            </Typography>
          </Box>
        )
      }
    </Box>
  )
}