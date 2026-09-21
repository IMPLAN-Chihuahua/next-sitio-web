'use client'

import { Button, styled, ButtonProps, Link, LinkProps } from "@mui/material"
import { ReactNode } from "react"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Launch } from "@mui/icons-material";
import NorthEastIcon from '@mui/icons-material/NorthEast';


const VerMasButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
    textTransform: 'none',
    fontSize: '1.1rem',
    boxShadow: 'none',
}))


const VerMasButton = (props: ButtonProps & LinkProps & { children: ReactNode }) => {
    const { children, ...more } = props;

    return (<VerMasButtonStyled
        {...more}
        variant="text"
        disableTouchRipple
        sx={{
            color: 'primary.800'
        }}
        LinkComponent={Link}
        endIcon={<Launch />}
    >
        {props.children}
    </VerMasButtonStyled>)
}

export default VerMasButton;