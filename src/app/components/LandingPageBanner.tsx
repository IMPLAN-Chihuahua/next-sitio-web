'use client'

import Autoplay from "embla-carousel-autoplay";
import { Box, Container, Grow, IconButton, Paper, Slide, Typography } from "@mui/material";
import useEmblaCarousel, { UseEmblaCarouselType, } from "embla-carousel-react";
import { EmblaCarouselType } from 'embla-carousel'
import Image from "next/image";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import styles from './LandingPageBanner.module.css'
import Fade from "embla-carousel-fade";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';


export default function LandingPageBanner({ phrases }: { phrases: Array<{ content: string, emphasis: string, image: string }> }) {
  if (!phrases.length) return null;
  const [emblaRef, emblaApi] = useEmblaCarousel({ watchDrag: false, loop: true },
    [Autoplay({ playOnInit: true, delay: 4_000 }), Fade()]);

  const [autoplayIsPlaying, setAutoplayIsPlaying] = useState(false)

  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    if (autoplay.isPlaying()) {
      autoplay.stop();
    } else {
      autoplay.play();
    }
  }, [emblaApi]);

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    setAutoplayIsPlaying(autoplay.isPlaying());
    emblaApi
      .on('autoplay:play', () => setAutoplayIsPlaying(true))
      .on('autoplay:stop', () => setAutoplayIsPlaying(false))
      .on('reInit', () => setAutoplayIsPlaying(autoplay.isPlaying()))
  }, [emblaApi]);

  return (
    <Box position={'relative'}>

      <Box
        minHeight={'80vh'}
        className={styles.embla}
        bgcolor={'primary.900'}
        position={'relative'}
      >
        <Box className={styles.embla__viewport} ref={emblaRef}>
          <Box className={styles.embla__container} height={'85vh'} position={'relative'}>
            {phrases.map((phrase, idx) => (
              <ContentSlide key={idx} {...phrase} />
            ))}
          </Box>
        </Box>
        <IconButton
          onClick={toggleAutoplay}
          disabled={phrases.length === 0}
          disableTouchRipple
          sx={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            zIndex: 120,
            border: '2px solid',
            borderColor: 'primary.50'
          }}>
          {
            autoplayIsPlaying ? (
              <PauseIcon sx={{ color: 'primary.50', fontSize: 40 }} />
            ) : (
              <PlayArrowIcon sx={{ color: 'primary.50', fontSize: 40 }} />
            )
          }
        </IconButton>
      </Box>

      <Paper
        elevation={0}
        sx={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translate(-50%, 50%)',
          px: 5,
          py: 2,
          borderRadius: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.18)',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'box-shadow 0.2s ease',
          '&:hover': {
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)',
          },
        }}
      >
        <Box
          component="img"
          src="https://implanchihuahua.org/img/LOGO_COLOR.png"
          alt="IMPLAN Chihuahua"
          sx={{
            height: 60,
            width: 'auto',
            display: 'block',
          }}
        />
      </Paper>

    </Box>
  )
}


const ContentSlide = ({ content, emphasis, image }: { content: string, emphasis: string, image: string }) => {
  return (
    <Box className={styles.embla__slide} sx={{ userSelect: 'none', position: 'relative' }}>
      <Image
        loader={() => image}
        src={image}
        alt=''
        fill
        unoptimized
        loading="eager"
        style={{
          objectFit: 'cover'
        }}
      />
      <Overlay />
      <Container
        maxWidth='xl'
        component={Box}
        zIndex={130}
        position={'relative'}
        color={'primary.50'}
        sx={{ xs: 45, md: 65 }}
      >
        <Typography
          mt={{ xs: 20, md: 30 }}
          fontSize={{ xs: 45, md: 65 }}
          fontWeight={500}
          sx={{
            textShadow: '1px 1px 2px black'
          }}
          color='inherit'>{content}</Typography>
        <Typography
          fontWeight={900}
          fontSize={{ xs: 45, md: 65 }}
          sx={{
            textShadow: '1px 1px 2px black'
          }}
          color='inherit'>{emphasis}</Typography>
      </Container>
    </Box>
  );
}



export const Overlay = () => {
  return (
    <Box
      position='absolute'
      top={0}
      left={0}
      right={0}
      bottom={0}
      height={'100%'}
      sx={{
        background: 'linear-gradient(65deg,rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.50) 50%, rgba(96, 96, 98, 0.19) 100%)'
      }}
      zIndex={110}
    />
  )
}