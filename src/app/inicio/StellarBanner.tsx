import { Box, Button, Stack } from '@mui/material'

const StellarBanner = ({ data }: { data: any[] }) => {
    const baseUrl = process.env.NEXT_PUBLIC_IMPLAN_STATIC || '';

    return (
        <Box sx={{ mt: 10 }}>
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
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            borderRadius: { xs: 0, md: 1 },
                            height: { xs: '500px', md: '400px' },
                            backgroundImage: {
                                xs: `url(${mobileUrl})`,
                                md: `url(${desktopUrl})`
                            },
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            pb: { xs: 6, md: 5 }
                        }}
                    >
                        {hasButtons && (
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={2}
                            >
                                {item.buttons.map((btn: any, btnIndex: number) => (
                                    <Button
                                        key={btnIndex}
                                        variant="contained"
                                        color="primary"
                                        href={btn.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{
                                            px: 4,
                                            py: 1.5,
                                            fontWeight: 'bold',
                                            boxShadow: 3,
                                            textTransform: 'none',
                                            fontSize: '1rem'
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