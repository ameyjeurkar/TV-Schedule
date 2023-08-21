import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Row from '../Row';
import { getScheduleRange } from '../../utils/common';
import { headerNames } from '../../utils/constants';
import { Typography } from '@mui/material';

const Schedule = (props) => {
    const { scheduleAPIResponse, timeRange, searchQuery } = props;

    return (
        <TableContainer component={Paper}>
            <Table stickyHeader  aria-label="TV Schedule">
                <TableHead sx={{
                    "& .MuiTableCell-head": {
                        color: "white",
                        backgroundColor: "#2d2d2d"
                    },
                }}>
                    <TableRow sx={{backgroundColor: "pink"}}>
                        <TableCell />
                        <TableCell align="left">
                            <Typography variant="h5" gutterBottom component="div">
                                {headerNames.CHANNEL}
                            </Typography>
                        </TableCell>
                        <TableCell align="left">
                            <Typography variant="h5" gutterBottom component="div">
                                {searchQuery ? headerNames.SHOW_NAME : getScheduleRange(timeRange)}
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    scheduleAPIResponse?.length ? scheduleAPIResponse?.map((row, index) => (
                            <Row key={`_index${index}`} row={row} />
                        )
                    ) : (
                        <TableRow>
                            <TableCell colSpan="3">
                                <Typography variant="h5" gutterBottom component="div" style={{display: "flex", justifyContent: "center"}}>
                                    {
                                        searchQuery ? headerNames.SHOWS_NOT_FOUND : headerNames.NO_SHOWS_AVAILABLE
                                    }
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )
                }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default Schedule;