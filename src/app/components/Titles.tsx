import { Box, Typography } from "@mui/material";

export function TitleH1({ title }: { title: string }) {
  return (
    <Typography
      gutterBottom
      variant='h1'
    >
      {title}
    </Typography>
  )
}

export function SubtitleH2({ title }: { title: string }) {
  return (
    <>
      <Typography variant='h2' gutterBottom>
        {title}
      </Typography>
    </>
  )
}