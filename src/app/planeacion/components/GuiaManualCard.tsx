import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

import { GuiaManual } from '../definitions';
import CardTiles from './CardTiles';
interface Props { guia: GuiaManual; }

const categorias: Record<string, string> = {
    'diseno-urbano': 'DISEÑO URBANO',
    'equipamiento': 'EQUIPAMIENTO',
    'paisaje': 'PAISAJE',
    'bioclimatico': 'BIOCLIMÁTICO',
};


export default function GuiaManualCard({ guia }: Props) {
    const isActive = !guia.enDesarrollo;
    const href = guia.documento
        ? `${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${guia.documento.url}`
        : guia.urlExterna;

    const coverUrl = guia.cover?.url
        ? `${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${guia.cover.url}`
        : null;

    const categoria = categorias[guia.categoria] ?? guia.categoria.toUpperCase();


    return (
        <CardTiles
            tipo="rectangular-horizontal"
            title={guia.titulo}
            category={categoria}
            image={coverUrl ? { url: coverUrl, title: guia.cover?.caption || guia.titulo, alt: guia.cover?.alternativeText || guia.titulo } : undefined}
            description={guia.descripcion}
            descriptionLineClamp={3}
            inactive={!isActive}
            contentSx={{ minHeight: coverUrl ? 185 : 215 }}
            action={href ? {
                href,
                label: guia.documento ? 'Descargar guía' : 'Abrir guía',
                external: true,
                sx: { color: 'primary.main', fontSize: '0.8rem', fontWeight: 600, '&:hover': { color: 'secondary.main' } },
            } : undefined}
        />
    );
}
