import { createSlice } from "@reduxjs/toolkit";
 
const initialState = {
    user : null,
};

const profileSclice = createSlice( {
    name: "profile",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload;
        },
    },
});

export const {setUser} = profileSclice.actions;
export default profileSclice.reducer;