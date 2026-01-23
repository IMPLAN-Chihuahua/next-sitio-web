
import HandshakeIcon from '@mui/icons-material/Handshake';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import ValueCard, { ValueCardProps } from './ValueCard';
import { Container, Grid } from "@mui/material";

const valuesData: ValueCardProps[] = [
    {
        title: 'INTEGRIDAD',
        description: 'Actuamos con honestidad, transparencia y coherencia en todas nuestras acciones.',
        icon: HandshakeIcon,
        iconBgColor: '#1565c0',
    },
    {
        title: 'INNOVACIÓN',
        description: 'Buscamos constantemente nuevas ideas y soluciones creativas para mejorar.',
        icon: LightbulbIcon,
        iconBgColor: '#fbc02d',
    },
    {
        title: 'PASIÓN',
        description: 'Nos entregamos con entusiasmo y dedicación a nuestro trabajo y propósito.',
        icon: FavoriteIcon,
        iconBgColor: '#e53935',
    },
    {
        title: 'COLABORACIÓN',
        description: 'Trabajamos juntos, compartiendo conocimientos y esfuerzos para metas comunes.',
        icon: SettingsIcon,
        iconBgColor: '#546e7a',
    },
];
const OurValues = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 5 }} >
            <Grid container spacing={4} justifyContent="center">
                {valuesData.map((value, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                        <ValueCard
                            title={value.title}
                            description={value.description}
                            icon={value.icon}
                            iconBgColor={value.iconBgColor}
                        />
                    </Grid>
                ))}

            </Grid>
        </Container>
    );
};
export default OurValues