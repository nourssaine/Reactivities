import {createBrowserRouter} from "react-router";
import App from "../App";
import HomePage from "../../../features/activities/home/HomePage";
import ActivityDashboard from "../../../features/activities/dashboard/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../../features/activities/form/ActivityForm";
import ActivityDetailsPage from "../../../features/activities/dashboard/activities/dashboard/details/ActivityDetailsPage";
import Counter from "../../../features/activities/counter/Counter";
export const router= createBrowserRouter([
    {
        path:'/',
        element:<App />,
        children:[
            {path: '',element:<HomePage/>},
            {path: 'activities',element:<ActivityDashboard/>},
            {path: 'activities/:id',element:<ActivityDetailsPage/>},
            {path: 'createActivity',element:<ActivityForm key='create'/>},
            {path: 'manage/:id',element:<ActivityForm/>},
            {path: 'counter',element:<Counter/>}

           
        ]
    }
])