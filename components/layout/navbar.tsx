"use client"
import * as React from 'react';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import MoreIcon from '@mui/icons-material/MoreVert';

import Link from 'next/link'
import { ENV } from '@/utils/constants';





function Navbar() {
    const AppName = ENV.appName
    const menu = [
        {
            name: "Task",
            route: "/manage"
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
            {menu.map((m, i: number) => (
                <MenuItem key={"menu_m_" + i}>
                    <Link href={m.route} className='self-center mx-3 hover:cursor-pointer' >
                        {m.name}
                    </Link>
                </MenuItem>
            ))}
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
                            {menu.map((m, i: number) => (
                                <Link key={"menu_" + i} href={m.route} className='self-center mx-3 hover:cursor-pointer' >
                                    {m.name}
                                </Link>
                            ))}

                            {/* <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton> */}
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