import {useContext, useEffect} from 'react'
import { StatusContext } from '../Context'
import {Box, Container, Fab, Stack, Tooltip, Typography} from '@mui/material'
import {Cached, FileCopy} from '@mui/icons-material'
import axios from 'axios'

const Widget = () => {
    const {setStatus, cookies, setCookie, removeCookie} = useContext(StatusContext)
    useEffect(() => {
        if(!cookies.email){
            const getEmail = async() => {
                await axios.get('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1')
                .then(res =>{
                    setCookie('email', res.data[0])
                    setCookie('name', res.data[0].split('@')[0])
                    setCookie('provider', res.data[0].split('@')[1])
                })
                .catch(err => {
                    console.log(err)
                })
            }
            getEmail()
        }
    }, [cookies, setCookie])

    useEffect(() => {
        const interval = setInterval(() => {
            setStatus(status => ({data: status.data, error:false, loading: true}))
            if(cookies.name && cookies.provider){
                const fetchMessages = async () => {
                    await axios.get(`https://www.1secmail.com/api/v1/?action=getMessages&login=${cookies.name}&domain=${cookies.provider}`)
                    .then(res => {
                        setStatus({data: res.data, error: false, loading: false})
                    })
                    .catch(err => {
                        setStatus({data: null, error: true, loading: false})
                        console.log(err)
                    })
                }
                fetchMessages()
            }
        }, 10000)
        return() => clearInterval(interval)
    }, [cookies, setStatus])

    const handleCopy = () => {
        navigator.clipboard.writeText(cookies.email)
    }

    const handleRemove = () => {
        removeCookie("email")
    }

    return (
        <Container component="section">
            <Box display="flex" flexDirection="column" alignItems="center">
                    <Box paddingX={6} paddingY={4} textAlign="center" border="1px dashed black" width={{xs:'90%', md:'75%', lg:'50%'}} marginTop={8} aria-label="email address widget">
                        <Typography fontFamily="monospace">Your disposable Email address: </Typography>
                        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" marginY={2}>
                            <Box>
                                <Typography variant="h4" fontWeight="bold">
                                    {cookies.email ? cookies.email : 'Loading...'}
                                </Typography>
                            </Box>
                            <Tooltip title="Copy to clipboard" placement="top" arrow>
                                <Fab color="primary" onClick={() => handleCopy()} aria-label="copy button"><FileCopy fontSize="small"/></Fab>
                            </Tooltip>
                            <Tooltip title="Generate new email" placement="top" arrow>
                                <Fab color="secondary" onClick={() => handleRemove()} aria-label="new email button"><Cached fontSize="small"/></Fab>
                            </Tooltip>
                        </Stack>
                    </Box>
                <Box padding={2} textAlign="center" width={{xs:'75%', md:'50%', lg:'40%'}}>
                    <Typography variant="caption" fontFamily="monospace" aria-label="description">
                        Forget about spam, advertising mailings, hacking and attacking robots. Keep your real mailbox clean and secure. Temp Mail provides temporary, secure, anonymous, free, disposable email address.
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
}

export default Widget
