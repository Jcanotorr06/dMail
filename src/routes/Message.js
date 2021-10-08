import {useEffect, useState, useContext} from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { StatusContext } from '../Context'
import { Link } from 'react-router-dom'
const Message = () => {
    const [status, setStatus] = useState({
        message: {body:null, date: null, from: null, htmlBody: null, id: null, subject: null, textBody:null, attachments: []},
        error: false,
        loading: false
    })
    const {id} = useParams()
    const {cookies:{name, provider}} = useContext(StatusContext)

    useEffect(() => {
        const getMessage = async() => {
            setStatus(status => ({message: status.message, error: false, loading: true}))
            await axios.get(`https://www.1secmail.com/api/v1/?action=readMessage&login=${name}&domain=${provider}&id=${id}`)
            .then(res => {
                setStatus({message: res.data, error: false, loading: false})
            })
            .catch(err => {
                setStatus(status =>({message: status.message, error: true, loading: false}))
                console.log(err)
            })
        }
        getMessage()
    }, [id, name, provider])

    return (
        <div>
            <Link to="/">Back</Link>
            {status.loading && (
                <h1>Loading</h1>
            )}
            {
                status.error && (
                    <h1>Error</h1>
                )
            }
            {
                status.message && (
                    <div>
                        <h1>{status.message.subject}</h1>
                        <h3>From: {status.message.from}</h3>
                        <span>Date: {status.message.date}</span>
                        <p>{status.message.textBody}</p>
                    </div>
                )
            }
        </div>
    )
}

export default Message
