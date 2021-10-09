import React from 'react'
import { Box, Container, IconButton, Stack, Typography } from '@mui/material';
import { GitHub } from '@mui/icons-material';

const Footer = () => {
    return (
        <Box width="100%" marginTop="auto" bottom={0} paddingY={3} boxShadow={4} component="footer" aria-label="footer">
            <Container component="nav">
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography aria-label="credits">dMail - Designed and created by Joseph Cano</Typography>
                    <IconButton aria-label="github repository" href="https://github.com/Jcanotorr06/dMail" rel="noreferrer" target="_blank">
                        <GitHub/>
                    </IconButton>
                </Stack>
            </Container>
        </Box>
    )
}

export default Footer
