import {useState} from 'react'
import { generate } from 'generate-password'

const Password = () => {
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

    return (
        <div>
            <h3>Password Generator</h3>
           <input type="text" disabled value={password} /><br />
           <input type="range" value={lenght} onChange={handleLenghtChange}/><span>Lenght: {lenght}</span><br />
           <input type="checkbox" name="numbers" checked={numbers} onChange={handleCheck} disabled={!symbols && !lowercase && !uppercase}/>
           <input type="checkbox" name="symbols" checked={symbols} onChange={handleCheck} disabled={!numbers && !lowercase && !uppercase}/>
           <input type="checkbox" name="lowerCase" checked={lowercase} onChange={handleCheck} disabled={!numbers && !symbols && !uppercase}/>
           <input type="checkbox" name="upperCase" checked={uppercase} onChange={handleCheck} disabled={!numbers && !symbols && !lowercase}/><br />
           <button onClick={() => generatePassword()}>Generate Random Password</button>
           <hr />
        </div>
    )
}

export default Password
