import { Box, Grid, Link, ListItem, Typography } from '@mui/material';
import React from 'react';
import { runningStatusOfShow, showAiringDays } from '../../utils/common';

const DetailsPage = ({row}) => {
  return (
    <>
        <Typography variant="h5" gutterBottom component="div">
            Details
        </Typography>
        <Grid container spacing={2}>
            <Grid xs={4}>
                {
                    row?.image?.original &&
                    <ListItem>
                        <Box
                            component="img"
                            sx={{
                                width: 1,
                                height: 0.80
                            }}
                            alt={row?.name}
                            src={row?.image?.original}
                        />
                    </ListItem>
                }
            </Grid>
            <Grid xs={8}>
                {
                    row?.summary &&
                    <ListItem>
                        <Typography 
                            variant="body2" 
                            gutterBottom
                            dangerouslySetInnerHTML={{
                                __html: `${row?.summary}`
                            }}
                            >
                        </Typography>
                    </ListItem>
                }
                {
                    row?.network?.name &&
                    <ListItem>
                        <Typography variant="body2" display="block" gutterBottom>
                            NETWORK: {row?.network?.name}&nbsp;({row?.network?.country?.name})
                        </Typography>
                    </ListItem>
                }
                {
                    row?.status &&
                    <ListItem>
                        <Typography variant="body2" display="block" gutterBottom>
                            STATUS: {row?.status}&nbsp;{row?.premiered && runningStatusOfShow(row?.premiered, row?.ended)}
                        </Typography>
                    </ListItem>
                }
                {
                    row?.officialSite &&
                    <ListItem>
                        <Typography variant="button" display="block" gutterBottom>
                            OFFICIAL SITE: 
                            <Link href={row?.officialSite} rel="noopener noreferrer" target="_blank" variant="body2">
                                &nbsp;{row?.name}
                            </Link>
                        </Typography>
                    </ListItem>
                }
                {
                    row?.schedule &&
                    <ListItem>
                        <Typography variant="body2" display="block" gutterBottom>
                            SCHEDULE: {showAiringDays(row?.schedule?.days, row?.schedule?.time)}&nbsp;
                        </Typography>
                    </ListItem>
                }
                {
                    row.rating.average &&     
                    <ListItem>
                        <Typography variant="button" display="block" gutterBottom>
                            RATING: {row.rating.average}&nbsp;/&nbsp;10
                        </Typography>
                    </ListItem>
                }
            </Grid>
        </Grid>
    </>
  )
}
export default DetailsPage;
