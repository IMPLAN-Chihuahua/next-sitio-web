import { Box, Container, Typography } from "@mui/material";



export default function PageBanner({ title, description }: { title: string, description: string }) {

  return (
    <Box minHeight={'45vh'} bgcolor={'gainsboro'} display='flex' alignItems='center'>
      <Container maxWidth='xl'>
        <Typography>{title}</Typography>
        <Typography>{description}</Typography>
      </Container>
    </Box>
  )
}