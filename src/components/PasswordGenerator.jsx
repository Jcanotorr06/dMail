import {useState, useEffect} from 'react'
import { generate } from 'generate-password'
import {Box, Checkbox, Container, FormControlLabel, FormGroup, Grid, IconButton, Slider, Stack, TextField, Tooltip, Typography} from '@mui/material'
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
        <Container maxWidth="md" component="section" aria-label="password generator">
            <Box textAlign="center" marginTop={5} marginBottom={3}>
                <Typography variant="subtitle1" fontWeight={800} color="red">Random Password Generator</Typography>
                <Typography variant="h3" aria-label="headline">Generate a secure password</Typography>
                <Typography variant="caption" aria-label="description">Use our online password generator to instantly create a secure, random password</Typography>
            </Box>
            <Stack direction="row" spacing={3} justifyContent="space-around">
                <TextField disabled value={password} fullWidth aria-label="password"/>
                <Tooltip title="Copy to clipboard" placement="top">
                    <IconButton onClick={() => handleCopy()} color="primary" aria-label="copy to clipboard"><FileCopy/></IconButton>
                </Tooltip>
                <Tooltip title="Generate Password" placement="top">
                    <IconButton onClick={() => generatePassword()} color="secondary" aria-label="generate new password"><Cached/></IconButton>
                </Tooltip>
            </Stack>
            <Grid container spacing={2} marginY={3}>
                <Grid item xs={12} md={8}>
                    <Stack direction="row" spacing={3} marginY={3} alignItems="center" aria-label="password lenght inputs">
                        <TextField type="number" value={lenght} onChange={handleLenghtChange} aria-label="password lenght input" />
                        <Slider size="medium" onChange={handleLenghtChange} value={lenght} valueLabelDisplay="auto" aria-label="password lenght slider" min={8} max={50} />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormGroup aria-label="password options">
                        <FormControlLabel control={<Checkbox checked={numbers} name="numbers" onChange={handleCheck} disabled={!symbols && !lowercase && !uppercase}/>} label="Numbers" />
                        <FormControlLabel control={<Checkbox checked={symbols} name="symbols" onChange={handleCheck} disabled={!numbers && !lowercase && !uppercase}/>} label="Symbols" />
                        <FormControlLabel control={<Checkbox checked={lowercase} name="lowerCase" onChange={handleCheck} disabled={!numbers && !symbols && !uppercase}/>} label="Lower Case" />
                        <FormControlLabel control={<Checkbox checked={uppercase} name="upperCase" onChange={handleCheck} disabled={!numbers && !symbols && !lowercase}/>} label="Upper Case" />
                    </FormGroup>
                </Grid>
            </Grid>
        </Container>
    )
}

export default PasswordGenerator
