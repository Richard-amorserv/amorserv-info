import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Password Email Link
export const forgotpasswordemail = createAsyncThunk("forgotpasswordemail", async({email}, {rejectWithValue}) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const body = JSON.stringify({email: email})

    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_AUTH_URL}/api/v1/auth/forgot-password`, body, config)
        return res.data.message
    }catch (err) {
        if (err.response && err.response.data.message) {
            return rejectWithValue(err.response.data.message)
        }else {
            return rejectWithValue(err.message)
        }
    }
})


// Customer Password Email Link
export const customerforgotpasswordemail = createAsyncThunk("customerforgotpasswordemail", async({email}, {rejectWithValue}) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const body = JSON.stringify({email: email})

    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_AUTH_URL}/api/v1/auth/forgot-password`, body, config)
        return res.data.message
    }catch (err) {
        if (err.response && err.response.data.message) {
            return rejectWithValue(err.response.data.message)
        }else {
            return rejectWithValue(err.message)
        }
    }
})

// Password Recovery
export const forgotpasswordrecovery = createAsyncThunk("forgotpasswordrecovery", async({password, confirmPassword}, {rejectWithValue}) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const body = JSON.stringify({password: password, confirmPassword: confirmPassword})

    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_AUTH_URL}/api/v1/auth/update-password`, body, config)
        return res.data.message
    }catch (err) {
        if (err.response && err.response.data.message) {
            return rejectWithValue(err.response.data.message)
        }else {
            return rejectWithValue(err.message)
        }
    }
})


const initialState = {
    loading: false,
    email: null,
    response: null
}

const forgotPasswordSlice = createSlice({
    name: "forgotpassword",
    initialState,

    reducers: {
        SET_EMAIL: (state, {payload: email}) => {
            state.email = email
        },

        REMOVE_EMAIL: (state, {payload: email}) => {
            state.email = null
        },

        SET_ERROR_NULL: (state, {paload}) => {
            state.response = null
        }
    },
    extraReducers: builder => {
        builder

            //  Forgot Password Email
            .addCase(forgotpasswordemail.pending, (state, actions) => {
                state.loginLoading = true
                state.response = null
            })

            .addCase(forgotpasswordemail.fulfilled, (state, {payload}) => {
                state.loginLoading = false
                state.response = null
            })

            .addCase(forgotpasswordemail.rejected, (state, {payload}) => {
                state.loginLoading = false
                state.response = payload
            })

            //  Customer Forgot Password Email
            .addCase(customerforgotpasswordemail.pending, (state, actions) => {
                state.loginLoading = true
                state.response = null
            })

            .addCase(customerforgotpasswordemail.fulfilled, (state, {payload}) => {
                state.loginLoading = false
                state.response = null
            })

            .addCase(customerforgotpasswordemail.rejected, (state, {payload}) => {
                state.loginLoading = false
                state.response = payload
            })

            //  Forgot Password Recovery
            .addCase(forgotpasswordrecovery.pending, (state, actions) => {
                state.loginLoading = true
                state.response = null
            })

            .addCase(forgotpasswordrecovery.fulfilled, (state, {payload}) => {
                state.loginLoading = false
                state.response = null
            })

            .addMatcher(forgotpasswordrecovery.rejected, (state, {payload}) => {
                state.loginLoading = false
                state.response = payload
            })

    }
})

export const { SET_EMAIL, REMOVE_EMAIL, SET_ERROR_NULL } = forgotPasswordSlice.actions

export default forgotPasswordSlice.reducer;