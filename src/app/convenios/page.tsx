import { Box, Container, Toolbar } from "@mui/material";
import PageBanner from "../components/PageBanner";
import { SubtitleH2, TitleH1 } from "../components/Titles";
import { ConveniosTable } from "./components/ConveniosTable";
import { TransparenciaBreadcrumbs } from "../transparencia/components/Breadcrumbs";



export default function ConveniosPage() {
  const pageTitle = "Convenios del Instituto"
  return (
    <Box >
      <Toolbar variant="dense" />
      <Container sx={{ my: 3 }}>
        <TransparenciaBreadcrumbs currentPageTitle={pageTitle} />
        <TitleH1 title={pageTitle} />
        <ConveniosTable />
      </Container>
    </Box>
  );
}