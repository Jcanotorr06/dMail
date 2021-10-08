import {useContext} from 'react'
import { StatusContext } from '../Context'
const Buttons = () => {
    const {removeCookie} = useContext(StatusContext)
    const handleRemove = () => {
        removeCookie("email")
    }
    return (
        <div>
            <button onClick={() => handleRemove()}>Change Email</button>
        </div>
    )
}

export default Buttons
