import {useContext, useEffect} from 'react'
import { StatusContext } from '../Context'
import axios from 'axios'

const Widget = () => {
    const {setStatus, cookies, setCookie} = useContext(StatusContext)
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
    }, [cookies.name, cookies.provider, setStatus])

    return (
        <div>
            {cookies.email && (
                <>
                    <h1>{cookies.email}</h1>
                </>
            )}
        </div>
    )
}

export default Widget
