import { Box, Container } from '@mui/material'
import React from 'react'
import Carousel from './EmblaProjects/Carousel'
import { EmblaOptionsType } from 'embla-carousel'
import { Project } from '../definitions'

const ProjectSlider = ({ data }: { data: Project[] }) => {
    if (!data?.length) return null;
    const OPTIONS: EmblaOptionsType = { direction: 'ltr' }

    return (
        <Carousel slides={data} options={OPTIONS} />
    )
}

export default ProjectSlider