import React from 'react';
import {
  Box,
  Container,
  Divider,
  Toolbar,
} from '@mui/material';
import PageBanner from '../components/PageBanner';
import Destacados from './components/Destacados';
import Articulos from './components/Articulos';
import { SubtitleH2 } from '../components/Titles';

export default async function EditorialPage() {
  let editorialData: any = {};

  try {
    const editorialRes = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/editorial?populate[featuredPosts][populate]=*`, {
      next: { revalidate: 3600 },
    });

    const editorialJson = await editorialRes.json();
    editorialData = editorialJson?.data || {};

  } catch (err) {
    console.error("Error fetching editorial data: ", err);
  }

  const featuredPosts = editorialData?.featuredPosts || [];

  return (
    <Box sx={{ mb: 3 }}>
      <Toolbar variant='dense' />
      <Container maxWidth="lg" sx={{ minHeight: '80vh' }}>
        <Destacados data={featuredPosts} />
        <Articulos />
      </Container>
    </Box>
  );
}