import type { Metadata } from "next";
import './globals.css';
import { Montserrat } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material/styles";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { CssBaseline } from "@mui/material";
import LocalizationProvider from "./components/AppLocalizationProvider";
import ScrollToTop from "./components/ScrollToTop";

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
      <body style={{ minHeight: '100vh' }}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <LocalizationProvider>
              <CssBaseline />
              <Navbar />
              {children}
              <Footer />
              <ScrollToTop />
            </LocalizationProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html >
  );
}
