import {useContext} from 'react'
import { StatusContext } from '../Context'
import { Link } from 'react-router-dom'

const Inbox = () => {
    const {status} = useContext(StatusContext)
    return (
        <div>
            {
                status.loading ? 'LOADING'
                : (status.error ? 'ERROR'
                : status.data.length >0 ? (
                    status.data.map(data => (
                        <div key={data.id}>
                            <hr />
                            <p>{data.from}</p>
                            <h5><Link to={`message/${data.id}`}>{data.subject}</Link></h5>
                            <p>{data.date}</p>
                            <hr />
                        </div>
                    ))
                ): 'Your Inbox is Empty'
                )
            }
        </div>
    )
}

export default Inbox
