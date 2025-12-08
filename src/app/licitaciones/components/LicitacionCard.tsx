import { Box, CircularProgress, Link, Typography } from "@mui/material";
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import { Suspense } from "react";


export default function LicitacionCard({ idx, procedimiento, descripcion }: { idx: number, procedimiento: string, descripcion: string }) {


  return (
    <Box p={1.5} bgcolor={'primary.200'} minHeight={{ xs: 'auto', md: '350px' }} overflow={'hidden'}>
      <Box display={'flex'} alignItems={'center'} mb={2}>
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
      <Suspense fallback={<CircularProgress />}>
        <MDXRemote
          source={descripcion}
          components={{
            p: props => <Typography>{props.children}</Typography>,
            a: props => <Link href={props.href}>{props.children}</Link>,
            li: props => <Typography component={'li'} ml={2}>{props.children}</Typography>
          }}
        />
      </Suspense>
    </Box>
  )
}