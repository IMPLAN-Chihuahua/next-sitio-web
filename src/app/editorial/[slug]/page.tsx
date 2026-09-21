import {
    Box, CircularProgress, Container, Divider, Grid, Link as MuiLink, Toolbar, Typography, Stack, Chip, Avatar
} from "@mui/material";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import qs from 'qs';
import { Suspense } from "react";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { Novedades } from "@/app/editorial/definitions";
import { Media, MultipleMedia } from "@/app/definitions";
import { ShareOptions } from "@/app/estudios-y-propuestas/components/ShareOptions";
import { NovedadBreadcrumbs } from "../components/Breadcrumbs";
import { ClasificacionSpan } from "@/app/estudios-y-propuestas/components/Tile";
import Carousel, { Slide } from "@/app/estudios-y-propuestas/components/Carousel";
import { ImagesMasonry } from "../components/Masonry";

type DetailPageMetadataProps = {
    params: Promise<{ slug: string }>,
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: DetailPageMetadataProps): Promise<Metadata> {
    const slug = (await params).slug;

    const queryParams = qs.stringify({
        filters: { slug: { $eq: slug } }
    }, { encodeValuesOnly: true });

    try {
        const page = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/entries?${queryParams}`);
        const json = await page.json();
        const article: Novedades = json.data?.[0];
        if (!article) return { title: 'Artículo no encontrado | IMPLAN' };

        const imageUrl = article.media?.[0]?.formats?.small?.url || article.media?.[0]?.url;
        const images = imageUrl ? [`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${imageUrl}`] : [];

        return {
            title: `${article.title} | IMPLAN`,
            description: article.seoDescription || article.description,
            openGraph: {
                images
            }
        }
    } catch (err) {
        return { title: 'Editorial | IMPLAN' }
    }
}
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const queryParams = qs.stringify({
        filters: { slug: { $eq: slug } },
    }, { encodeValuesOnly: true });

    const req = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/entries?${queryParams}`, {
        next: { revalidate: 60 }
    });

    const json = await req.json();
    const article: Novedades = json.data?.[0];

    if (!article) {
        notFound();
    }

    return (
        <Box >
            <Toolbar variant="dense" />
            <Container maxWidth="lg" sx={{ mt: 3, mb: 10 }}>
                <NovedadBreadcrumbs currentPageTitle={article.title} />
                <HeaderSection article={article} />
                <Box my={3}>
                    <Grid container gap={3}>
                        <Grid size={{ xs: 12, md: 'grow' }}>
                            <Typography fontWeight={600} color='primary.800'>Fecha publicación</Typography>
                            <Typography>{(new Date(article.fechaPublicacion)).toLocaleDateString('es-MX', { dateStyle: 'short' })}</Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 'grow' }}>
                            <Typography fontWeight={600} color='primary.800'>Etiquetas</Typography>
                            {(article as any).tags && (article as any).tags.length > 0 && (
                                <Stack direction="row" gap={.5} sx={{ mb: 2, flexWrap: 'wrap' }}>
                                    {(article as any).tags.map((tag: any) => (
                                        <ClasificacionSpan
                                            key={tag.id}
                                            clasificacion={{
                                                name: tag.name,
                                                hexColor: tag.hexColor
                                            }}
                                        />
                                    ))}
                                </Stack>
                            )}
                        </Grid>
                        <Grid size={{ xs: 12, md: 'grow' }}>
                            <Typography fontWeight={600} color='primary.800'>Compartir</Typography>
                            <ShareOptions />
                        </Grid>
                    </Grid>
                </Box>
                <CoverImage media={article.cover} />
                <Divider sx={{ my: 4 }} />

                <ContentSection content={article.content} />

                {article.momentosDestacados && article.momentosDestacados.length > 0 && (
                    <Box>
                        <Typography variant="h3" sx={{ mt: 4, mb: 2 }}>
                            Momentos destacados
                        </Typography>
                        <ImagesMasonry images={article.momentosDestacados} />
                    </Box>
                )}
            </Container>
        </Box>
    )
}

const HeaderSection = ({ article }: { article: Novedades }) => {
    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-MX', options);
    };

    return (
        <Box component='header' mt={2}>
            <Typography variant={'h1'} gutterBottom>
                {article.title}
            </Typography>
            {article.autor && article.autor.length > 0 && (
                <Stack direction={{ xs: 'column', md: "row" }} alignItems={{ xs: 'flex-start', md: "center" }} mb={3} columnGap={4} rowGap={2}>
                    {article.autor.map((autor, idx) => (
                        <Stack key={idx} direction="row" alignItems="center" spacing={1}>
                            <Avatar
                                src={autor.photo?.formats?.small?.url
                                    ? `${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${autor.photo.formats.small.url}`
                                    : ''}
                                alt={`${autor.nombres} ${autor.apellidos}`}
                                sx={{
                                    width: 56,
                                    height: 56,
                                    '& img': {
                                        objectPosition: 'center top'
                                    }
                                }}
                            />
                            <Box>
                                <Typography fontWeight={600} lineHeight={1.2}>
                                    {autor.prefix ? `${autor.prefix} ` : ''}{autor.nombres} {autor.apellidos}
                                </Typography>
                                <Typography variant="caption">
                                    {autor.titulo || 'IMPLAN'}
                                </Typography>
                            </Box>
                        </Stack>
                    ))}
                </Stack>
            )}
            <Typography sx={{ fontSize: '1.15rem', lineHeight: 1.5 }} mb={2}>
                {article.description}
            </Typography>
        </Box>
    )
}

const CoverImage = ({ media }: { media: Media | null }) => {
    if (!media) return null;
    const cover = media;

    return (
        <Box
            display={'flex'}
            justifyContent={'center'}
            flexDirection={'column'}

        >
            <Box
                height={{ xs: 300, md: 500 }}
                width={'100%'}
                mx='auto'
                maxWidth={'700px'}
                mt={4}
                mb={1}
                position={'relative'}
                borderRadius={1}
                overflow={'hidden'}
                boxShadow={3}
            >
                <Image
                    src={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${cover.url}`}
                    fill
                    alt={cover.alternativeText ?? 'Portada del artículo'}
                    unoptimized
                    style={{
                        objectFit: 'cover',
                    }}
                />
            </Box>
            <Typography variant="caption" textAlign={'center'} display={'block'}>
                {cover.caption}
            </Typography>
        </Box>
    )
}

const ContentSection = ({ content }: { content: string }) => {
    if (!content) return null;

    return (
        <Box component='article' my={4} sx={{
            '& .mdx-paragraph': { mb: 3, fontSize: '1.15rem', lineHeight: 1.8 },
            '& h2': { mt: 6, mb: 3, fontSize: '1.8rem', fontWeight: 700, color: 'primary.900' },
            '& h3': { mt: 4, mb: 2, fontSize: '1.5rem', fontWeight: 600, color: 'primary.800' },
            '& ul, & ol': { mb: 3, ml: 3, fontSize: '1.15rem', lineHeight: 1.8 },
            '& li': { mb: 1 },
            '& blockquote': {
                borderLeft: '4px solid', borderColor: 'primary.main', pl: 3, ml: 0,
                fontStyle: 'italic', bgcolor: '#f8f9fa', py: 2, pr: 2, my: 4, borderRadius: 1
            }
        }}>
            <Suspense fallback={<CircularProgress />}>
                <MDXRemote
                    source={content}
                    components={{
                        p: props => <Typography className="mdx-paragraph" {...props}>{props.children}</Typography>,
                        a: props => <MuiLink href={props.href} target="_blank" underline="hover">{props.children}</MuiLink>,
                        img: props => (
                            //     <Box
                            //         my={4}
                            //         textAlign="center"
                            //         component={'span'}
                            //         maxWidth={'600px'}
                            //         minWidth={'200px'}
                            //         px={1}
                            //         display={'inline-flex'}
                            //         flexDirection={'column'}
                            //         position={'relative'}
                            //     >
                            //         <img
                            //             src={props.src}
                            //             alt={props.alt}
                            //             style={{

                            //                 borderRadius: '5px',
                            //                 boxShadow: '0 4px 12px rgba(0,0,0,0.1)',

                            //             }}
                            //         />
                            //     </Box>
                            <Box
                                component='span'
                                display={'inline-flex'}
                                position={'relative'}
                                flexDirection={'column'}
                                height={580}
                                minHeight={300}
                                width={'100%'}
                            >
                                <Image
                                    src={props.src}
                                    alt={props.alt}
                                    layout="fill"
                                    unoptimized
                                    style={{
                                        objectFit: 'contain',
                                        bottom: 0,
                                        top: 0,
                                        paddingBottom: 20
                                    }}
                                />
                                {props.alt && <Typography
                                    bottom={0}
                                    left={0}
                                    right={0}
                                    position={'absolute'}
                                    variant="caption"
                                    display="block"
                                    textAlign={'center'}
                                    bgcolor={'primary.50'}
                                    color="text.secondary"
                                >{props.alt}</Typography>}
                            </Box>
                        ),
                        LocalVideo: props => (
                            <Box my={4}>
                                <video width='100%' height='auto' controls disablePictureInPicture style={{ borderRadius: '12px' }}>
                                    <source src={props.src} type={props.type}></source>
                                </video>
                                <Typography variant="caption" textAlign='center' display='block' mt={1} color="text.secondary">Video: {props.caption}</Typography>
                            </Box>
                        ),
                        Carousel: props => (<Carousel>{props.children}</Carousel>),
                        Slide: props => <Slide {...props} />,
                    }}
                />
            </Suspense>
        </Box>
    )
}