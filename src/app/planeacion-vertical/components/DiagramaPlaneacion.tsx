'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AccountTreeOutlined, ApartmentOutlined, ExpandLess, ExpandMore, DomainOutlined, LayersOutlined, LocationCityOutlined } from '@mui/icons-material';
import styles from './SistemaPlaneacionExplorer.module.css';
import { GrupoPlaneacion, NodoPlaneacion, sistemaPlaneacion } from '../data/sistema-planeacion';

function Nodo({ nodo, selected }: { nodo: NodoPlaneacion; selected: boolean }) {
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
            ? <Link className={className} aria-current={selected ? 'true' : undefined} href={`/planeacion-vertical?tab=sistemas-planeacion${selected ? '' : `&grupo=${nodo.grupo}`}#catalogo-instrumentos`}>{content}</Link>
            : <div className={className}>{content}</div>;
}

export default function DiagramaPlaneacion({ grupo = null }: { grupo?: GrupoPlaneacion | null }) {
    const [diagramOpen, setDiagramOpen] = useState(false);

    const renderNode = (nodo: NodoPlaneacion) => (
        <Nodo key={nodo.id} nodo={nodo} selected={!!grupo && grupo === nodo.grupo} />
    );

    return (
        <aside className={`${styles.map} ${!diagramOpen ? styles.collapsed : ''}`} aria-label="Sistema de Planeación del Municipio de Chihuahua">
            <div className={styles.panelHeader}>
                <span className={styles.panelLabel} hidden={!diagramOpen}><AccountTreeOutlined aria-hidden="true" /> SISTEMA DE PLANEACIÓN</span>
                <button
                    className={styles.toggle}
                    aria-expanded={diagramOpen}
                    aria-controls="diagrama-planeacion"
                    onClick={() => setDiagramOpen(open => !open)}
                >
                    <span className={styles.toggleIcon} aria-hidden="true">{diagramOpen ? <ExpandLess /> : <ExpandMore />}</span>
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
    );
}
