import { LocationCity } from '@mui/icons-material'
import { Box, Divider } from '@mui/material'
import React from 'react'

const FreshDivider = () => {
    return (
        <Box sx={{ py: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Divider sx={{ flexGrow: 1, borderColor: 'grey.300' }} />
            <Box sx={{ mx: 2, color: 'grey.400' }}>
                <LocationCity fontSize="large" />
            </Box>
            <Divider sx={{ flexGrow: 1, borderColor: 'grey.300' }} />
        </Box>
    )
}

export default FreshDivider