import { Box, Button, Stack } from '@mui/material'
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
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Box
                            component="img"
                            src={desktopUrl}
                            alt={item.title || 'Banner'}
                            sx={{
                                width: '100%',
                                height: 'auto',
                                display: { xs: 'none', md: 'block' }
                            }}
                        />

                        <Box
                            component="img"
                            src={mobileUrl}
                            alt={item.title || 'Banner Móvil'}
                            sx={{
                                width: '100%',
                                height: 'auto',
                                display: { xs: 'block', md: 'none' }
                            }}
                        />

                        {hasButtons && (
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={2}
                                sx={{
                                    position: 'absolute',
                                    right: { xs: '5%', md: '10%' },
                                    bottom: { xs: '10%', md: '15%' },
                                    zIndex: 10,
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
                    </Box>
                )
            })}
        </Box>
    )
}

export default StellarBanner