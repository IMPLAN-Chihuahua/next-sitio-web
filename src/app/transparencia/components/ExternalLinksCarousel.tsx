'use client';
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Box, Card, CardContent, Typography, IconButton, Icon, Button } from '@mui/material';
import { SubtitleH2 } from '../../components/Titles';
import { Launch } from '@mui/icons-material';
import { useDotButton } from '@/app/inicio/EmblaProjects/CarouselDotButton';
import { NextButton, PrevButton, usePrevNextbuttons } from '@/app/inicio/EmblaProjects/CarouselArrowButtons';

interface StrapiImage {
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  formats?: {
    small?: { url: string };
    thumbnail?: { url: string };
  };
}

interface Enlace {
  id: number;
  icon?: string | null;
  text: string;
  descriptionUrl?: string;
  url: string;
  image?: StrapiImage | null;
}

interface Props {
  titulo: string;
  enlaces: Enlace[];
}

export default function ExternalLinksCarousel({ titulo, enlaces }: Props) {
  const autoplay = Autoplay({ delay: 6000, stopOnInteraction: true, stopOnMouseEnter: true });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: 'center'},
    [autoplay]
  );

  const { scrollSnaps, selectedIndex } = useDotButton(emblaApi)
  const { nextBtnDisabled, onNextButtonClick, onPrevButtonClick, prevBtnDisabled } = usePrevNextbuttons(emblaApi);

  if (!enlaces || enlaces.length === 0) return null;

  const getImageUrl = (image: StrapiImage) => {
    const url = image.formats?.small?.url ?? image.url;
    return url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${url}`;
  };

  return (
    <Box >
      <SubtitleH2 title={titulo} />

      <Box sx={{ position: 'relative' }}>



        <Box ref={emblaRef} sx={{ overflow: 'hidden' }}>
          <Box sx={{ display: 'flex' }}>
            {enlaces.map((link) => (
              <Box
                key={link.id}
                sx={{ flex: '0 0 89%', minWidth: 0, px: 1 }}
              >
                <Card
                  component="a"
                  href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                  target="_blank"
                  variant='outlined'
                  rel="noopener noreferrer"
                  sx={{
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    borderRadius: '16px',
                    overflow: 'visible',
                    mb: 1,
                    mt: 1,
                    height: { md: 260 },
                    minHeight: { xs: 200 },
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
                      borderColor: '#fbc02d',
                      transform: 'translateY(-2px)'
                    },
                  }}
                >
                  {/* Imagen */}
                  {link.image && (
                    <Box
                      sx={{
                        width: { xs: '100%', md: 280 },
                        height: { xs: 200, md: 'auto' },
                        alignSelf: 'stretch',              // ocupa toda la altura del card
                        flexShrink: 0,
                        p: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white.50',
                      }}
                    >
                      <img
                        src={getImageUrl(link.image)}
                        alt={link.image.alternativeText ?? link.text}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          display: 'block',
                          borderRadius: '10px',
                        }}
                      />
                    </Box>
                  )}

                  {/* texto */}
                  <CardContent
                    sx={{
                      flex: 1,
                      p: { xs: 3, md: 4 },
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: { xs: 'center', md: link.image ? 'flex-start' : 'center' },
                      textAlign: { xs: 'center', md: link.image ? 'left' : 'center' },
                      overflow: 'hidden',
                    }}
                  >
                    <Typography
                      variant="h5"
                      component={'h3'}
                      color="text.primary"
                      sx={{
                        fontWeight: 700,
                        mb: 1.5,
                        lineHeight: 1.3,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {link.text}
                    </Typography>

                    {link.descriptionUrl && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 3,
                          lineHeight: 1.6,
                          maxWidth: '100%',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {link.descriptionUrl}
                      </Typography>
                    )}
                    <Button endIcon={<Launch />} sx={{ color: 'primary.800', textTransform: 'none' }} >
                      Ir a sitio
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
        <Box
          mt={1.5}
          display={'grid'}
          sx={{
            alignItems: 'center',
            gridTemplateColumns: 'repeat(3, 1fr)'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              gridColumnStart: 2,
              justifyContent: 'center'
            }}
          >
            <PrevButton
              onClick={onPrevButtonClick}
              aria-label={'Siguiente enlace'}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
              aria-label={'Enlace previo'}
            />
          </Box>
          <Box>
            {
              scrollSnaps.length > 0 && (
                <Typography
                  sx={{ userSelect: 'none' }}
                  textAlign={'right'}
                  fontWeight={500}
                  color='textSecondary'
                  fontSize={18}>
                  {selectedIndex + 1} / {scrollSnaps.length}
                </Typography>
              )
            }
          </Box>
        </Box>
      </Box>
    </Box>
  );
}