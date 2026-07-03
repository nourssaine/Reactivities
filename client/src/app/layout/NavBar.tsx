import { Group } from "@mui/icons-material";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";

type Props ={
  openForm:() => void;
}

export default function NavBar({openForm}: Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundImage: 'linear-gradient(135deg, #182a73 0%,#218aae 69%, #20a7ac 89%)' }}>
        <Container maxWidth='xl'>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Group fontSize="large" />
              <Typography variant="h5" fontWeight='bold' component="div">Reactivities</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Button sx={{ fontSize: '1rem', textTransform: 'uppercase', fontWeight: 'bold', color:'white' }}>
                Activities
              </Button>
              <Button sx={{ fontSize: '1rem', textTransform: 'uppercase', fontWeight: 'bold', color:'white' }}>
                About
              </Button>
              <Button sx={{ fontSize: '1rem', textTransform: 'uppercase', fontWeight: 'bold', color:'white' }}>
                Contact
              </Button>
            </Box>
            <Button size="medium" variant="contained" color="warning" onClick={openForm}>
              Create activity</Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}