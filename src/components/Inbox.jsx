import {useContext} from 'react'
import { StatusContext } from '../Context'
import { Link } from 'react-router-dom'
import { Paper, Table, TableContainer, Stack, TableHead, TableRow, TableCell, styled, tableCellClasses, TableBody, Container, Typography } from '@mui/material'
import { ArrowForward, Error, Help, Loop } from '@mui/icons-material'

const Inbox = () => {
    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]:{
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
            fontSize: 18
        }
    }))

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

    const {status} = useContext(StatusContext)

    return (
        <Container maxWidth="md" style={{marginTop: '2rem', marginBottom: '2rem'}}>
            <Typography variant="h3" fontWeight="bold" textAlign="center" marginY={3}>Your Inbox</Typography>
            <TableContainer component={Paper} style={{borderRadius: '16px'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>From</StyledTableCell>
                            <StyledTableCell>Subject</StyledTableCell>
                            <StyledTableCell align="right">View</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            status.loading ? 
                                <StyledTableRow><StyledTableCell colSpan={3}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Loop/> 
                                        <Typography color="black" fontWeight="bold"> Loading...</Typography>
                                    </Stack>
                                </StyledTableCell></StyledTableRow>
                            :status.error ? 
                                <StyledTableRow><StyledTableCell colSpan={3}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Error color="error" /> 
                                        <Typography color="red" fontWeight="bold"> An Error Ocurred</Typography>
                                    </Stack>
                                </StyledTableCell></StyledTableRow>
                            :status.data.length > 0 ? 
                            status.data.map((data, i) => (
                                <StyledTableRow key={i}>
                                    <StyledTableCell align="left"><Typography fontWeight="bold">{data.from}</Typography></StyledTableCell>
                                    <StyledTableCell align="left">{data.subject}</StyledTableCell>
                                    <StyledTableCell align="right"><Link to={`/message/${data.id}`}><ArrowForward color="primary"/></Link></StyledTableCell>
                                </StyledTableRow>
                            )):
                                <StyledTableRow><StyledTableCell colSpan={3}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Help color="disabled"/>
                                        <Typography color="gray" fontWeight="bold">No emails found</Typography>
                                    </Stack>
                                </StyledTableCell></StyledTableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default Inbox
