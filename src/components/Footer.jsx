import React from 'react'
import { Box, Container, IconButton, Stack, Typography } from '@mui/material';
import { GitHub } from '@mui/icons-material';

const Footer = () => {
    return (
        <Box width="100%" marginTop="auto" bottom={0} paddingY={2} boxShadow={4} >
            <Container>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography>dMail by Joseph Cano</Typography>
                    <IconButton href="https://github.com/Jcanotorr06/dMail" target="_blank" color="info">
                        <GitHub/>
                    </IconButton>
                </Stack>
            </Container>
        </Box>
    )
}

export default Footer
