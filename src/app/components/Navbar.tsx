'use client'

import { AppBar, Box, Button, Collapse, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem, Toolbar } from "@mui/material";
import Link from "next/link";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MouseEvent, ReactNode, useState } from "react";
import Image from "next/image";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { ExpandLess, ExpandMore } from "@mui/icons-material";


const navLinks = [{
  label: 'Nosotros',
  href: '/nosotros',
  menuItems: [{
    label: '¿Quiénes somos?',
    href: '/quienes-somos',
  }, {
    label: 'Consejo',
    href: '/consejo',
  }]
},
{
  label: 'Planeación',
  href: '/planeacion',
  menuItems: []
},
{
  label: 'Cartografía',
  href: '/cartografia',
  menuItems: []
},
{
  label: 'Estudios y propuestas',
  href: '/estudios-y-propuestas',
  menuItems: []
},
{
  label: 'Transparencia',
  href: '/transparencia',
  menuItems: []
}]


export default function Navbar() {

  return (
    <Box position='relative'>
      <DesktopNavbar />
    </Box>
  );
}



const ImplanImageLink = () => {
  return (
    <Box
      component={Link}
      href='/'
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}>
      <Image
        src='/implan.svg'
        width={80}
        height={50}
        alt='Volver al inicio - IMPLAN Chihuahua'
        draggable={false}
        style={{
          objectFit: 'contain',
          color: 'white',
          userSelect: 'none',
          pointerEvents: 'none'
        }}
      />

    </Box>
  )
}



const DesktopNavbar = () => {
  return (
    <CustomDesktopTopBar>
      <ImplanImageLink />
      <Box
        alignItems='center'
        columnGap={{ xs: 2, lg: 4 }}
        ml={{ md: 'auto' }}
        sx={{ display: { xs: 'none', md: 'flex' } }}
        color={'primary.50'}
      >
        {
          navLinks.map((item, idx) => item.menuItems.length > 0
            ? <NavbarMenu key={idx} label={item.label} menuItems={item.menuItems} href={item.href} />
            : <NavbarLinkButton key={idx} href={item.href} label={item.label} />
          )
        }

      </Box>
      <MobileDrawer />
    </CustomDesktopTopBar >
  )
}


const appBarStyle = {
  background: 'rgba(32, 32, 34, 0.75)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(7px)',
  WebkitBackdropFilter: 'blur(7px)',
}


const CustomDesktopTopBar = ({ children }: { children: ReactNode }) => {
  return (
    <AppBar
      component='nav'
      position="fixed"
      variant="outlined"
      sx={{
        ...appBarStyle,
      }}
    >
      <Toolbar variant="dense" sx={{ minHeight: 80, justifyContent: 'space-between' }}>
        {children}
      </Toolbar>
    </AppBar>
  )
}



const MobileDrawer = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <nav aria-label="Secciones del IMPLAN">
      <IconButton
        size="large"
        onClick={handleOpen}
        sx={{
          display: { xs: 'block', md: 'none' }
        }}
        aria-label="Abrir menú de navegación"
      >
        <MenuIcon sx={{
          color: 'primary.50', fontSize: 40
        }} />
      </IconButton>
      <Drawer
        variant='temporary'
        open={open}
        onClose={handleClose}
        ModalProps={{
          keepMounted: true
        }}
        slotProps={{
          paper: {
            sx: {
              bgcolor: 'primary.50'
            },
          }
        }}
        anchor='right'
        sx={{
          display: {
            xs: 'block',
            md: 'none'
          },
        }}
      >
        <IconButton
          size="large"
          onClick={handleClose}
          sx={{
            maxWidth: 'fit-content',
            ml: 'auto',
            mt: 1,
            mr: 1.3,
          }}>
          <CloseIcon sx={{ color: 'primary.900', fontSize: 40 }} />
        </IconButton>
        <Box width={275}>
          <List>
            {
              navLinks.map((item, idx) => (
                item.menuItems.length > 0 ? (
                  <NavbarNestedListItem
                    key={idx}
                    href={item.href}
                    label={item.label}
                    nestedItems={item.menuItems}
                    handleOnClick={handleClose}
                  />
                ) : (
                  <NavbarListItem
                    key={idx}
                    href={item.href}
                    label={item.label}
                    handleOnClick={handleClose}
                  />
                )
              ))
            }
          </List>
        </Box>
      </Drawer>
    </nav>
  )
}



const NavbarLinkButton = ({ href, label }: { href: string, label: string }) => {
  return (
    <Button
      color="inherit"
      component={Link}
      disableTouchRipple
      sx={{
        position: 'relative',
        textAlign: { xs: 'left', md: 'center' },
        textTransform: 'none',
        fontWeight: 600,
        fontSize: 16,
        px: 1.5,
        py: 1,
        borderRadius: 1,
        transition: 'background-color 160ms ease, color 160ms ease',
        '&::after': {
          content: '""',
          position: 'absolute',
          left: 12,
          right: 12,
          bottom: 4,
          height: 2,
          borderRadius: 999,
          backgroundColor: 'secondary.main',
          transform: 'scaleX(0)',
          transformOrigin: 'center',
          transition: 'transform 160ms ease',
        },
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
        },
        '&:hover::after': {
          transform: 'scaleX(1)',
        },
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: 'secondary.main',
          outlineOffset: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.10)',
        },
        '&:focus-visible::after': {
          transform: 'scaleX(1)',
        },
      }}
      href={href}
    >
      {label}
    </Button>
  )
}


const NavbarListItem = ({ href, label, handleOnClick }: { href: string, label: string, handleOnClick: () => void }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton disableTouchRipple LinkComponent={Link} href={href} onClick={handleOnClick} >
        <ListItemText
          slotProps={{
            primary: {
              fontWeight: 600
            }
          }}
          primary={label} />
      </ListItemButton>
    </ListItem>
  )
}



const NavbarNestedListItem = ({ label, nestedItems, href, handleOnClick }
  : { href: string, label: string, nestedItems: Array<{ label: string, href: string }>, handleOnClick: () => void }) => {

  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(pre => !pre);

  return <>
    <ListItemButton onClick={toggleOpen} disableTouchRipple>
      <ListItemText
        slotProps={{
          primary: {
            fontWeight: 600
          }
        }}
        primary={label} />
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={open}>
      <List component='div' disablePadding>
        {
          nestedItems.map((item, idx) => (
            <ListItemButton sx={{ pl: 4 }} disableTouchRipple LinkComponent={Link} href={item.href} key={idx} onClick={handleOnClick}>
              <ListItemText slotProps={{
                primary: {
                  fontWeight: 500
                }
              }} primary={item.label} />
            </ListItemButton>
          ))
        }
      </List>
    </Collapse>
  </>

}



const NavbarMenu = ({ label, menuItems, href }: { href: string, label: string, menuItems: Array<{ label: string, href: string }> }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => setAnchorEl(null);
  const menuFor = href.replace('/', '');
  const menuId = `${menuFor}-menu`;
  const buttonId = `${menuFor}-button`;

  return (
    <>
      <Button
        id={buttonId}
        aria-controls={open ? menuId : undefined}
        aria-haspopup="menu"
        aria-expanded={open ? 'true' : undefined}
        color="inherit"
        disableTouchRipple
        sx={{
          position: 'relative',
          fontSize: 16,
          textTransform: 'none',
          fontWeight: 600,
          px: 1.5,
          py: 1,
          borderRadius: 1,
          transition: 'background-color 160ms ease',

          '&::after': {
            content: '""',
            position: 'absolute',
            left: 12,
            right: 12,
            bottom: 4,
            height: 2,
            borderRadius: 999,
            backgroundColor: 'secondary.main',
            transform: open ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'center',
            transition: 'transform 160ms ease',
          },

          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          },

          '&:hover::after': {
            transform: 'scaleX(1)',
          },

          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'secondary.main',
            outlineOffset: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.10)',
          },

          '&:focus-visible::after': {
            transform: 'scaleX(1)',
          },

          '& .MuiButton-endIcon': {
            transition: 'transform 160ms ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          },
        }}
        onClick={handleClick}
        endIcon={<ExpandMoreIcon />}
      >
        {label}
      </Button>

      <Menu
        id={menuId}
        open={open}
        disableScrollLock
        anchorEl={anchorEl}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': buttonId,
          },
          paper: {
            sx: {
              mt: 1,
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider',
            },
          },
        }}
      >
        {menuItems.map((item, idx) => (
          <MenuItem
            key={`${menuId}-${idx}`}
            component={Link}
            href={item.href}
            onClick={handleClose}
            sx={{
              minWidth: 180,
              fontWeight: 500,
              textTransform: 'none',
              borderLeft: '3px solid transparent',

              '&:hover': {
                bgcolor: 'primary.100',
                borderLeftColor: 'secondary.main',
              },

              '&:focus-visible': {
                bgcolor: 'primary.100',
                borderLeftColor: 'secondary.main',
                outline: '2px solid',
                outlineColor: 'secondary.main',
                outlineOffset: -2,
              },
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}