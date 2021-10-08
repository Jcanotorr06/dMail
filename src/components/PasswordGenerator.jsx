import {useState, useEffect} from 'react'
import { generate } from 'generate-password'
import {Box, Container, Grid, IconButton, Slider, Stack, TextField, Tooltip, Typography} from '@mui/material'
import {Cached, FileCopy} from '@mui/icons-material'
const PasswordGenerator = () => {
    const [password, setPassword] = useState('')
    const [lenght, setLenght] = useState(10)
    const [numbers, setNumbers] = useState(false)
    const [symbols, setSymbols] = useState(false)
    const [lowercase, setLowercase] = useState(true)
    const [uppercase, setUppercase] = useState(true)

    const generatePassword = () => {
        setPassword(generate({
            length: lenght,
            numbers: numbers,
            symbols: symbols,
            lowercase: lowercase,
            uppercase: uppercase
        }))
    }

    const handleLenghtChange = (e) => {
        setLenght(e.target.value)
        generatePassword()
    }

    const handleCheck = (e) => {
        let name = e.target.name
        let checked = e.target.checked
        if(name === 'numbers'){
            setNumbers(checked)
        }
        else if(name === 'symbols'){
            setSymbols(checked)
        }
        else if(name === 'lowerCase'){
            setLowercase(checked)
        }
        else if(name === 'upperCase'){
            setUppercase(checked)
        }
    }

    const handleCopy = () =>{
        navigator.clipboard.writeText(password)
    }

    useEffect(() => {
        generatePassword()
    }, [])

    return (
        <Container maxWidth="md">
            <Box textAlign="center" marginTop={5} marginBottom={3}>
                <Typography variant="subtitle1" fontWeight={800} color="red">Random Password Generator</Typography>
                <Typography variant="h3">Generate a secure password</Typography>
                <Typography variant="caption">Use our online password generator to instantly create a secure, random password</Typography>
            </Box>
            <Stack direction="row" spacing={3} justifyContent="space-around">
                <TextField disabled value={password} fullWidth />
                <Tooltip title="Copy to clipboard" placement="top">
                    <IconButton onClick={() => handleCopy()} color="primary"><FileCopy/></IconButton>
                </Tooltip>
                <Tooltip title="Generate Password" placement="top">
                    <IconButton onClick={() => generatePassword()} color="secondary"><Cached/></IconButton>
                </Tooltip>
            </Stack>
            <Grid container spacing={2} marginY={3}>
                <Grid item xs={12} md={6}>
                    <Stack direction="row" spacing={3} marginY={3} alignItems="center">
                        <TextField type="number" value={lenght} onChange={handleLenghtChange} />
                        <Slider size="medium" onChange={handleLenghtChange} value={lenght} valueLabelDisplay="auto" aria-label="password lenght" min={8} max={50} />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack spacing={2} direction={{xs: 'row', md:"column"}} justifyContent={{xs:'center', md:'initial'}}>
                        <Stack spacing={1} direction={{xs: 'column', md:'row'}} alignItems="center">
                            <input type="checkbox" name="numbers" checked={numbers} onChange={handleCheck} disabled={!symbols && !lowercase && !uppercase}/>
                            <label htmlFor="numbers">numbers</label>
                        </Stack>
                        <Stack spacing={1} direction={{xs: 'column', md:'row'}} alignItems="center">
                            <input type="checkbox" name="symbols" checked={symbols} onChange={handleCheck} disabled={!numbers && !lowercase && !uppercase}/>
                            <label htmlFor="numbers">symbols</label> 
                        </Stack>
                        <Stack spacing={1} direction={{xs: 'column', md:'row'}} alignItems="center">
                            <input type="checkbox" name="lowerCase" checked={lowercase} onChange={handleCheck} disabled={!numbers && !symbols && !uppercase}/>
                            <label htmlFor="numbers">lowerCase</label> 
                        </Stack>
                        <Stack spacing={1} direction={{xs: 'column', md:'row'}} alignItems="center">
                            <input type="checkbox" name="upperCase" checked={uppercase} onChange={handleCheck} disabled={!numbers && !symbols && !lowercase}/><br />
                            <label htmlFor="numbers">upperCase</label> 
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    )
}

export default PasswordGenerator
