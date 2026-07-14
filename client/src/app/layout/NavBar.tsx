import { useState } from "react";
import { Group, Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar, Box, CircularProgress, Container, IconButton, LinearProgress, Menu,
  MenuItem, Toolbar, Typography, useMediaQuery, useTheme
} from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "./shared/componnents/MenuItemLink";
import { useStore } from "../../lib/hooks/useStore";
import { Observer } from "mobx-react-lite";
import { useAccount } from "../../lib/hooks/useAccount";
import UserMenu from "./UserMenu";

export default function NavBar() {
  const { uiStore } = useStore();
  const { currentUser } = useAccount();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);


  const navLinks = [
    <MenuItemLink key="activities" to='/activities' onClick={handleMenuClose}>Activities</MenuItemLink>,
    <MenuItemLink key="counter" to='/counter' onClick={handleMenuClose}>Counter</MenuItemLink>,
    <MenuItemLink key="errors" to='/errors' onClick={handleMenuClose}>Errors</MenuItemLink>
  ];


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundImage: 'linear-gradient(135deg, #182a73 0%,#218aae 69%, #20a7ac 89%)' }}>
        <Container maxWidth='xl'>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <MenuItem component={NavLink} to='/' sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Group fontSize="large" />
                <Typography variant="h5" fontWeight='bold' component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                  Reactivities
                </Typography>
                <Observer>
                  {() => uiStore.isLoading ? (
                    <CircularProgress
                      size={20}
                      thickness={7}
                      sx={{ color:'white' , position:'absolute' , top:'30%' , left:'105%'} }
                    />
                  ) : null}
                </Observer>
              </MenuItem>
            </Box>

            {/* Liens desktop */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 3 }}>
                {navLinks}
              </Box>
            )}

            {/* Menu burger mobile */}
            {isMobile && (
              <>
                <IconButton color="inherit" onClick={handleMenuOpen}>
                  <MenuIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                  {navLinks}
                </Menu>
              </>
            )}

            <Box display='flex' alignItems='center' gap={1}>
              {currentUser ? (
                <UserMenu />
              ) : (
                <>
                  <MenuItemLink to='/login'>Login</MenuItemLink>
                  <MenuItemLink to='/register'>Register</MenuItemLink>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}