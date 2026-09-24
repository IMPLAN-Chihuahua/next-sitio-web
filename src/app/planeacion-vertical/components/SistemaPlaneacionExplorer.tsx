import Link from 'next/link';
import InstrumentosTiles from './Tiles';
import styles from './SistemaPlaneacionExplorer.module.css';
import { GrupoPlaneacion, sistemaPlaneacion } from '../data/sistema-planeacion';

export default function SistemaPlaneacionExplorer({ grupo = null }: { grupo?: GrupoPlaneacion | null }) {
    return (
        <section id="catalogo-instrumentos" className={styles.catalog} aria-label="Catálogo de instrumentos">
            <div className={styles.catalogHeading}>
                <h2>Instrumentos de planeación</h2>
                <p>Consulta los estudios y documentos del municipio.</p>
            </div>
            {grupo && (
                <div className={styles.selection} role="status">
                    <span>{sistemaPlaneacion.derivados.find(item => item.grupo === grupo)?.titulo}</span>
                    <Link href="/planeacion-vertical?tab=sistemas-planeacion#catalogo-instrumentos">Ver todos ×</Link>
                </div>
            )}
            <InstrumentosTiles
                key={grupo ?? 'todos'}
                seccion="sistema_planeacion"
                compact
                expandedCatalog
                grupo={grupo}
            />
        </section>
    );
}
