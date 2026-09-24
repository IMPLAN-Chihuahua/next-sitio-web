import { ReactNode } from 'react';

import NextLink from 'next/link';

import { Box, Card, CardActionArea, CardContent, CardMedia, Chip, Link as MuiLink, SxProps, Theme, Tooltip, Typography, } from '@mui/material';

import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import LandscapeIcon from '@mui/icons-material/Landscape';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { getTileCardSx } from './tileCardStyles';
import Link from 'next/link';

export type CardTilesTipo = 'rectangular-vertical' | 'rectangular-horizontal' | 'cuadrado';

export type CardTilesAction = {
  href?: string | null;
  label: string;
  external?: boolean;
  icon?: ReactNode;
  sx?: SxProps<Theme>;
};

export type CardTilesImage = {
  url?: string | null;
  title?: string;
  alt?: string;
};

export type CardTilesProps = {
  title: string;
  description?: ReactNode;
  category?: ReactNode;
  categoryVariant?: 'text' | 'chip';
  href?: string | null;
  image?: CardTilesImage;
  imageBadge?: ReactNode;
  imageFit?: 'cover' | 'contain';
  imageMuted?: boolean;
  imageFallbackIcon?: ReactNode;
  icon?: ReactNode;
  action?: CardTilesAction;
  tipo?: CardTilesTipo;
  inactive?: boolean;
  destacado?: boolean;
  destacadoLabel?: string;
  historico?: boolean;
  historicoLabel?: string;
  historicoTooltip?: string;
  statusLabel?: string;
  topAccent?: boolean;
  titleLineClamp?: number;
  descriptionLineClamp?: number;
  maxWidth?: number | string;
  minHeight?: number | string;
  cardSx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
};

const mediaRatioByTipo: Record<CardTilesTipo, string> = {
  'rectangular-vertical': '3 / 4',
  'rectangular-horizontal': '16 / 9',
  cuadrado: '1 / 1',
};

const contentMinHeightByTipo: Record<CardTilesTipo, number> = {
  'rectangular-vertical': 210,
  'rectangular-horizontal': 215,
  cuadrado: 280,
};

const maxWidthByTipo: Record<CardTilesTipo, number | string> = {
  'rectangular-vertical': 450,
  'rectangular-horizontal': '100%',
  cuadrado: '100%',
};

const toSxArray = (sx?: SxProps<Theme>) => (Array.isArray(sx) ? sx : sx ? [sx] : []);

export default function CardTiles(props: CardTilesProps) {
  const {
    title, description, category,
    categoryVariant = 'text',
    href, image, imageBadge, imageFit = 'cover',
    imageMuted, imageFallbackIcon,
    icon, action, tipo = 'rectangular-vertical',
    inactive = false, destacado = false,
    destacadoLabel = 'Destacado', historico = false,
    historicoLabel = 'Historico', historicoTooltip,
    statusLabel, topAccent = false,
    titleLineClamp = 2, descriptionLineClamp = 3,
    maxWidth, minHeight,
    cardSx, contentSx
  } = props;

  const hasImage = Boolean(image?.url);
  const actionExternal = action?.external ?? true;

  const titleNode = href && !inactive ? (
    <MuiLink
      component={NextLink}
      href={href}
      color="primary.800"
      title={title}
      sx={{
        display: '-webkit-box',
        overflow: 'hidden',
        textDecoration: 'none',
        wordBreak: 'break-word',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: titleLineClamp,
      }}
    >
      {title}
    </MuiLink>
  ) : (
    title
  );

  return (
    <Card
      variant="outlined"
      sx={[
        getTileCardSx(inactive),
        {
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minHeight: minHeight ?? (hasImage ? undefined : contentMinHeightByTipo[tipo]),
          maxWidth: maxWidth ?? maxWidthByTipo[tipo],
          aspectRatio: !image && tipo === 'cuadrado' ? { sm: '1 / 1' } : undefined,
          width: '100%',
          ...(topAccent && !inactive && {
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -1,
              left: -1,
              right: -1,
              zIndex: 1,
              height: 5,
              bgcolor: 'secondary.main',
            },
          }),
        },
        ...toSxArray(cardSx),
      ]}
    >
      {statusLabel && (
        <Chip
          label={statusLabel}
          size="small"
          variant="outlined"
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            zIndex: 2,
            height: 24,
            borderColor: 'secondary.main',
            color: 'secondary.main',
            fontSize: '0.65rem',
            fontWeight: 700,
          }}
        />
      )}

      {destacado && (
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 999,
            p: '6px',
            bgcolor: '#fff',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: '#fbc02d',
            },
            '&:hover .CardTiles-featuredText': {
              maxWidth: 80,
              opacity: 1,
              pl: 0.5,
              pr: 1,
            },
            '&:hover .CardTiles-featuredIcon': {
              color: '#fbc02d',
            },
          }}
        >
          <StarBorderOutlinedIcon
            className="CardTiles-featuredIcon"
            sx={{ color: '#999', transition: 'color 0.3s' }}
          />
          <Typography
            className="CardTiles-featuredText"
            variant="caption"
            sx={{
              maxWidth: 0,
              overflow: 'hidden',
              color: '#555',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              opacity: 0,
              transition: 'all 0.3s ease-in-out',
            }}
          >
            {destacadoLabel}
          </Typography>
        </Box>
      )}

      {(hasImage || image) && (
        <CardMediaBlock
          href={href}
          image={image}
          imageBadge={imageBadge}
          imageFit={imageFit}
          title={title}
          tipo={tipo}
          muted={imageMuted ?? inactive}
          historico={historico}
          historicoLabel={historicoLabel}
          historicoTooltip={historicoTooltip}
          fallbackIcon={imageFallbackIcon}
        />
      )}

      <CardContent
        sx={[
          {
            flex: 1,
            p: 3,
          },
          ...toSxArray(contentSx),
        ]}
      >
        <Box display="flex" flexDirection="column" height="100%">
          {category && (
            <CategoryLabel
              inactive={inactive}
              variant={categoryVariant}
            >
              {category}
            </CategoryLabel>
          )}

          {icon && (
            <Box
              sx={{
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 1.5,
                bgcolor: inactive ? '#eeeeee' : '#eef4ef',
                color: inactive ? 'text.disabled' : 'primary.main',
                mb: 2,
                '& svg': {
                  fontSize: 21,
                },
              }}
            >
              {icon}
            </Box>
          )}

          <Typography
            component="h3"
            sx={{
              color: inactive ? 'text.disabled' : 'text.primary',
              fontSize: href ? 18 : '1.1rem',
              fontWeight: 700,
              lineHeight: 1.35,
              mb: 1,
            }}
          >
            {titleNode}
          </Typography>

          {description && (
            <Typography
              sx={{
                display: '-webkit-box',
                overflow: 'hidden',
                color: inactive ? 'text.disabled' : 'text.secondary',
                lineHeight: 1.6,
                wordBreak: 'break-word',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: descriptionLineClamp,
                mb: action?.href ? 3 : 0,
              }}
              variant="body2"
            >
              {description}
            </Typography>
          )}

          {action?.href && !inactive && (
            <Box sx={{ mt: 'auto' }}>
              <MuiLink
                href={action.href}
                target={actionExternal ? '_blank' : undefined}
                rel={actionExternal ? 'noopener noreferrer' : undefined}
                {...(!actionExternal && {
                  component: Link
                })}
                underline="none"
                sx={[
                  {
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.7,
                    color: 'text.secondary',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    '&:hover': {
                      color: 'secondary.main',
                      textDecoration: 'underline',
                    },
                    '& svg': {
                      fontSize: 15,
                    },
                  },
                  ...toSxArray(action.sx),
                ]}
              >
                {action.label}
                {action.icon ?? (actionExternal ? <OpenInNewIcon /> : <ArrowForwardIosRoundedIcon />)}
              </MuiLink>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

function CardMediaBlock({ href, image, imageBadge, imageFit, title, tipo, muted, historico, historicoLabel, historicoTooltip, fallbackIcon }: { href?: string | null; image?: CardTilesImage; imageBadge?: ReactNode; imageFit: 'cover' | 'contain'; title: string; tipo: CardTilesTipo; muted: boolean; historico: boolean; historicoLabel: string; historicoTooltip?: string; fallbackIcon?: ReactNode; }) {
  const media = (
    <Box position="relative">
      {image?.url ? (
        <CardMedia
          component="img"
          image={image.url}
          title={image.title ?? title}
          alt={image.alt ?? title}
          sx={{
            display: 'block',
            width: '100%',
            aspectRatio: mediaRatioByTipo[tipo],
            objectFit: imageFit,
            filter: muted ? 'grayscale(60%) opacity(0.7)' : 'none',
          }}
        />
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            aspectRatio: mediaRatioByTipo[tipo],
            bgcolor: 'primary.300',
          }}
        >
          {fallbackIcon ?? (
            <LandscapeIcon
              sx={{
                color: 'primary.600',
                fontSize: 80,
              }}
            />
          )}
        </Box>
      )}

      {imageBadge && (
        <Typography
          component="span"
          variant="body2"
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            maxWidth: 'calc(100% - 20px)',
            p: 1,
            bgcolor: 'primary.50',
            color: 'text.primary',
            fontWeight: 500,
            overflowWrap: 'anywhere',
            pointerEvents: 'none',
          }}
        >
          {imageBadge}
        </Typography>
      )}

      {historico && (
        <Tooltip
          title={historicoTooltip}
          placement="top"
          arrow
          disableHoverListener={!historicoTooltip}
        >
          <Box
            sx={{
              position: 'absolute',
              right: 8,
              bottom: 8,
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 999,
              px: 1.25,
              py: 0.5,
              bgcolor: '#fff',
              filter: 'grayscale(0)',
            }}
          >
            <ArchiveOutlinedIcon sx={{ color: '#999', fontSize: 16 }} />
            <Typography variant="caption" sx={{ color: '#777', fontWeight: 500 }}>
              {historicoLabel}
            </Typography>
          </Box>
        </Tooltip>
      )}
    </Box>
  );

  if (!href) {
    return media;
  }

  return (
    <CardActionArea
      component={NextLink}
      href={href}
      aria-label={`Ver ${title}`}
      disableRipple
      disableTouchRipple
      sx={{ display: 'block' }}
    >
      {media}
    </CardActionArea>
  );
}

function CategoryLabel({ children, inactive, variant }: { children: ReactNode; inactive: boolean; variant: 'text' | 'chip'; }) {
  if (variant === 'chip') {
    return (
      <Chip
        label={children}
        size="small"
        sx={{
          alignSelf: 'flex-start',
          height: 24,
          bgcolor: '#f3f3f5',
          color: inactive ? 'text.disabled' : 'text.secondary',
          fontSize: '0.65rem',
          fontWeight: 700,
          mb: 2,
          '& .MuiChip-label': {
            px: 1.2,
          },
        }}
      />
    );
  }

  return (
    <Typography
      sx={{
        color: inactive ? 'text.disabled' : 'text.secondary',
        fontSize: '0.75rem',
        fontWeight: 700,
        letterSpacing: '0.08em',
        mb: 2,
      }}
    >
      {children}
    </Typography>
  );
}
