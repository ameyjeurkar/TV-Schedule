import { useEffect, useState } from 'react';
import { useFetch } from './hooks/useFetch';
import { getAPIDetails } from './utils/requests';
import { headerNames } from './utils/constants';
import NavBar from './components/NavBar';
import Schedule from './components/Schedule';
import ErrorMessage from './components/ErrorMessage';
import { CircularProgress } from '@mui/material';
import { getCurrentHour } from './utils/common';
import { useDispatch, useSelector } from 'react-redux';
import { filterScheduleToTime, filterShowsBySearchQuery } from './redux/slice/filteredScheduleSlice';
import './App.css';
import '../src/styles.css';

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
    if(scheduleAPIResponse.length) {
      const timer = setTimeout(() => {
        !searchQuery ? dispatch(filterScheduleToTime({scheduleAPIResponse, timeRange})) : searchResultAPI();
      }, 500)
      return () => clearTimeout(timer);
    }
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
              <ErrorMessage message={headerNames?.NETWORK_ISSUE} variant="h5" />
            )
          )
        }
      </div>
    </div>
  );
}

export default App;
