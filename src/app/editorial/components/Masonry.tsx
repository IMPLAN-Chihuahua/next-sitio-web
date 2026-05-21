'use client'

import { MultipleMedia } from "@/app/definitions"
import Carousel, { Slide } from "@/app/estudios-y-proyectos/components/Carousel"
import theme from "@/theme"
import { KeyboardArrowDown, KeyboardArrowUp, Visibility, VisibilityOff } from "@mui/icons-material"
import { Box, Button, Collapse, ImageList, ImageListItem, ImageListItemBar, useMediaQuery } from "@mui/material"
import Image from "next/image"
import { useState } from "react"


export const ImagesMasonry = (props: { images: MultipleMedia }) => {
  const cols = useMediaQuery(theme.breakpoints.down('sm')) ? 1 : 3
  const [open, setOpen] = useState(false);

  const toggleImages = () => setOpen(pre => !pre)

  if (!props.images) {
    return
  }

  return <Box>
    <Carousel >
      {
        props.images.slice(0, 5).map(destacado => (
          <Slide key={destacado.documentId} desc={destacado.caption ?? ""} url={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${destacado.url}`} />
        ))
      }
    </Carousel>
    {
      props.images.length > 5 && (
        <Box>
          <Button
            endIcon={open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            color='primary' onClick={toggleImages}
            size='large'
            disableFocusRipple
            disableTouchRipple
            sx={{ mb: 3}}>
            {open ? 'Ocultar' : 'Mostrar'} todo ({props.images.length})
          </Button>
          <Collapse in={open}>
            <ImageList variant='masonry' cols={cols} gap={10}>
              {
                props.images.map(destacado => (
                  <ImageListItem key={destacado.documentId}>
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${destacado.url}`}
                      alt=""
                      loading="lazy"
                      style={{
                        display: 'block',
                        width: '100%',
                        height: 'auto',
                      }}
                    />
                    <ImageListItemBar position="below" title={destacado.caption} />
                  </ImageListItem>
                ))
              }
            </ImageList>
          </Collapse>
        </Box>
      )
    }
  </Box>
}