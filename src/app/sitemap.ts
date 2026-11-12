import type { MetadataRoute } from 'next';

const SITE_URL = 'https://implanchihuahua.org';
const CMS_URL = process.env.NEXT_PUBLIC_IMPLAN_CMS?.replace(/\/$/, '');
const REVALIDATE_SECONDS = 60 * 60;
const CMS_PAGE_SIZE = 100;

export const revalidate = 3600;

type SitemapEntry = MetadataRoute.Sitemap[number];

type CmsItem = {
  documentId?: string;
  slug?: string;
  seoUrl?: string;
  nombreCortoSlug?: string;
  updatedAt?: string;
  publishedAt?: string;
};

type CmsResponse = {
  data?: CmsItem[];
  meta?: {
    pagination?: {
      page?: number;
      pageCount?: number;
    };
  };
};

type DynamicResource = {
  endpoint: string;
  route: string;
  identifier: keyof Pick<CmsItem, 'documentId' | 'slug' | 'seoUrl' | 'nombreCortoSlug'>;
  changeFrequency: SitemapEntry['changeFrequency'];
  priority: number;
};

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: SitemapEntry['changeFrequency'];
  priority: number;
}> = [
  { path: '/', changeFrequency: 'daily', priority: 1 },
  { path: '/novedades', changeFrequency: 'daily', priority: 0.9 },
  { path: '/estudios-y-propuestas', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/planeacion', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/cartografia', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/adquisiciones', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/convenios', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/dictamenes', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/plataformas', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/poel/criterios', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/quienes-somos', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/consejo', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/practicas-profesionales', changeFrequency: 'weekly', priority: 0.6 },
  { path: '/preguntas-frecuentes', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/rendicion-cuentas', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/transparencia', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/unidad-transparencia', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/avisos-privacidad', changeFrequency: 'monthly', priority: 0.5 },
];

const DYNAMIC_RESOURCES: DynamicResource[] = [
  {
    endpoint: '/entries',
    route: '/novedades',
    identifier: 'slug',
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    endpoint: '/trabajos-planeacion',
    route: '/estudios-y-propuestas',
    identifier: 'slug',
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    endpoint: '/datos-geograficos',
    route: '/cartografia',
    identifier: 'documentId',
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    endpoint: '/instrumentos-planeacion',
    route: '/planeacion',
    identifier: 'nombreCortoSlug',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    endpoint: '/avisos-privacidad',
    route: '/avisos-privacidad',
    identifier: 'seoUrl',
    changeFrequency: 'yearly',
    priority: 0.5,
  },
];

function getLastModified(item: CmsItem): Date | undefined {
  const value = item.updatedAt ?? item.publishedAt;

  if (!value) return undefined;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

async function fetchCmsPage(resource: DynamicResource, page: number): Promise<CmsResponse> {
  if (!CMS_URL) return {};

  const fields = [resource.identifier, 'updatedAt', 'publishedAt'];
  const query = new URLSearchParams({
    'pagination[page]': String(page),
    'pagination[pageSize]': String(CMS_PAGE_SIZE),
  });

  fields.forEach((field, index) => query.set(`fields[${index}]`, field));

  const response = await fetch(`${CMS_URL}${resource.endpoint}?${query}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`El CMS respondió ${response.status} para ${resource.endpoint}`);
  }

  return response.json() as Promise<CmsResponse>;
}

async function getDynamicEntries(resource: DynamicResource): Promise<SitemapEntry[]> {
  try {
    const firstPage = await fetchCmsPage(resource, 1);
    const pageCount = firstPage.meta?.pagination?.pageCount ?? 1;
    const remainingPages = await Promise.all(
      Array.from({ length: Math.max(pageCount - 1, 0) }, (_, index) =>
        fetchCmsPage(resource, index + 2),
      ),
    );

    return [firstPage, ...remainingPages]
      .flatMap((response) => response.data ?? [])
      .flatMap((item): SitemapEntry[] => {
        const identifier = item[resource.identifier];

        if (typeof identifier !== 'string' || identifier.length === 0) return [];

        return [{
          url: `${SITE_URL}${resource.route}/${encodeURIComponent(identifier)}`,
          lastModified: getLastModified(item),
          changeFrequency: resource.changeFrequency,
          priority: resource.priority,
        }];
      });
  } catch (error) {
    console.error(`No se pudieron agregar al sitemap los recursos de ${resource.endpoint}.`, error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const dynamicEntries = (await Promise.all(DYNAMIC_RESOURCES.map(getDynamicEntries))).flat();
  const uniqueEntries = new Map<string, SitemapEntry>();

  [...staticEntries, ...dynamicEntries].forEach((entry) => uniqueEntries.set(entry.url, entry));

  return Array.from(uniqueEntries.values());
}
