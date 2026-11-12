import type { Metadata } from "next";
import '@multicloud-io/react-a11y-toolbar/style.css';
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
import AccessibilityTools from "./components/AccessibilityTools";
import { GoogleAnalytics } from '@next/third-parties/google';


export const metadata: Metadata = {
  metadataBase: new URL("https://implanchihuahua.org"),
  title: {
    default: "IMPLAN Chihuahua",
    template: "%s | IMPLAN Chihuahua"
  },
  description: "El IMPLAN es un organismo descentralizado de la administración pública municipal de Chihuahua, Chihuahua.",
  openGraph: {
    title: "IMPLAN Chihuahua",
    description: "El IMPLAN es un organismo descentralizado de la administración pública municipal de Chihuahua, Chihuahua.",
    url: "https://www.implanchihuahua.org/",
    siteName: "IMPLAN Chihuahua",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/share-thumbnail.webp",
        width: 1200,
        height: 1200,
        alt: "IMPLAN Chihuahua",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IMPLAN Chihuahua",
    description: "El IMPLAN es un organismo descentralizado de la administración pública municipal de Chihuahua, Chihuahua.",
    images: ["/share-thumbnail.webp"],
  },
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
    <html lang="es-MX" className={montserrat.variable}>
      <head>
        {/* Google Material Icons */}
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        {/* The toolbar uses Material Symbols ligatures for its accessibility icons. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,500,0,0&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){function c2k(s){return s.replace(/([A-Z])/g,function(m){return '-'+m.toLowerCase()})}try{var s=JSON.parse(localStorage.getItem("a11y-toolbar"));if(s&&s.settings){s.settings.readableFont=false;localStorage.setItem("a11y-toolbar",JSON.stringify(s));var h=document.documentElement;Object.keys(s.settings).forEach(function(k){if(s.settings[k])h.setAttribute('data-a11y-'+c2k(k),'')});if(s.fontSize&&s.fontSize!==1)h.style.fontSize=s.fontSize*100+'%'}}catch(e){}})()`,
          }}
        />
      </head>
      <body style={{ minHeight: '100vh', margin: 0, display: 'flex', flexDirection: 'column' }}>
        <AccessibilityTools>
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
        </AccessibilityTools>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GTAG_ID} />
    </html >
  );
}
