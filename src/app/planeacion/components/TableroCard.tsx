import { Tablero } from '../definitions';
import CardTiles from './CardTiles';


interface Props {
    tablero: Tablero;
}


const categorias: Record<string, string> = {
    'revision-opinion': 'REVISIÓN Y OPINIÓN',
    'indicadores': 'INDICADORES',
    'calculadora': 'CALCULADORA',
    'consulta': 'CONSULTA',
    'seguimiento': 'SEGUIMIENTO',
};


export default function TableroCard({
    tablero,
}: Props) {
    const isActive = !tablero.enDesarrollo;

    const categoria =
        categorias[tablero.categoria] ??
        tablero.categoria.toUpperCase();

    return (
        <CardTiles
            tipo="rectangular-horizontal"
            title={tablero.titulo}
            category={categoria}
            description={tablero.descripcion}
            inactive={!isActive}
            topAccent={isActive}
            descriptionLineClamp={4}
            action={
                tablero.url
                    ? {
                        href: tablero.url,
                        label: 'Abrir tablero',
                        external: true,
                    }
                    : undefined
            }
        />
    );
}
