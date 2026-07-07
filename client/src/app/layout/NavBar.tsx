import { Group } from "@mui/icons-material";
import { AppBar, Box, Container, LinearProgress, MenuItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "./shared/componnents/MenuItemLink";
import { useStore } from "../../lib/hooks/useStore";
import { Observer } from "mobx-react-lite";


export default function NavBar() {
  const { uiStore } = useStore();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundImage: 'linear-gradient(135deg, #182a73 0%,#218aae 69%, #20a7ac 89%)', position:'relative' }}>
        <Container maxWidth='xl'>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box >
              <MenuItem component={NavLink} to='/' sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Group fontSize="large" />
                <Typography variant="h5" fontWeight='bold' component="div">Reactivities</Typography>
              </MenuItem>
            </Box>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <MenuItemLink to='/activities'  >
                Activities
              </MenuItemLink>
              <MenuItemLink to='/createActivity'>
                Create Activity
              </MenuItemLink>
              <MenuItemLink to='/counter'>
                Counter
              </MenuItemLink>
              <MenuItemLink to='/errors'>
                Errors
              </MenuItemLink>
            </Box>
            <MenuItem>
              User Menu
            </MenuItem>
          </Toolbar>
        </Container>
        <Observer>
          {() => uiStore.isLoading ? (
            <LinearProgress
              color="secondary"
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 4
              }}
            />
          ) : null}
        </Observer>

      </AppBar>
    </Box>
  )
}