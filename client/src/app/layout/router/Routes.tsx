import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import HomePage from "../../../features/activities/home/HomePage";
import ActivityDashboard from "../../../features/activities/dashboard/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../../features/activities/form/ActivityForm";
import ActivityDetailsPage from "../../../features/activities/dashboard/activities/dashboard/details/ActivityDetailsPage";
import Counter from "../../../features/activities/counter/Counter";
import TestErrors from "../../../features/activities/errors/TestEroors";
import NotFound from "../../../features/activities/errors/NotFound";
import ServerError from "../../../features/activities/errors/ServerError";
import LoginForm from "../../../features/activities/account/LoginForm";
import RequireAuth from "./RequireAuth";
import RegisterForm from "../../../features/activities/account/RegisterForm";
import ProfilePage from "../../../features/profile/ProfilePage";
export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                element: <RequireAuth />, children: [
                    { path: 'activities', element: <ActivityDashboard /> },
                    { path: 'activities/:id', element: <ActivityDetailsPage /> },
                    { path: 'createActivity', element: <ActivityForm key='create' /> },
                    { path: 'manage/:id', element: <ActivityForm /> },
                    {path: 'profiles/:id', element: <ProfilePage />},
                ]
            },
            { path: '', element: <HomePage /> },
            { path: 'counter', element: <Counter /> },
            { path: 'errors', element: <TestErrors /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'server-error', element: <ServerError /> },
            { path: '*', element: <Navigate replace to='/not-found' /> },
            { path: 'login', element: <LoginForm /> },
            { path: 'register', element: <RegisterForm /> }








        ]
    }
])