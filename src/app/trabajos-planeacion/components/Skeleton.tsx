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
    <Grid container spacing={2} mt={3}>
      <Grid height={250} size={{ xs: 12, md: 3 }}>
        <Skeleton variant="rounded" height={250} sx={{ m: 1 }} />
      </Grid>
      <Grid size={{ xs: 12, md: 9 }} position={'relative'}>
        <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
        <Skeleton variant="rectangular" sx={{ fontSize: '1rem', maxWidth: '100px', mt: 1 }} />
        <Skeleton variant="rectangular" sx={{ fontSize: '1rem', maxWidth: '300px', mt: 1 }} />

        <Stack
          height={'40px'}
          position={'absolute'}
          bottom={0}
          left={0}
          direction={'row'}
        >
          <Skeleton variant="text" sx={{ fontSize: '1rem', width: '70px' }} />
          <Skeleton variant="text" sx={{ fontSize: '1rem', width: '120px', ml: 1 }} />
        </Stack>
      </Grid>
    </Grid>
  );
}