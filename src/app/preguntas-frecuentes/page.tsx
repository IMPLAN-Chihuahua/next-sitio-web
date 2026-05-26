import { Toolbar } from '@mui/material';
import PageBanner from '../components/PageBanner';
import AccordionFAQ from './AccordionFAQ';


export default async function PreguntasFrecuentesPage() {
    let data = [];

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}/preguntas-frecuentes-page`, {
            next: { revalidate: 3600 },
        });
        const json = await res.json();

        data = json.data;
    } catch (err) {
        console.error("Error fetching data: ", err);
    }

    return (
        <main>
            <Toolbar variant='dense' />
            <AccordionFAQ data={data.FAQ} urlContacto={data.urlContacto} />
        </main>
    )
}