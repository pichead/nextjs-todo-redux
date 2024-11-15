"use client"
import * as React from 'react';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import AccountCircle from '@mui/icons-material/AccountCircle';

import MoreIcon from '@mui/icons-material/MoreVert';

import Link from 'next/link'
import { ENV } from '@/utils/constants';





function Navbar() {
    const AppName = ENV.appName
    const menu = [
        {
            name: "Task",
            route: "/task"
        },
        {
            name: "Dashboard",
            route: "/dashboard"
        },
    ]

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <React.Fragment>
                {menu.map((m, i: number) => (
                    <MenuItem key={"menu_m_" + i}>
                        <Link href={m.route} className='self-center mx-3 hover:cursor-pointer' >
                            {m.name}
                        </Link>
                    </MenuItem>
                ))}
            </React.Fragment>
        </Menu>
    );


    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <div className=' fixed bg-violet-700 my-auto w-full z-10' >
                    <Toolbar className='flex justify-between'>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                        >
                            {AppName}
                        </Typography>

                        <Box sx={{ display: { xs: 'none', md: "flex" } }}>
                            <React.Fragment>
                                {menu.map((m, i: number) => (
                                    <React.Fragment key={"menu_" + i}>
                                        <Link href={m.route} className='self-center mx-3 hover:cursor-pointer' >
                                            {m.name}
                                        </Link>
                                    </React.Fragment>
                                ))}
                            </React.Fragment>

                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </div>
                {renderMobileMenu}
                {renderMenu}
            </Box>
        </React.Fragment >

    )

}

export default Navbar