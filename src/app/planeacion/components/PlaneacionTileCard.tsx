import { ReactNode } from 'react';

import { SxProps, Theme } from '@mui/material';

import { Media } from '@/app/definitions';

import CardTiles, { CardTilesAction } from './CardTiles';

type Props = {
    title: string;
    category: string;
    description: string;
    cover?: Media | null;
    inactive?: boolean;
    action?: CardTilesAction;
    fallbackIcon?: ReactNode;
    descriptionLineClamp?: number;
    contentMinHeight?: { withCover: number; withoutCover: number; };
};

const actionSx: SxProps<Theme> = { color: 'primary.main', fontSize: '0.8rem', fontWeight: 600, '&:hover': { color: 'secondary.main' } };

const toSxArray = (sx?: SxProps<Theme>) => (Array.isArray(sx) ? sx : sx ? [sx] : []);

export default function PlaneacionTileCard({ title, category, description, cover, inactive = false, action, fallbackIcon, descriptionLineClamp = 3, contentMinHeight = { withCover: 185, withoutCover: 215 } }: Props) {
    const coverUrl = cover?.url ? `${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${cover.url}` : null;

    return (
        <CardTiles
            tipo="rectangular-horizontal"
            title={title}
            category={category}
            image={coverUrl ? { url: coverUrl, title: cover?.caption || title, alt: cover?.alternativeText || title } : undefined}
            description={description}
            descriptionLineClamp={descriptionLineClamp}
            inactive={inactive}
            icon={!coverUrl ? fallbackIcon : undefined}
            contentSx={{ minHeight: coverUrl ? contentMinHeight.withCover : contentMinHeight.withoutCover }}
            action={action ? { ...action, external: action.external ?? true, sx: [actionSx, ...toSxArray(action.sx)] } : undefined}
        />
    );
}
