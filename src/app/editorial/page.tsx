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
    <Box component="main" sx={{ py: 3 }}>
      <Toolbar variant='dense' />
      <Destacados data={featuredPosts} />
      <Container maxWidth="lg" sx={{ minHeight: '80vh' }}>
        <Articulos />
      </Container>
    </Box>
  );
}