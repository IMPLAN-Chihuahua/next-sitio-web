import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Pagination,
  Divider,
  Grid
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PageBanner from '../components/PageBanner';
import Destacados from './components/Destacados';
import Link from 'next/link';

const getImageUrl = (entry: any) => {
  const url = entry?.media?.[0]?.url;
  return url ? `${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${url}` : '';
};

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-MX', options);
};

export default async function EditorialPage() {
  let editorialData: any = {};
  let recentEntries: any[] = [];

  try {
    const [editorialRes, entriesRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/editorial?populate[featuredPosts][populate]=*`, {
        next: { revalidate: 3600 },
      }),
      fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/entries?sort=publishedAt:desc&pagination[pageSize]=6&populate=*`, {
        next: { revalidate: 3600 },
      })
    ]);

    const editorialJson = await editorialRes.json();
    const entriesJson = await entriesRes.json();

    editorialData = editorialJson?.data || {};
    recentEntries = entriesJson?.data || [];

    console.log('editoriallllllllllllllll dataaa')
    console.log('editoriallllllllllllllll dataaa')
    console.log('editoriallllllllllllllll dataaa')
    console.log(editorialData)

    console.log('entriesss jsonn')
    console.log('entriesss jsonn')
    console.log('entriesss jsonn')
    console.log(entriesJson)
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
      <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', py: 8 }}>

        <Destacados data={featuredPosts} />

        <Container maxWidth="lg">
          <Divider sx={{ my: 8 }} />

          <Box sx={{ mb: 8 }}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
              Publicaciones Recientes
            </Typography>
            <Grid container spacing={4}>
              {recentEntries.map((item: any) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
                  <Link href={`/editorial/${item.slug}`} style={{ textDecoration: 'none' }}>
                    <Card sx={{
                      height: '100%',
                      borderRadius: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 }
                    }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={getImageUrl(item)}
                        alt={item.title}
                        sx={{ bgcolor: 'grey.300' }}
                      />
                      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2, color: 'text.secondary' }}>
                          <AccessTimeIcon fontSize="small" />
                          <Typography variant="caption">
                            {formatDate(item.publishedAt)}
                            {item.autors?.[0]?.nombre ? ` • ${item.autors[0].nombre}` : ''}
                          </Typography>
                        </Stack>

                        <Typography variant="h6" fontWeight={700} sx={{ mb: 1, color: 'text.primary' }}>
                          {item.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {item.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Stack alignItems="center" sx={{ mt: 8 }}>
            <Pagination count={5} color="primary" size="large" />
          </Stack>

        </Container>
      </Box>
    </>
  );
}