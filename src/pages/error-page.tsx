import { Link } from 'react-router';
import { Typography, Button, Container } from '@mui/material';

const ErrorPage = () => {
  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h1" component="h1" sx={{ fontSize: '10rem', fontWeight: 'bold' }}>
        404
      </Typography>
      <Typography variant="h5" component="h2" sx={{ mt: 2, mb: 3 }}>
        Oops! This Page Could Not Be Found
      </Typography>
      <Typography variant="body1" component="p" sx={{ mb: 3 }}>
        Sorry but the page you are looking for does not exist, have been removed, name changed or is
        temporarily unavailable.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Go to Homepage
      </Button>
    </Container>
  );
};

export default ErrorPage;
