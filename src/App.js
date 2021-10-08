import {useState} from 'react'
import { useCookies } from 'react-cookie';
import {StatusContext} from './Context'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Home, Message} from './routes'


const App = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['email', 'name', 'provider'])
    const [status, setStatus] = useState({data:[], error:false, loading:false})

    return (
        <StatusContext.Provider value={{status, setStatus, cookies, setCookie, removeCookie}}>
            <Router>
                <Switch>
                    <Route path="/message/:id">
                        <Message/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </Router>
        </StatusContext.Provider>
    )
}

export default App
