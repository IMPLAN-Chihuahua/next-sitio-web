'use client'

import { Box, Grid, Skeleton } from "@mui/material"



const InstrumentoSkeletonList = ({ times = 3 }: { times?: number }) => {

  return (
    <Grid container rowSpacing={{ xs: 4, md: 2 }} columnSpacing={{ md: 3 }}>
      {
        [...Array(times)].map((_, i) => (
          <Grid size={{ xs: 12, md: 4 }} key={i} overflow={'hidden'}>
            <Skeleton variant="rectangular" height={480} width={380} />
            <Skeleton variant="rounded" height={40} sx={{ mt: 1.5 }} />
            <Skeleton variant="rounded" height={40} sx={{ mt: 1.5, maxWidth: 220 }} />
          </Grid>
        ))
      }
    </Grid>
  )
}


export default InstrumentoSkeletonList