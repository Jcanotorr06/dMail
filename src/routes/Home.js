import {Widget, Inbox} from '../components'
import { Box } from '@mui/material';

const Home = () => {
    return (
        <Box width="100%" component="main">
            <div style={{backgroundColor: "pink", width: "100%"}}>
                <Widget/>
            </div>
            <Inbox/>
        </Box>
    )
}

export default Home
