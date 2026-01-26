'use client'

import { AppBar, Box, Button, Collapse, Container, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem, Toolbar, Typography, useMediaQuery } from "@mui/material";
import { Link as MuiLink } from "@mui/material";
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
    label: '¿Qué hacemos?',
    href: '/que-hacemos',
  }, {
    label: 'Consejo',
    href: '/consejo',
  }]
},
{
  label: 'Instrumentos de planeación',
  href: '/instrumentos-planeacion',
  menuItems: []
},
{
  label: 'Cartografía',
  href: '/cartografia',
  menuItems: []
},
{
  label: 'Estudios y proyectos',
  href: '/estudios-y-proyectos',
  menuItems: []
},
{
  label: 'Transparencia',
  href: '/transparencia',
  menuItems: [{
    label: 'Licitaciones',
    href: '/licitaciones'
  }, {
    label: 'Rendición de cuentas',
    href: '/rendicion-cuentas'
  }]
}]


export default function Navbar() {

  return (
    <Box position='relative'>
      <DesktopNavbar />

    </Box >
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
        alt=''
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
    <nav>
      <IconButton
        size="large"
        onClick={handleOpen}
        sx={{
          display: { xs: 'block', md: 'none' }
        }}>
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
        textAlign: { xs: 'left', md: 'center' },
        textDecoration: 'none',
        textTransform: 'none',
        fontWeight: 600,
        fontSize: 16,
      }}
      href={href}>
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
        aria-haspopup={true}
        aria-expanded={open ? 'true' : undefined}
        color="inherit"
        disableTouchRipple
        sx={{
          fontSize: 16,
          textDecoration: 'none',
          textTransform: 'none',
          fontWeight: 600
        }}
        onClick={handleClick}
        endIcon={<ExpandMoreIcon />}>
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
            'aria-labelledby': `${menuFor}-button`
          }
        }}
      >
        {menuItems.map((item, idx) => (
          <MenuItem key={`${menuId}-${idx}`} >
            <MuiLink
              sx={{
                textDecoration: 'none',
                textTransform: 'none',
                fontWeight: 500,
                textAlign: 'left',
                minWidth: '120px'
              }}
              color='inherit'
              component={Link}
              onClick={handleClose}
              href={item.href}
            >
              {item.label}
            </MuiLink>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}