import React from 'react';
import {
  Box,
  Container,
  Divider,
  Toolbar,
  Typography,
} from '@mui/material';
import PageBanner from '../components/PageBanner';
import Destacados from './components/Destacados';
import Articulos from './components/Articulos';
import { SubtitleH2 } from '../components/Titles';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Novedades'
};

export default async function EditorialPage() {
  let editorialData: any = {};

  try {
    const editorialRes = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/editorial`, {
      next: { revalidate: 3600 },
    });

    const editorialJson = await editorialRes.json();
    editorialData = editorialJson?.data || {};

  } catch (err) {
    console.error("Error fetching editorial data: ", err);
  }

  return (
    <Box>
      <Toolbar variant='dense' />
      <Container maxWidth="lg" sx={{ minHeight: '80vh', my: 3 }}>
        <Typography variant='h1' gutterBottom>Novedades</Typography>
        <Articulos />
      </Container>
    </Box>
  );
}