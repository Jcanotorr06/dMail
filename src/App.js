import {lazy, Suspense, useState} from 'react'
import { useCookies } from 'react-cookie';
import {StatusContext} from './Context'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
/* import {Home, Message, Password} from './routes' */
import { NavBar, Footer } from './components';
import { CircularProgress, Stack } from '@mui/material';
const Home = lazy(() => import('./routes/Home'))
const Message = lazy(() => import('./routes/Message'))
const Password = lazy(() => import('./routes/Password'))


const App = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['email', 'name', 'provider'])
    const [status, setStatus] = useState({data:[], error:false, loading:false})

    return (
        <StatusContext.Provider value={{status, setStatus, cookies, setCookie, removeCookie}}>
            <Router>
                <Stack direction="column" alignItems="center" justifyContent="space-between" minHeight="100vh" width="100vw">
                    <NavBar/>
                    <Suspense fallback={<CircularProgress/>}>
                    <Switch>
                        <Route path="/message/:id">
                            <Message/>
                        </Route>
                        <Route path="/password">
                            <Password/>
                        </Route>
                        <Route exact path="/">
                            <Home/>
                        </Route>
                    </Switch>
                    </Suspense>
                    <Footer/>
                </Stack>
            </Router>
        </StatusContext.Provider>
    )
}

export default App
