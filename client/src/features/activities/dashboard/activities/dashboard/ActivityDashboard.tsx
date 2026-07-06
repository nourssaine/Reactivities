import Grid from '@mui/material/Grid2';
import ActivityList from './ActivityList';


export default function ActivityDashboard() {

  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ActivityList /> 
      </Grid>
      <Grid size={5}>
        Activity filters
      </Grid>
    </Grid>
  )
}