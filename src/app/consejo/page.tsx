import type { Metadata } from 'next';
import PageBanner from '../components/PageBanner';


export const metadata: Metadata = {
  title: 'Consejo'
};


export default function ConsejoPage() {
  return (
    <main>
      <PageBanner
        title='Consejo'
        description='lorem ipsum'
      />
    </main>
  )
}