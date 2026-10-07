import CardTiles from '@/app/components/CardTiles';
import { DatoGeografico } from '../definitions';

export default function CartografiaCard({ geografico }: { geografico: DatoGeografico }) {
  const cover = geografico.cover;
  const imagePath = cover?.formats?.small?.url || cover?.url;
  const imageUrl = imagePath
    ? /^https?:\/\//i.test(imagePath)
      ? imagePath
      : `${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${imagePath}`
    : null;
  const category = [geografico.tema?.descripcion, geografico.edicion]
    .filter((value) => value != null && value !== '')
    .join(' \u2022 ');

  return (
    <CardTiles
      tipo="cuadrado"
      title={geografico.objetoGeografico}
      href={`/cartografia/${geografico.documentId}`}
      image={{
        url: imageUrl,
        title: cover?.caption || geografico.objetoGeografico,
        alt: cover?.alternativeText || geografico.objetoGeografico,
      }}
      imageFit="contain"
      imageBadge={geografico.geometria}
      category={category}
      description={geografico.descripcion}
    />
  );
}
