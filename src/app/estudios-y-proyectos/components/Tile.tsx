import { Box, Card, CardContent, Chip, Grid, Typography, Link as MuiLink } from "@mui/material";
import { TrabajoPlaneacion } from "../definitions";
import Image from "next/image";
import LandscapeIcon from '@mui/icons-material/Landscape';
import Link from "next/link";
import { Tag } from "@/app/definitions";



export default function TrabajoTile(props: { trabajoPlaneacion: TrabajoPlaneacion }) {
  const hasSmallImage = props.trabajoPlaneacion.cover?.formats?.small !== undefined || props.trabajoPlaneacion.cover?.formats?.small !== null;
  const coverImage = hasSmallImage ? props.trabajoPlaneacion.cover?.formats?.small.url : props.trabajoPlaneacion.cover?.url;
  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container >
          <Grid bgcolor={'primary.200'} height={250} size={{ xs: 12, md: 3 }} position={'relative'} borderRadius={1}>
            {props.trabajoPlaneacion.cover ? (
              <Link href={`/estudios-y-proyectos/${props.trabajoPlaneacion.slug}`}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${coverImage}`}
                  layout="fill"
                  style={{
                    objectFit: 'cover',
                    borderRadius: '5px'
                  }}
                  unoptimized
                  alt=''
                />
              </Link>
            ) : (
              <Link href={`/estudios-y-proyectos/${props.trabajoPlaneacion.slug}`}>
                <Box
                  display={'flex'}
                  justifyContent={'center'}
                  height={'100%'}
                  alignItems={'center'}>
                  <LandscapeIcon
                    sx={{
                      fontSize: 80,
                      color: 'primary.600'
                    }}
                  />
                </Box>
              </Link>
            )}
          </Grid>

          <Grid size={{ xs: 12, md: 9 }} px={{ md: 2 }} pt={{ xs: 2, md: 0 }} display={'flex'} flexDirection='column'>
            <MuiLink
              component={Link}
              fontSize={22}
              color='primary.800'
              underline="none"
              display={'inline-block'}
              href={`/estudios-y-proyectos/${props.trabajoPlaneacion.slug}`}
              fontWeight={600}>{props.trabajoPlaneacion.nombre}</MuiLink>
            <Typography fontSize={18} mt={.5} fontWeight={500} color="primary.700">{props.trabajoPlaneacion.categoria} • {props.trabajoPlaneacion.ficha.anio}</Typography>
            <Typography mt={.5}>{
              props.trabajoPlaneacion.ficha.inversion
                ? `Inversión: ${getFormattedInversion(props.trabajoPlaneacion.ficha.inversion)}`
                : props.trabajoPlaneacion.ficha.esDesarrolloInterno
                  ? 'Desarrollo interno'
                  : 'Inversión: Ninguno'
            }</Typography>
            <Typography variant="body2" color='textSecondary'>
              {props.trabajoPlaneacion.ficha.helperTextInversion ? ` (${props.trabajoPlaneacion.ficha.helperTextInversion})` : ''}
            </Typography>
            <Typography>
              {
                props.trabajoPlaneacion.ficha.colaboradoresExternos.length > 0
                  ? `Colaboradores externos: ${props.trabajoPlaneacion.ficha.colaboradoresExternos
                    .map(c => `${c.nombre}${c.acronimo ? ` (${c.acronimo})` : ''}`)
                    .join(', ')}`
                  : ''
              }
            </Typography>
            <Box flexWrap={'wrap'} justifySelf={'flex-end'} display={'flex'} columnGap={2} mt={{ xs: 1, md: 'auto' }}>
              {
                props.trabajoPlaneacion.ficha.clasificaciones.map((clasificacion) => (
                  <ClasificacionSpan clasificacion={clasificacion} key={clasificacion.documentId} />
                ))
              }
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export const getFormattedInversion = (inversion: number) => {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(inversion);
}

export const ClasificacionSpan = ({ clasificacion }: { clasificacion: { hexColor: string, name: string } }) => {
  return (
    <Box component={'span'} display={'flex'} alignItems={'center'}>
      <Box
        display={'inline-flex'}
        sx={{ bgcolor: clasificacion.hexColor }}
        component={'span'}
        width={8}
        height={8}
        borderRadius={50}
        mr={.7} />
      <Typography variant="body2">{clasificacion.name}</Typography>
    </Box>
  )
}