import { Box, Container } from '@mui/material'
import React from 'react'
import Carousel from './EmblaProjects/Carousel'
import { EmblaOptionsType } from 'embla-carousel'
import { Project } from '../definitions'

const ProjectSlider = ({ data }: { data: Project[] }) => {
    if (!data?.length) return null;
    const OPTIONS: EmblaOptionsType = { direction: 'ltr' }

    return (
        <Box sx={{
            mt: 5,
        }}>
            <Carousel slides={data} options={OPTIONS} />
        </Box>
    )
}

export default ProjectSlider