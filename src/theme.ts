'use client';

import { createTheme } from "@mui/material"


// Obtener colores de 50-900 https://m2.material.io/inline-tools/color/
const theme = createTheme({

  typography: {
    fontFamily: 'var(--font-montserrat)',
    allVariants: {
      color: '#202022'
    }
  },
  palette: {
    background: {
      default: '#fafafc'
    },
    primary: {
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
    secondary: {
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
  }
})


export default theme;