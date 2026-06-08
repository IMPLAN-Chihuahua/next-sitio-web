'use client'; 

import { Box, Card, CardContent, Typography, Icon } from "@mui/material"; 
import Grid from "@mui/material/Grid";
import { SubtitleH2 } from '../../components/Titles';
import Link from 'next/link';

interface Enlace {
  id: number;
  icon?: string;
  text: string;
  description: string;
  descriptionUrl: string;
  url: string;
}

interface Props {
  titulo: string;
  enlaces: Enlace[];
  esExterno?: boolean;
}

export default function Links({ titulo, enlaces, esExterno = false }: Props) {
  return (
    <Box sx={{ mb: 6 }}>
      <SubtitleH2 title={titulo} />

      <Grid container spacing={3} sx={{ mt: 1 }}>
        {enlaces?.map((link) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={link.id}>
            <Box
              component={esExterno ? 'a' : Link}
              href={link.url}
              {...(esExterno ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              sx={{
                textDecoration: 'none',
                display: 'block',
                '&:hover .capa-frontal': {
                  opacity: 0,
                  transform: 'rotateY(90deg)', // girando a la mitad
                },
                '&:hover .capa-trasera': {
                  opacity: 1,
                  transform: 'rotateY(0deg)', //  desde la mitad
                }
              }}
            >
              <Card
                elevation={0}
                sx={{
                  position: 'relative',
                  height: '220px',
                  width: '100%',
                  borderRadius: '16px',
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  perspective: '1000px',
                }}
              >
                {/* FRONTAL */}
                <Box
                  className="capa-frontal"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '16px',
                    transition: 'opacity 0.25s ease, transform 0.3s ease',
                    opacity: 1,
                    transform: 'rotateY(0deg)',
                    zIndex: 2,
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    
                    {/* icono de Google */}
                    {link.icon && (
                      <Icon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }}>
                        {link.icon}
                      </Icon>
                    )}
                    
                    <Typography variant="h6">{link.text}</Typography>
                  </CardContent>
                </Box>

                {/* TRASERA */}
                <Box
                  className="capa-trasera"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: esExterno ? 'secondary.main' : 'primary.main',
                    color: '#ffffff',
                    borderRadius: '16px',
                    transition: 'opacity 0.25s ease 0.25s, transform 0.3s ease 0.2s', 
                    opacity: 0,
                    transform: 'rotateY(-90deg)', // giro
                    zIndex: 1,
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1.5, color: '#ffffff'}}>
                      {link.descriptionUrl || " "}
                    </Typography>
                  </CardContent>
                </Box>

              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}