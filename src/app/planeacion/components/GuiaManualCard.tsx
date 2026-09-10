import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

import { GuiaManual } from '../definitions';
import CardTiles from './CardTiles';
interface Props {
    guia: GuiaManual;
}

const categorias: Record<string, string> = {
    'diseno-urbano': 'DISEÑO URBANO',
    'equipamiento': 'EQUIPAMIENTO',
    'paisaje': 'PAISAJE',
    'bioclimatico': 'BIOCLIMÁTICO',
};


export default function GuiaManualCard({
    guia,
}: Props) {
    const isActive = !guia.enDesarrollo;
    const href = guia.documento
        ? `${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${guia.documento.url}`
        : guia.urlExterna;

    const categoria =
        categorias[guia.categoria] ??
        guia.categoria.toUpperCase();


    return (
        <CardTiles
            tipo="cuadrado"
            title={guia.titulo}
            category={categoria}
            categoryVariant="chip"
            description={guia.descripcion}
            descriptionLineClamp={5}
            inactive={!isActive}
            statusLabel={guia.enDesarrollo ? 'EN DESARROLLO' : undefined}
            icon={<MenuBookOutlinedIcon />}
            action={
                href
                    ? {
                        href,
                        label: guia.documento
                            ? 'Descargar guía'
                            : 'Abrir guía',
                        external: true,
                        icon: <ArrowForwardIosRoundedIcon sx={{ fontSize: 12 }} />,
                        sx: {
                            color: 'primary.main',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            '&:hover': {
                                color: 'secondary.main',
                            },
                        },
                    }
                    : undefined
            }
        />
    );
}
