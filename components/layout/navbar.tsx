"use client"
import * as React from 'react';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import MoreIcon from '@mui/icons-material/MoreVert';
import { ENV } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import BtnDanger from '../button/btn-danger';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import * as authAction from '@/store/slices/authSlice';
import { cookiesHandler } from '@/utils/cookies';

function Navbar() {

    const dispatch = useDispatch<AppDispatch>();

    const router = useRouter()

    const AppName = ENV.appName
    const menu = [
        {
            name: "Task",
            route: "/manage"
        },
        {
            name: "Dashboard",
            route: "/"
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

    const logout = async () => {
        cookiesHandler.remove(ENV.accessTokenName)
        await dispatch(authAction.logout())
        location.reload()
    }

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
                    <div onClick={() => routing(m.route)} className='self-center mx-3 hover:cursor-pointer' >
                        {m.name}
                    </div>
                </MenuItem>
            ))}
            <div className='flex justify-center'>
                <BtnDanger onClick={logout} name={"Logout"} />
            </div>

        </Menu>
    );

    const routing = (path: string) => {
        router.push(path)
    }





    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <div className=' fixed bg-violet-700 my-auto w-full z-10 text-white' >
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
                                <div key={"menu_" + i} className='self-center mx-3 hover:cursor-pointer' onClick={() => routing(m.route)}>
                                    {m.name}
                                </div>
                            ))}
                            <BtnDanger onClick={logout} name={"Logout"} />

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