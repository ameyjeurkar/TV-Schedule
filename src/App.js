import { useEffect, useState } from 'react';
import { useFetch } from './hooks/useFetch';
import { getAPIDetails } from './utils/requests';
import { headerNames } from './utils/constants';
import Schedule from './components/Schedule';
import NavBar from './components/NavBar';
import { CircularProgress, Typography } from '@mui/material';
import { getCurrentHour } from './utils/common';
import { useDispatch, useSelector } from 'react-redux';
import { filterScheduleToTime, filterShowsBySearchQuery } from './redux/slice/filteredScheduleSlice';
import './App.css';
import '../src/styles.css';

// https://api.tvmaze.com/schedule (US specific)
// https://api.tvmaze.com/schedule/web?date=2020-05-29&country=US
// https://api.tvmaze.com/schedule/full (don't use)
// https://api.tvmaze.com/search/shows?q=gameo search API

function App() {
  const { isLoading } = useFetch(process.env.REACT_APP_SCHEDULE_BASE_URL);
  const dispatch = useDispatch();
  const scheduleAPIResponse = useSelector((state)=> state.schedule);
  const filteredSchedule = useSelector((state)=> state.filteredSchedule);
  const [timeRange, setTimeRange] = useState(getCurrentHour());
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(filterScheduleToTime({scheduleAPIResponse, timeRange}));
  }, [timeRange, scheduleAPIResponse]);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchQuery && searchResultAPI();
    }, 500)
    return () => clearTimeout(timer);
  }, [searchQuery])

  const viewShowsForDifferentTimeCallback = (timeRangeCode) => {
    setTimeRange(timeRangeCode);
  }

  const searchResultsCallback = async (inputQuery) => {
    setSearchQuery(inputQuery);
  }

  const searchResultAPI = async () => {
    const searchedResults = await getAPIDetails(`${process.env.REACT_APP_SEARCH_API_BASE_URL}${searchQuery}`, { TYPE: "GET" });
    dispatch(filterShowsBySearchQuery({searchedResults}));
  }

  return (
    <div className="App">
      <NavBar viewShowsForDifferentTimeCallback={viewShowsForDifferentTimeCallback} searchResultsCallback={searchResultsCallback} />
      <div className="my-20">
        {
          isLoading ? (
            <CircularProgress color="secondary" />
          ) : (
            scheduleAPIResponse?.length ? (
              <Schedule scheduleAPIResponse={filteredSchedule} timeRange={timeRange} searchQuery={searchQuery} />
            ) : (
              <>
                <div className="container-center">
                  <Typography variant="h5" gutterBottom component="div">
                    {headerNames?.NETWORK_ISSUE}
                  </Typography>
                </div>
              </>
            )
          )
        }
      </div>
    </div>
  );
}

export default App;
