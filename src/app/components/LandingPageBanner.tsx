'use client'

import Autoplay from "embla-carousel-autoplay";
import { Box, Container, IconButton, Paper, Typography } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import styles from './LandingPageBanner.module.css'
import Fade from "embla-carousel-fade";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const CAROUSEL_DELAY = 4_000;

export default function LandingPageBanner({ phrases }: { phrases: Array<{ content: string, emphasis: string, image: string }> }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ watchDrag: false, loop: true },
    [Autoplay({ playOnInit: true, delay: CAROUSEL_DELAY }), Fade()]);

  const [autoplayIsPlaying, setAutoplayIsPlaying] = useState(false);
  const [autoplayProgress, setAutoplayProgress] = useState(0);

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

    const onPlay = () => setAutoplayIsPlaying(true);
    const onStop = () => setAutoplayIsPlaying(false);
    const onReInit = () => setAutoplayIsPlaying(autoplay.isPlaying());

    setAutoplayIsPlaying(autoplay.isPlaying());
    emblaApi
      .on('autoplay:play', onPlay)
      .on('autoplay:stop', onStop)
      .on('reInit', onReInit);


    return () => {
      emblaApi
        .off('autoplay:play', onPlay)
        .off('autoplay:stop', onStop)
        .off('reInit', onReInit);
    }

  }, [emblaApi]);


  useEffect(() => {
    if (!emblaApi) return;

    let animationFrame: number;

    const updateProgress = () => {
      const autoplay = emblaApi.plugins().autoplay;
      if (!autoplay) return;

      const remaining = autoplay.timeUntilNext();

      if (remaining === null) {
        setAutoplayProgress(0);
        return;
      }

      setAutoplayProgress(1 - remaining / CAROUSEL_DELAY);
      animationFrame = requestAnimationFrame(updateProgress)
    }

    const onTimerSet = () => {
      cancelAnimationFrame(animationFrame);

      setAutoplayProgress(0);
      updateProgress();
    }

    const onTimerStopped = () => {
      cancelAnimationFrame(animationFrame);
    }

    emblaApi.on('autoplay:timerset', onTimerSet);
    emblaApi.on('autoplay:timerstopped', onTimerStopped);

    return () => {
      cancelAnimationFrame(animationFrame);

      emblaApi.off('autoplay:timerset', onTimerSet);
      emblaApi.off('autoplay:timerstopped', onTimerStopped);
    }
  }, [emblaApi])

  if (!phrases.length) return null;

  return (
    <Box position={'relative'} aria-roledescription="carrusel" aria-label="Frases destacadas del IMPLAN" component={'section'}>

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
        <Box
          position='absolute'
          bottom={20}
          right={20}
          zIndex={120}
          width={70}
          height={70}
        >
          <IconButton
            onClick={toggleAutoplay}
            disabled={phrases.length === 0}
            aria-label={autoplayIsPlaying ? "Pausar carrusel" : "Reproducir carrusel"}
            disableTouchRipple
            sx={{
              width: '100%',
              height: '100%',
              '&:focus-visible': {
                outline: '2px solid #e3a74d',
                outlineOffset: '2px',
              }
            }}>
            {
              autoplayIsPlaying ? (
                <PauseIcon sx={{ color: 'primary.50', fontSize: 40 }} />
              ) : (
                <PlayArrowIcon sx={{ color: 'primary.50', fontSize: 40 }} />
              )
            }
          </IconButton>
          <Box
            component="svg"
            viewBox="0 0 65 65"
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              transform: 'rotate(-90deg)',
              pointerEvents: 'none',
            }}
          >
            <circle
              cx="32"
              cy="32"
              r="30"
              fill="none"
              stroke="#fafafc"
              strokeWidth="4"
              strokeDasharray={2 * Math.PI * 30}
              strokeDashoffset={
                2 * Math.PI * 30 * (1 - autoplayProgress)
              }
              strokeLinecap="round"
            />
          </Box>
        </Box>
      </Box>

      <Paper
        elevation={0}
        sx={{
          zIndex: 120,
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translate(-50%, 50%)',
          px: { xs: 3, md: 4 },
          py: { xs: 1.25, md: 1 },
          borderRadius: 1,
          backgroundColor: 'primary.50',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.18)',
          textAlign: 'center',
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          src='/implan_logo.webp'
          draggable={false}
          alt="IMPLAN Chihuahua"
          height={100}
          width={340}
          style={{
            userSelect: 'none',
            objectFit: 'contain'
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
      >
        <Typography
          component="h1"
          color='inherit'
          sx={{
            mt: { xs: 20, md: 30 },
            textShadow: '1px 1px 2px black'
          }}
        >
          <Box
            component="span"
            sx={{ display: 'block', fontSize: { xs: 45, md: 65 }, fontWeight: 500 }}
          >
            {content}
          </Box>
          <Box
            component="span"
            sx={{ display: 'block', fontSize: { xs: 45, md: 65 }, fontWeight: 900 }}
          >
            {emphasis}
          </Box>
        </Typography>
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
