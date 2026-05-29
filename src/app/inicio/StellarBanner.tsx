import { Box, Button, Stack, Container } from '@mui/material'
import { Media } from '../definitions';

type StellarButton = {
    id: number;
    text: string;
    url: string;
}

type StellarBannerItem = {
    id: number;
    title: string;
    buttons?: StellarButton[];
    media_desktop?: Media | string | null;
    media_mobile?: Media | string | null;
}

const getMediaUrl = (media: StellarBannerItem['media_desktop'], baseUrl: string) => {
    if (!media || typeof media === 'string') return '';

    const url = media.url || media.formats?.large?.url || media.formats?.medium?.url || media.formats?.small?.url || '';
    if (!url) return '';

    return url.startsWith('http') ? url : `${baseUrl}${url}`;
}

const StellarBanner = ({ data }: { data: StellarBannerItem[] }) => {
    if (!data?.length) return null;
    const baseUrl = process.env.NEXT_PUBLIC_IMPLAN_STATIC || '';

    return (
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
            {data.map((item, index) => {
                const desktopUrl = getMediaUrl(item.media_desktop, baseUrl);
                const mobileUrl = getMediaUrl(item.media_mobile, baseUrl) || desktopUrl;
                const hasButtons = !!item.buttons?.length;

                return (
                    <Box
                        key={item.id || index}
                        sx={{
                            width: '100%',
                            position: 'relative',
                            height: { xs: '60vh', md: '500px' },
                            backgroundImage: {
                                xs: `url(${mobileUrl})`,
                                md: `url(${desktopUrl})`
                            },
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            borderRadius: 0,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Container maxWidth="xl">
                            {hasButtons && (
                                <Stack
                                    direction={{ xs: 'column', sm: 'row' }}
                                    spacing={2}
                                    justifyContent="flex-end"
                                    alignItems="center"
                                    sx={{
                                        width: '100%',
                                    }}
                                >
                                    {item.buttons?.map((btn, btnIndex) => (
                                        <Button
                                            key={btn.id || btnIndex}
                                            variant="contained"
                                            color="inherit"
                                            href={btn.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{
                                                px: 4,
                                                py: 1.5,
                                                fontWeight: 'bold',
                                                textTransform: 'none',
                                                fontSize: '1rem',
                                                borderRadius: 2,
                                                backdropFilter: 'blur(4px)',
                                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                                color: '#000',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255, 255, 255, 1)',
                                                }
                                            }}
                                        >
                                            {btn.text}
                                        </Button>
                                    ))}
                                </Stack>
                            )}
                        </Container>
                    </Box>
                )
            })}
        </Box>
    )
}

export default StellarBanner
