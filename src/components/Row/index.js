import {useState}from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DetailsPage from '../DetailsPage';

const Row = (props) => {
    const { row } = props;
    const [open, setOpen] = useState(false);
  
    return (
      <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell align="center">
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                    >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell align="left" component="th" scope="row">
                {row?.network?.name ?? row?.webChannel?.name}
            </TableCell>
            <TableCell align="left">
                {row?.name}
            </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                        <DetailsPage row={row}/>
                    </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
export default Row;