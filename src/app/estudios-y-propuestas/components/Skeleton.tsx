'use client'

import { Box, Grid, Skeleton, Stack } from "@mui/material";


export const TrabajosTilesSkeletons = ({ times = 3 }: { times?: number }) => {

  return (<> {
    [...Array(times)].map((_, i) => (
      <TrabajoTileSkeleton key={i} />
    ))
  } </>)
}

export const TrabajoTileSkeleton = () => {

  return (
    <Grid container spacing={.5} my={2.5} width={'100%'} m={1.5}>
      <Grid height={250} size={{ xs: 12, md: 3 }}>
        <Skeleton variant="rounded" height={250} />
      </Grid>
      <Grid size={{ xs: 12, md: 9 }} px={{ md: 2 }} pt={{ xs: 2, md: 0 }} display={'flex'} flexDirection='column'>
        <Skeleton variant="rounded" sx={{ fontSize: '3rem' }} />
        <Skeleton variant="rectangular" sx={{ fontSize: '1rem', maxWidth: '100px', mt: 1 }} />
        <Skeleton variant="rectangular" sx={{ fontSize: '1rem', maxWidth: '300px', mt: 1 }} />

        <Stack
          direction={'row'}
          mt='auto'
        >
          <Skeleton variant="rounded" sx={{ width: '70px' }} />
          <Skeleton variant="rounded" sx={{ width: '120px', ml: 1 }} />
        </Stack>
      </Grid>
    </Grid>
  );
}