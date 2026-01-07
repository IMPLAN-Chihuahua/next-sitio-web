import { Box } from '@mui/material'
import React from 'react'
import Carousel from './EmblaProjects/Carousel'
import { EmblaOptionsType } from 'embla-carousel'

const ProjectSlider = () => {

    const OPTIONS: EmblaOptionsType = { direction: 'ltr' }
    const SLIDE_COUNT = 5
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())



    return (
        <Box sx={{
            mt: 5,
            border: 1
        }}>
            <Carousel slides={SLIDES} options={OPTIONS} />
        </Box>
    )
}

const Project = () => {
    const projectito = ['Dictamenes', 'test'];

    return (
        projectito.map((projectito, idx) => (
            <Box key={idx}>
                {projectito}
            </Box>
        ))
    )

}

export default ProjectSlider