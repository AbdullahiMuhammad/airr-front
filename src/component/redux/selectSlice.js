import { createSlice } from "@reduxjs/toolkit";



const selectSlice = createSlice({
    name: 'select',
    initialState: {
        selectedAgent: null,
        selectedIncident: null,
        selectedAgency: null
    },
    reducers: {
        setSelectedIncident: (state, action) => {state.selectedIncident = action.payload},
        setSelectedAgent: (state, action) => {state.selectedAgent = action.payload},
        setSelectedAgency: (state, action) => {state.selectedAgency = action.payload}
    }

})


export const { setSelectedAgent, setSelectedIncident, setSelectedAgency} = selectSlice.actions;
export default selectSlice.reducer; 