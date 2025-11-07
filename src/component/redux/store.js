import { configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice';
import incidentSlice from './incidentSlice'
import selectSlice from './selectSlice'
import agencySlice from './agencySlice'

const store = configureStore({
    reducer: {
        user: userSlice ,
        select: selectSlice,
        incidents: incidentSlice,
        agency: agencySlice
    }
})




export default store;