import { Box, Typography } from "@mui/material";



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