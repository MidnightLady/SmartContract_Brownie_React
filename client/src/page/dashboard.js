import React, {useEffect} from "react"
import map from "../build/deployments/map.json"
import {useDispatch, useSelector} from "../store";
import {slice} from "../reducers/project/projectSlice";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Web3 from "web3";

const Dashboard = () => {
    const {
        web3, accounts, chainId, solidityStorage, solidityValue, solidityInput, transactionHash
    } = useSelector(state => state.projects)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(slice.actions.setInitialState())
    }, [])

    useEffect(()=>{},[solidityValue])

    const changeSolidity = async (e) => {
        e.preventDefault()
        const value = parseInt(solidityInput)
        if (isNaN(value)) {
            alert("invalid value")
            return
        }

        await solidityStorage.methods.set(value).send({from: accounts[0]})
            .on('receipt', async () => {
                dispatch(slice.actions.setStateProject(({
                    solidityValue: await solidityStorage.methods.get().call()
                })))
            }).on('transactionHash', async (transactionHash) => {
                dispatch(slice.actions.setStateProject(({
                    transactionHash: transactionHash
                })))
            }).catch((err) => {
                console.log("Failed with error: ", err);
            });


    }

    const handleChangeInput = (event) => {
        dispatch(slice.actions.setStateProject({solidityInput: event.target.value}))
    }


    if (!web3) {
        return <div>Loading Web3, accounts, and contracts...</div>
    }

    if (!solidityStorage) {
        return <div>Could not find a deployed contract. Check console for details.</div>
    }

    const isAccountsUnlocked = accounts ? accounts.length > 0 : false

    return (<div className="App" style={{textAlign: "center"}}>
        <h1>Your Brownie - React is installed and ready.</h1>
        <p>
            If your contracts compiled and deployed successfully, you can see the current
            storage values below.
        </p>
        {!isAccountsUnlocked ? <p><strong>Connect with Metamask and refresh the page to
            be able to edit the storage fields.</strong>
        </p> : null}

        <h2>Solidity Storage Contract</h2>
        <div>The stored value is: {solidityValue}</div>
        <br/>
        <Box component="form"
             onSubmit={(e) => changeSolidity(e)}
             autoComplete="off">
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="Change the value"
                    type="text"
                    variant="filled"
                    value={solidityInput}
                    onChange={handleChangeInput}
                />
                <br/>
                <Button sx={{marginTop: '10px'}} type="submit" color="secondary" disabled={!isAccountsUnlocked} variant="contained">Submit</Button>

                {transactionHash ? <div>
                    <p>Last transaction Hash: {transactionHash}</p>
                </div> : null}
            </div>
        </Box>
    </div>)
}

export default Dashboard



