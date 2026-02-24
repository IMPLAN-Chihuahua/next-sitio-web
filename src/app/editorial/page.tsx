import React from 'react';
import {
  Box,
  Container,
  Divider,
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
    <>
      <PageBanner
        description={editorialData.description}
        title={editorialData.title}
      />
      <Box component="main" sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', py: 8 }}>
        <Destacados data={featuredPosts} />

        <Container maxWidth="lg">
          <Divider sx={{ my: 8 }} />

          <Articulos />

        </Container>
      </Box>
    </>
  );
}