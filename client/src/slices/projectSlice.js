import {createAsyncThunk, createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";

const initialState ={
    web3: null,
    accounts: null,
    chainId: null,
    solidityStorage: null,
    solidityValue: 0,
    solidityInput: 0,
}

export const slice = createSlice({
    name: '@projects',
    initialState,
    reducers: {
        setStateProject: (state,action) => {
            const {
                web3, accounts, chainId,
                    solidityStorage, solidityValue, solidityInput
            }= action.payload
            console.log(solidityInput)

            state.web3 = web3??state.web3
            state.accounts = accounts??state.accounts
            state.chainId = chainId??state.chainId
            state.solidityStorage = solidityStorage??state.solidityStorage
            state.solidityValue = solidityValue??state.solidityValue
            state.solidityInput = solidityInput??state.solidityInput
        }
    },
});

export const { reducer } = slice;
