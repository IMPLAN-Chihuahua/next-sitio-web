import { Box, Typography } from "@mui/material";


export default function LicitacionCard({ idx, procedimiento, descripcion }: { idx: number, procedimiento: string, descripcion: string }) {


  return (
    <Box p={1.5} bgcolor={'primary.200'} minHeight={{ xs: 'auto', md: '350px' }} overflow={'hidden'}>
      <Box display={'flex'} alignItems={'center'}>
        <Box
          bgcolor={'secondary.700'}
          minHeight={40}
          minWidth={40}
          display={'inline-flex'}
          justifyContent={'center'}
          alignItems={'center'}
          borderRadius={25}
          sx={{ userSelect: 'none' }}
          fontWeight={600}>
          {idx}
        </Box>
        <Typography ml={1} fontSize={18} fontWeight={500}>{procedimiento}</Typography>
      </Box>
      <Typography mt={2}>
        {descripcion}
      </Typography>
    </Box>
  )
}