import React from 'react'
import { Section } from '../definitions'
import { Box, Button, Grid, Stack, Typography } from '@mui/material'

const ServicesList = ({ data }: { data: Section[] }) => {
    return (
        <Stack spacing={9} sx={{
            width: '100%',
            mt: 5
        }}>
            {
                data.map((item, index) => {
                    return (
                        <Service service={item} key={index} reverse={index % 2 !== 0} />
                    )
                })
            }
        </Stack>
    )
}

const Service = ({ service, reverse }: { service: Section, reverse: boolean }) => {

    return (
        <Grid container sx={{
            display: 'flex',
            flexDirection: reverse ? 'row-reverse' : 'row',
            pl: 2,
            pr: 2
        }}>
            <Grid size={{ md: 6, xs: 12 }}>
                <Typography
                    variant="h4"
                    component="h2"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        color: 'black'
                    }}
                >
                    {service.title}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        lineHeight: 1.6,
                        color: 'text.primary',
                        fontSize: 19
                    }}
                >
                    {service.description}
                </Typography>

                <Typography sx={{ mt: 4 }}>
                    {
                        service.buttons.map((data, index) => {
                            return (
                                <Button sx={{
                                    textTransform: 'none'
                                }} variant='contained' key={index}>{data.text}</Button>
                            )
                        })
                    }
                </Typography>
            </Grid>
            <Grid size={{ md: 6, xs: 12 }} sx={{
                display: 'flex',
                justifyContent: reverse ? 'start' : 'end',
                alignItems: 'end'
            }}>
                <Box sx={{
                    height: '400px',
                    width: '100%',
                    maxWidth: '400px',
                    aspectRatio: '1 / 1',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    overflow: 'hidden',
                    backgroundImage: `url(http://localhost:1337${service.media.formats?.small.url})`,
                    bgcolor: 'grey.300',
                    boxShadow: 3
                }}>
                </Box>
            </Grid>
        </Grid>
    )
}

export default ServicesList