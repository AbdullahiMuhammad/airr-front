import { createSlice } from "@reduxjs/toolkit";



const agencySlice = createSlice({
    name: 'agency',
    initialState: {
  agencies: [],
  members: null
},
    reducers: {
        setAgencies: (state, action) => {state.agencies = action.payload},
        updateAgencyMembers: (state, action) => {
            const { agencyId, members } = action.payload;
            state.agencies = state.agencies.map(a =>
                a._id === agencyId ? { ...a, members } : a
            );
        },
    }

})


export const { setAgencies, updateAgencyMembers

} = agencySlice.actions;
export default agencySlice.reducer; 