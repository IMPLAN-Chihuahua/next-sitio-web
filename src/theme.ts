'use client';

import { createTheme, ThemeOptions } from "@mui/material"
import { blue } from "@mui/material/colors";
import { Montserrat } from 'next/font/google';
import { esES } from '@mui/x-data-grid/locales'

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
});


// Obtener colores de 50-900 https://m2.material.io/inline-tools/color/
const theme = createTheme({
  typography: {
    fontFamily: montserrat.style.fontFamily,
    allVariants: {
      color: '#202022',
      fontFamily: montserrat.style.fontFamily,
    }
  },

  palette: {
    background: {
      default: '#fcfcfd'
    },
    secondary: {
      main: '#e3a74d',
      '50': '#fdfcea',
      '100': '#faf7cb',
      '200': '#f7f1aa',
      '300': '#f5ec8c',
      '400': '#f2e775',
      '500': '#f0e263',
      '600': '#eed25e',
      '700': '#e9bd56',
      '800': '#e3a74d',
      '900': '#d9843f'

    },
    primary: {
      main: '#606062',
      '50': '#fafafc',
      '100': '#f4f4f7',
      '200': '#ededf0',
      '300': '#dfdfe1',
      '400': '#bcbcbe',
      '500': '#9d9d9f',
      '600': '#747476',
      '700': '#606062',
      '800': '#414143',
      '900': '#202022',
    }
  },
  components: {
    MuiLink: {
      defaultProps: {
        color: blue[900]
      }
    },
    MuiToolbar: {
      styleOverrides: {
        dense: {
          minHeight: 80,
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: (options: any) => ({
          backgroundColor: options.theme.palette.primary.light
        })
      }
    },

  }
},
  esES
)


export default theme;