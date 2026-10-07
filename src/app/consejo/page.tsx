import type { Metadata } from 'next';
import PageBanner from '../components/PageBanner';
import FreshDivider from '../components/FreshDivider';
import { Box, Container, Typography } from '@mui/material';
import ConsejoCards from './components/Consejo';
import Headline from './components/Headline';
import { Consejero } from './definitions';


export const metadata: Metadata = {
  title: 'Consejo'
};


export default async function ConsejoPage() {
  let consejo: any = [];
  let data: any = {};

  try {
    const params = new URLSearchParams({
      'pagination[pageSize]': '1000000',
      'sort[0]': 'sector:asc',
      'sort[1]': 'nombre:asc',
    })
    const res = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/consejos?${params.toString()}`, {
      next: { revalidate: 3600 },
    });
    const json = await res.json();

    const res_header = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/cpum`, {
      next: { revalidate: 3600 },
    });
    const data_json = await res_header.json();

    consejo = json.data || [];
    data = data_json.data || {};
  } catch (err) {
    console.error("Error fetching data: ", err);
  }


  return (
    <>
      <PageBanner
        title={data?.banner?.text}
        description={data?.banner?.textEmphasis}
        cover={data?.banner?.image?.url
          ? `${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${data.banner.image.url}`
          : undefined
        }
      />
      <ConsejoCards data={consejo} />


    </>
  )
}