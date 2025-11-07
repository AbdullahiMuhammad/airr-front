import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        users: []
    },
    reducers: {
        setUser: (state, action) => {state.user = action.payload},
        setUsers: (state, action) => {state.users = action.payload}
    }

})


export const {setUser, setUsers} = userSlice.actions;
export default userSlice.reducer; 