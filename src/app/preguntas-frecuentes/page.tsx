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
        console.log(data);
    } catch (err) {
        console.error("Error fetching data: ", err);
    }

    return (
        <main>
            <PageBanner
                title='Preguntas frecuentes'
                description='¿Tienes alguna duda?'
            />
            <AccordionFAQ data={data.FAQ} urlContacto={data.urlContacto} />
        </main>
    )
}