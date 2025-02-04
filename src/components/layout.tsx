import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { Link } from 'react-router';
import { Outlet } from 'react-router';

const Layout = () => {
    return (
        <Box>
            <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
                <Toolbar>
                    <Typography 
                        variant="h6" 
                        component={Link} 
                        to="/" 
                        sx={{ textDecoration: 'none', color: 'white' }}
                    >
                        Home
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md" sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Outlet />
            </Container>
        </Box>
    );
};

export default Layout;
