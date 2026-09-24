import { ReactNode } from 'react';
import { Box, Chip, Link, Typography } from '@mui/material';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import styles from './Planeacion.module.css';

interface Props {
    title: string;
    description: string;
    category: string;
    href?: string | null;
    actionLabel?: string;
    icon?: ReactNode;
    inactive?: boolean;
    external?: boolean;
    statusLabel?: string;
}

export default function PlaneacionCard({ title, description, category, href, actionLabel, icon, inactive = false, external = false, statusLabel }: Props) {
    const cardClassName = [styles.card, inactive ? styles.cardInactive : ''].filter(Boolean).join(' ');
    const iconClassName = [styles.iconBox, inactive ? styles.iconBoxInactive : ''].filter(Boolean).join(' ');
    const textClassName = [styles.cardText, inactive ? styles.muted : ''].filter(Boolean).join(' ');
    const titleClassName = [styles.cardTitle, inactive ? styles.muted : ''].filter(Boolean).join(' ');

    return (
        <Box className={cardClassName}>
            <Chip className={styles.categoryChip} label={category} size="small" />

            {icon && <Box className={iconClassName}>{icon}</Box>}

            <Typography component="h3" className={titleClassName}>{title}</Typography>

            <Typography className={textClassName}>{description}</Typography>

            <Box className={styles.cardFooter}>
            {statusLabel ? (
                <Chip className={styles.statusChip} label={statusLabel} size="small" variant="outlined" />
            ) : href ? (
                <Link className={styles.cardLink} href={href} target="_blank" rel="noopener noreferrer" underline="none">
                    {actionLabel}
                    {external ? <OpenInNewIcon /> : <ArrowForwardIosRoundedIcon />}
                </Link>
            ) : null}
            </Box>
        </Box>
    );
}
