import { Box, Container, Toolbar } from "@mui/material";
import PageBanner from "../components/PageBanner";
import { SubtitleH2 } from "../components/Titles";
import { ConveniosTable } from "./components/ConveniosTable";



export default function ConveniosPage() {

  return (
    <Box >
      {/* <PageBanner
        title="Convenios"
        description="En el IMPLAN estamos comprometidos con la transparencia y queremos que conozcas nuestra información."
      /> */}
      <Toolbar variant="dense" />
      <Container sx={{ my: 3 }}>
        <SubtitleH2 title="Convenios del Instituto" />
        <ConveniosTable />
      </Container>
    </Box>
  );
}