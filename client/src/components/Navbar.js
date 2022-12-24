import React from 'react';
import '../scss/Navbar.scss';
import {Container, AppBar, Toolbar, Typography, Stack, Button, Menu, MenuItem, Divider, Avatar } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';

const Navbar = (props) => {
    const [userMenu, setUserMenu] = useState(null);

    function handleOpenUserMenu(e) {
        setUserMenu(e.currentTarget);
    }

    function handleCloseUserMenu(e) {
        setUserMenu(null);
    }

    return(
        <AppBar position='static'>
            <Container maxWidth='lg'>
                <Toolbar 
                    disableGutters
                    className='navbar-toolbar'
                >
                    <Typography
                        variant='h5'
                        component='a'
                        href='/'
                        className='navbar-blogname'
                    >
                        Blog
                    </Typography>
                    <Stack
                        direction='row'
                        divider={
                            <Divider 
                                orientation='vertical' flexItem
                            />
                        }
                        spacing={3}
                    >
                        <Button
                            href='/'
                            className='navbar-button'
                        >홈</Button>
                        <Button
                            href='/write'
                            className='navbar-button'
                        >새 글 쓰기</Button>
                        <Button
                            href='/profile'
                            className='navbar-button'
                        >마이페이지</Button>
                    </Stack>

                    <Stack 
                        direction='row' 
                    >
                        <Button
                            onClick={handleOpenUserMenu}
                            startIcon={
                                <Avatar/>
                            }
                            endIcon={<KeyboardArrowDownIcon />}
                            className='navbar-button'
                        >
                            {
                                props.user.name ?
                                (
                                        <div className='user-name-box'>
                                            {props.user?.name}
                                        </div>
                                )
                                :
                                (
                                    <Typography>
                                        Name Loading..
                                    </Typography>
                                )
                            }
                            
                            
                        </Button>
                    </Stack>
                    <Menu 
                        anchorEl={userMenu}
                        open={Boolean(userMenu)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem>로그아웃</MenuItem>
                    </Menu>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar