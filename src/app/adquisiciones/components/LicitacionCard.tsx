import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, CircularProgress, Link, Paper, Typography } from "@mui/material";
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import { Suspense } from "react";


export default function LicitacionCard({ idx, procedimiento, descripcion }: { idx: number, procedimiento: string, descripcion: string }) {


  return (

    <Accordion
      component={Paper}
      variant="outlined"
      disableGutters
      sx={{
        boxShadow: 'none',
        '&:before': { display: 'none' },
        overflow: 'hidden'
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        sx={{
          p: 1.5,
          '& .MuiAccordionSummary-content': {
            margin: 0,
          },
          '&.Mui-expanded': {
            minHeight: 'auto',
          },
          '& .MuiAccordionSummary-content.Mui-expanded': {
            margin: 0,
          }
        }}>
        <Box display={'flex'} alignItems={'center'}>
          <Box
            bgcolor={'#eef4ef'}
            color='primary.main'
            minHeight={40}
            minWidth={40}
            display={'inline-flex'}
            justifyContent={'center'}
            alignItems={'center'}
            borderRadius={25}
            sx={{ userSelect: 'none' }}
            fontSize={15}
            fontWeight={700}>
            {idx}
          </Box>
          <Typography ml={1} fontSize={18} fontWeight={500}>{procedimiento}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Suspense fallback={<CircularProgress />}>
          <MDXRemote
            source={descripcion}
            components={{
              p: props => <Typography>{props.children}</Typography>,
              a: props => <Link href={props.href}>{props.children}</Link>,
              li: props => <Typography component={'li'} ml={2}>{props.children}</Typography>
            }} />
        </Suspense>
      </AccordionDetails>
    </Accordion>
  )
}