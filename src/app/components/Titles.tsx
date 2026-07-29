import { Box, Typography } from "@mui/material";

export function TitleH1({ title }: { title: string }) {
  return (
    <Typography
      fontSize={{ xs: 32, md: 40 }}
      fontWeight={900}
      color='primary.800'
      mt={4}
      component='h1'
    >
      {title}
    </Typography>
  )
}

export function SubtitleH2({ title }: { title: string }) {
  return (
    <>
      <Typography
        fontSize={32}
        fontWeight={700}
        color='primary.800'
        mt={4}
        component='h2'>
        {title}
      </Typography>
    </>
  )
}