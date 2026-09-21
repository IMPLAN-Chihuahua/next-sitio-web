import type { SxProps, Theme } from '@mui/material';

export const getTileCardSx = (inactive = false) => ({
  bgcolor: inactive ? '#fafafa' : '#fff',
  borderColor: inactive ? '#D9DDE3' : 'divider',
  borderRadius: 1,
  borderStyle: inactive ? 'dashed' : 'solid',
  transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
  ...(!inactive && {
    '&:hover': {
      transform: 'translateY(-2px)',
      borderColor: 'secondary.main',
      boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
    },
  }),
} satisfies SxProps<Theme>);
