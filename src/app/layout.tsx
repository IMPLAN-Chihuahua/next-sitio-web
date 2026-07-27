import type { Metadata } from "next";
import './globals.css';
import { Montserrat } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material/styles";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Box, CssBaseline } from "@mui/material";
import LocalizationProvider from "./components/AppLocalizationProvider";
import ScrollToTop from "./components/ScrollToTop";
import AxeCore from "./components/AxeCore";

export const metadata: Metadata = {
  title: "IMPLAN Chihuahua",
  description: "El IMPLAN es un organismo descentralizado de la administración pública municipal de Chihuahua, Chihuahua.",
};

const montserrat = Montserrat({
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-montserrat'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={montserrat.variable}>
      <head>
        {/* Google Material Icons */}
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body style={{ minHeight: '100vh', margin: 0, display: 'flex', flexDirection: 'column' }}>
        <AxeCore />
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <LocalizationProvider>
              <CssBaseline />
              <Navbar />
              <Box component={'main'} flex={1}>
                {children}
              </Box>
              <Footer />
              <ScrollToTop />
            </LocalizationProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html >
  );
}