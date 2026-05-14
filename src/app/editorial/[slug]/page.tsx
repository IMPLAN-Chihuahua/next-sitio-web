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
import { MultipleMedia } from "@/app/definitions";
import { ShareOptions } from "@/app/estudios-y-proyectos/components/ShareOptions";

type DetailPageMetadataProps = {
    params: Promise<{ slug: string }>,
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: DetailPageMetadataProps): Promise<Metadata> {
    const slug = (await params).slug;

    const queryParams = qs.stringify({
        filters: { slug: { $eq: slug } },
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
        <Box component={'main'}>
            <Toolbar variant="dense" />
            <Container maxWidth="md" sx={{ mt: 3, mb: 10 }}>
                <HeaderSection article={article} />
                <CoverImage media={article.media} />

                <Divider sx={{ my: 4 }} />

                <Box display="flex" justifyContent="flex-end" mb={4}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography fontWeight={600} color='primary.800'>Compartir:</Typography>
                        <ShareOptions />
                    </Stack>
                </Box>

                <ContentSection content={article.content} />
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
            {(article as any).tags && (article as any).tags.length > 0 && (
                <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
                    {(article as any).tags.map((tag: any) => (
                        <Chip
                            key={tag.id}
                            label={tag.name}
                            size="small"
                            sx={{
                                bgcolor: `${tag.hexColor}15`,
                                color: tag.hexColor,
                                fontWeight: 600,
                                border: `1px solid ${tag.hexColor}`
                            }}
                        />
                    ))}
                </Stack>
            )}

            <Typography component={'h1'} mb={2} fontWeight={800} fontSize={{ xs: 32, md: 46 }} lineHeight={1.2}>
                {article.title}
            </Typography>

            <Typography variant="h6" color="text.secondary" fontWeight={400} mb={4} lineHeight={1.6}>
                {article.description}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                {article.autor && article.autor.length > 0 && (
                    <Stack direction="row" alignItems="center" spacing={1.5}>
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
                                    <Typography variant="subtitle2" fontWeight={700} lineHeight={1.2}>
                                        {autor.prefix ? `${autor.prefix}. ` : ''}{autor.nombres} {autor.apellidos}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {autor.titulo || 'Redacción IMPLAN'}
                                    </Typography>
                                </Box>
                            </Stack>
                        ))}
                    </Stack>
                )}

                <Stack direction="row" alignItems="center" spacing={0.5} color="text.secondary">
                    <AccessTimeIcon fontSize="small" />
                    <Typography variant="body2" fontWeight={500}>
                        {formatDate(article.publishedAt)}
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    )
}

const CoverImage = ({ media }: { media: MultipleMedia }) => {
    if (!media || media.length === 0) return null;
    const cover = media[0];

    return (
        <Box
            height={{ xs: 300, md: 500 }}
            width={'100%'}
            mt={4}
            position={'relative'}
            borderRadius={4}
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
    )
}

const ContentSection = ({ content }: { content: string }) => {
    if (!content) return null;

    return (
        <Box component='article' my={4} sx={{
            '& .mdx-paragraph': { mb: 3, fontSize: '1.15rem', lineHeight: 1.8, color: 'text.secondary' },
            '& h2': { mt: 6, mb: 3, fontSize: '1.8rem', fontWeight: 700, color: 'primary.900' },
            '& h3': { mt: 4, mb: 2, fontSize: '1.5rem', fontWeight: 600, color: 'primary.800' },
            '& ul, & ol': { mb: 3, ml: 3, color: 'text.secondary', fontSize: '1.15rem', lineHeight: 1.8 },
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
                        p: props => <Typography component="div" className="mdx-paragraph" {...props} />,

                        a: props => <MuiLink href={props.href} target="_blank" underline="hover" color="primary.main">{props.children}</MuiLink>,
                        img: props => (
                            <Box my={4} textAlign="center">
                                <img src={props.src} alt={props.alt} style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                {props.alt && <Typography variant="caption" display="block" mt={1.5} color="text.secondary">{props.alt}</Typography>}
                            </Box>
                        ),
                        LocalVideo: props => (
                            <Box my={4}>
                                <video width='100%' height='auto' controls disablePictureInPicture style={{ borderRadius: '12px' }}>
                                    <source src={props.src} type={props.type}></source>
                                </video>
                                <Typography variant="caption" textAlign='center' display='block' mt={1} color="text.secondary">Video: {props.caption}</Typography>
                            </Box>
                        )
                    }}
                />
            </Suspense>
        </Box>
    )
}