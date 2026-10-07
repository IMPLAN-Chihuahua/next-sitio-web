'use client';

import { createTheme, responsiveFontSizes } from "@mui/material"
import { blue } from "@mui/material/colors";
import { Montserrat } from 'next/font/google';
import { esES } from '@mui/x-data-grid/locales'

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
});


// Obtener colores de 50-900 https://m2.material.io/inline-tools/color/
const _theme = createTheme({
  typography: {
    fontFamily: montserrat.style.fontFamily,
    h1: {
      fontSize: '2.6rem',
      fontWeight: 700,
      lineHeight: 1.4,
    },
    h2: {
      fontSize: '2.1rem',
      fontWeight: 600,
      lineHeight: 1.2
    },
    h3: {
      fontSize: '1.6rem',
      fontWeight: 500,
      lineHeight: 1.2
    },
    h4: {
      fontSize: '1.4rem',
      fontWeight: 500,
      lineHeight: 1.2
    },
    h5: {
      fontSize: '1.3rem',
      fontWeight: 500,
      color: '#414143',
      lineHeight: 1.2
    },
    h6: {
      fontSize: '1.1rem',
      lineHeight: 1.2
    },
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
    MuiButton: {
      styleOverrides: {
        root: {
          variants: [{
            props: { variant: 'outlined' },
            style: {
              color: '#414143'
            }
          }]
        }
      }
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&:focus-visible': {
            outline: '3px solid #e3a74d',
            outlineOffset: '2px',
          },
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          '&:focus-visible': {
            outline: '3px solid #e3a74d',
            outlineOffset: '2px',
            borderRadius: '2px',
          },
        },
      },
      defaultProps: {
        color: blue[900],
        underline: 'always'
      }
    },
    MuiModal: {
      defaultProps: {
        disableScrollLock: true,
      }
    },
    MuiPopover: {
      defaultProps: {
        disableScrollLock: true,
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
        root: ({ theme }) => ({
          backgroundColor: theme.palette.primary.light
        })
      }
    },

  }
},
  esES
)

const theme = responsiveFontSizes(_theme);

export default theme;
