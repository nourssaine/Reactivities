import { Box, Button, Paper, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { activitySchema,  type ActivitySchema,  type ActivitySchemaInput } from "../../../lib/schemas/activitySchema";
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from "../../../app/layout/shared/componnents/TextInput";
import SelectInput from "../../../app/layout/shared/componnents/SelectInput";
import { categoryOption } from "./categoryOption";
import DtaeTimeInput from "../../../app/layout/shared/componnents/DateTimeInput";
import LocationInput from "../../../app/layout/shared/componnents/LocationInput";

export default function ActivityForm() {
    const { reset, control, handleSubmit } = useForm<ActivitySchemaInput, unknown, ActivitySchema>({
        mode: 'onTouched',
        resolver: zodResolver(activitySchema)
    });
    const { id } = useParams();
    const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id);
    const navigate = useNavigate();
    useEffect(() => {
        if (activity) reset({
            ...activity,
            location: {
                city: activity.city,
                venue: activity.venue,
                latitude: activity.latitude,
                longitude: activity.longitude
            }
        });
    }, [activity, reset]);

    const OnSubmit = async (data: ActivitySchema) => {
        const {location, ...rest} = data;
        const flattenedData = {...rest, ...location};
        console.log('Date envoyée:', flattenedData.date);
        try {
            if (activity){
                updateActivity.mutate({...activity, ...flattenedData},{
                    onSuccess: () => navigate(`/activities/${activity.id}`)
                })
            }else {
                console.log('Payload complet:', flattenedData);
                console.log('Payload city:', flattenedData.city);
                createActivity.mutate(flattenedData,{
                    onSuccess: (id) => navigate(`/activities/${id}`)
                })
            }
        } catch (error) {
            console.log(error);
            
        }

    }
    if (isLoadingActivity) return <Typography>Loading ...</Typography>
    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                {activity ? 'Edit Activity' : 'Create Activity'}
            </Typography>
            <Box component='form' onSubmit={handleSubmit(OnSubmit)} display='flex' flexDirection='column' gap={3} >
                <TextInput label='Title' control={control} name='title' />
                <TextInput label='Description' control={control} name='description' multiline rows={3} />
                <Box display='flex' gap={3}>
                    <SelectInput
                    items={categoryOption}
                    label='Category'
                    control={control}
                    name='category' />
                <DtaeTimeInput  label='Date' control={control} name='date' />
                </Box>
                <LocationInput control={control} label="Enter the location" name="location" />
               

                <Box display="flex" justifyContent="end" gap={3}>
                    <Button color='inherit' >Cancel</Button>
                    <Button
                        type="submit"
                        color='success'
                        variant="contained"
                        disabled={updateActivity.isPending || createActivity.isPending}
                    >Submit</Button>
                </Box>
            </Box>

        </Paper>
    )
}
