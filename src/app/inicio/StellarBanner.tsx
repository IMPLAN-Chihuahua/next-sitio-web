import { Box, Button, Stack, Container, Typography } from '@mui/material'

const StellarBanner = ({ data }: { data: any[] }) => {
    if (!data?.length) return null;
    const baseUrl = process.env.NEXT_PUBLIC_IMPLAN_STATIC || '';

    return (
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
            {data.map((item, index) => {
                const desktopUrl = item.media_desktop?.url ? `${baseUrl}${item.media_desktop.url}` : '';
                const mobileUrl = item.media_mobile?.url ? `${baseUrl}${item.media_mobile.url}` : desktopUrl;
                const hasButtons = item.buttons && item.buttons.length > 0;

                return (
                    <Box
                        key={index}
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
                                    {item.buttons.map((btn: any, btnIndex: number) => (
                                        <Button
                                            key={btnIndex}
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