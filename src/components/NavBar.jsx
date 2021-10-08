import {Box, Button, Container, Stack} from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

const NavBar = () => {

    const path = useLocation()

    return (
        <Box boxShadow={2} width="100%" component="header" aria-label="header">
            <Container component="nav" aria-label="nav bar">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <h1 aria-label="page name">dMail</h1>
                    <Stack direction="row" spacing={3} aria-label="page routes">
                        <Link to="/">
                            <Button variant={path.pathname === '/' ? 'contained' : 'outlined'}>Disposable Email</Button>
                        </Link>
                        <Link to="/password">
                            <Button variant={path.pathname === '/password' ? 'contained' : 'outlined'}>Password Generator</Button>
                        </Link>
                    </Stack>
                </Box>
            </Container>
        </Box>
    )
}

export default NavBar
