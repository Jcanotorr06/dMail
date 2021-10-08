import {Box, Button, Container, Stack} from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

const NavBar = () => {

    const path = useLocation()

    return (
        <Box boxShadow={2} width="100%" >
            <Container>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <h1>dMail</h1>
                    <Stack direction="row" spacing={3}>
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
