import React from 'react'
import { Stellar } from '../definitions'
import { Box, Button, Typography } from '@mui/material'

const StellarBanner = ({ data }: { data: Stellar[] }) => {
    // console.log(`url(http://localhost:1337${data.media.url}`)
    return (
        <Box sx={{
            mt: 10,
        }}>
            {
                data.map((data, index) => {
                    return (
                        <Box sx={{
                            backgroundImage: `url(http://localhost:1337${data.media.url})`,
                            height: '400px',
                            borderRadius: 1,
                            position: 'relative',
                            backgroundSize: 'cover',
                        }} key={index}>
                        </Box>
                    )
                })
            }
        </Box>
    )
}

export default StellarBanner