import {useState}from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { getCurrentHour, getTimeRanges } from '../../utils/common';
import { headerNames } from '../../utils/constants';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function NavBar({ viewShowsForDifferentTimeCallback, searchResultsCallback }) {
    const [rangeCode, setRangeCode] = useState(getCurrentHour());
    const filterShowsByTime = (event) => {
        setRangeCode(event.target.value);
        viewShowsForDifferentTimeCallback(event.target.value);
    }

    const searchShowsAndChannel = (event) => {
      searchResultsCallback(event.target.value)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar style={{backgroundColor: "#2d2d2d"}}>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    {headerNames?.APPNAME}
                </Typography>
                <FormControl sx={{ m: 1, minWidth: 160}} variant="standard" size="small">
                    <InputLabel sx={{color: "white"}}>Filter Shows by Time</InputLabel>
                    <Select
                        value={rangeCode}
                        sx={{
                          color: "white",
                          '.MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                          },
                          '.MuiSvgIcon-root ': {
                            fill: "white !important",
                          }
                        }}
                        onChange={filterShowsByTime}
                    >
                        {
                            getTimeRanges().map((range, index) => <MenuItem key={`range${index}`} value={range.code}>{range.value}</MenuItem>)
                        }
                    </Select>
                    </FormControl>
                <Search>
                    <SearchIconWrapper>
                    <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search...."
                      inputProps={{ 'aria-label': 'search' }}
                      onChange={searchShowsAndChannel}
                    />
                </Search>
                </Toolbar>
            </AppBar>
        </Box>
    );
}