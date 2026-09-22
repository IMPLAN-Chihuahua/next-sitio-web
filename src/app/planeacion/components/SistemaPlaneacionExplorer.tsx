'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AccountTreeOutlined, ApartmentOutlined, ChevronLeft, ChevronRight, DomainOutlined, LayersOutlined, LocationCityOutlined } from '@mui/icons-material';
import InstrumentosTiles from './Tiles';
import styles from './SistemaPlaneacionExplorer.module.css';
import { GrupoPlaneacion, NodoPlaneacion, sistemaPlaneacion } from '../data/sistema-planeacion';

function Nodo({ nodo, selected, onSelect }: { nodo: NodoPlaneacion; selected: boolean; onSelect: () => void }) {
    const className = `${styles.node} ${nodo.estado === 'en_desarrollo' ? styles.development : ''}`;
    const content = <>
        <strong>{nodo.titulo}</strong>
        {nodo.subtitulo && <span className={styles.nodeDescription}>{nodo.subtitulo}</span>}
        <span className={styles.status}>{nodo.estado === 'vigente' ? 'Vigente' : 'En desarrollo'}</span>
        {(nodo.url || nodo.grupo) && <span className={styles.nodeAction}>{nodo.url ? 'Ver estudio →' : 'Ver instrumentos →'}</span>}
    </>;

    return nodo.url
        ? <Link href={nodo.url} className={className}>{content}</Link>
        : nodo.grupo
            ? <button className={className} aria-pressed={selected} aria-controls="catalogo-instrumentos" onClick={onSelect}>{content}</button>
            : <div className={className}>{content}</div>;
}

export default function SistemaPlaneacionExplorer() {
    const [grupo, setGrupo] = useState<GrupoPlaneacion | null>(null);
    const [diagramOpen, setDiagramOpen] = useState(true);
    const catalogRef = useRef<HTMLElement>(null);
    const layoutRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const catalog = catalogRef.current;
        const layout = layoutRef.current;
        if (!catalog || !layout) return;

        // Sigue la altura real del encabezado y los filtros, incluso al abrirlos
        // o al cambiar el ancho del catálogo al plegar el diagrama.
        const alignDiagram = () => {
            const results = catalog.querySelector('[data-instrumentos-results]');
            const offset = results ? results.getBoundingClientRect().top - catalog.getBoundingClientRect().top : 0;
            layout.style.setProperty('--diagram-start-offset', `${offset}px`);
        };
        const observer = new ResizeObserver(alignDiagram);
        observer.observe(catalog);
        alignDiagram();
        return () => observer.disconnect();
    }, []);

    const selectGrupo = (next: GrupoPlaneacion | null) => {
        setGrupo(next);
        catalogRef.current?.scrollIntoView({ block: 'start', behavior: 'auto' });
    };

    const renderNode = (nodo: NodoPlaneacion) => (
        <Nodo
            key={nodo.id}
            nodo={nodo}
            selected={grupo === nodo.grupo}
            onSelect={() => selectGrupo(grupo === nodo.grupo ? null : nodo.grupo ?? null)}
        />
    );

    return (
        <div ref={layoutRef} className={`${styles.layout} ${!diagramOpen ? styles.collapsed : ''}`}>
            <section ref={catalogRef} id="catalogo-instrumentos" className={styles.catalog} aria-label="Catálogo de instrumentos">
                <div className={styles.catalogHeading}>
                    <h2>Instrumentos de planeación</h2>
                    <p>Consulta los estudios y documentos del municipio.</p>
                </div>
                {grupo && (
                    <div className={styles.selection} role="status">
                        <span>{sistemaPlaneacion.derivados.find(item => item.grupo === grupo)?.titulo}</span>
                        <button onClick={() => selectGrupo(null)}>Ver todos ×</button>
                    </div>
                )}
                <InstrumentosTiles
                    key={grupo ?? 'todos'}
                    seccion="sistema_planeacion"
                    compact
                    expandedCatalog={!diagramOpen}
                    grupo={grupo}
                />
            </section>

            <aside className={styles.map} aria-label="Sistema de Planeación del Municipio de Chihuahua">
                <div className={styles.panelHeader}>
                    <span className={styles.panelLabel} hidden={!diagramOpen}><AccountTreeOutlined aria-hidden="true" /> SISTEMA DE PLANEACIÓN</span>
                    <button
                        className={styles.toggle}
                        aria-expanded={diagramOpen}
                        aria-controls="diagrama-planeacion"
                        onClick={() => setDiagramOpen(open => !open)}
                    >
                        <span className={styles.toggleIcon} aria-hidden="true">{diagramOpen ? <ChevronRight /> : <ChevronLeft />}</span>
                        <span>{diagramOpen ? 'Ocultar diagrama' : 'Mostrar diagrama'}</span>
                    </button>
                </div>
                <div id="diagrama-planeacion" hidden={!diagramOpen} className={styles.panelContent}>
                    <h2>¿Cómo se organiza la planeación?</h2>
                    <p className={styles.description}>Municipio de Chihuahua · Del territorio a los planes específicos.</p>
                    <nav aria-label="Diagrama del sistema de planeación">
                        <ol className={styles.levels}>
                            <li className={styles.level}>
                                <h3><DomainOutlined aria-hidden="true" /><span>01 · Nivel metropolitano</span></h3>
                                {renderNode(sistemaPlaneacion.metropolitano)}
                            </li>
                            <li className={styles.level}>
                                <h3><LocationCityOutlined aria-hidden="true" /><span>02 · Nivel municipal</span></h3>
                                {renderNode(sistemaPlaneacion.municipal)}
                            </li>
                            <li className={styles.level}>
                                <h3><ApartmentOutlined aria-hidden="true" /><span>03 · Centro de población</span></h3>
                                <div className={styles.versions}>{sistemaPlaneacion.desarrolloUrbano.map(renderNode)}</div>
                            </li>
                            <li className={styles.level}>
                                <h3><LayersOutlined aria-hidden="true" /><span>04 · Instrumentos específicos</span></h3>
                                <div className={styles.branches}>{sistemaPlaneacion.derivados.map(renderNode)}</div>
                            </li>
                        </ol>
                    </nav>
                </div>
            </aside>
        </div>
    );
}
