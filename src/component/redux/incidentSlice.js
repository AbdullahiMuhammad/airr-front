import { createSlice } from "@reduxjs/toolkit";



const incidentSlice = createSlice({
    name: 'user',
    initialState: {
        incidents: [],
        selectedIncident: null
    },
    reducers: {
        setIncidents: (state, action) => {state.incidents = action.payload},
        setSelectedIncident: (state, action) => {state.selectedIncident = action.payload}
    }

})


export const { setIncidents, setSelectedIncident

} = incidentSlice.actions;
export default incidentSlice.reducer; 