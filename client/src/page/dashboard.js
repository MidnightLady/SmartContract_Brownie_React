import React, {useEffect} from "react"
import map from "../build/deployments/map.json"
import {useDispatch, useSelector} from "../store";
import {slice} from "../slices/projectSlice";
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
        (async () => {
            const _web3 = await getWeb3()
            let _accounts = null
            // Try and enable accounts (connect metamask)
            if (window.ethereum) {
                try {
                    _accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
                } catch (e) {
                    console.log(e)
                }
            } else{
                _accounts = await _web3.eth.getAccounts()
            }

            const _chainId = parseInt(await _web3.eth.getChainId())
            console.log({_accounts})
            console.log({_chainId})
            dispatch(slice.actions.setStateProject({
                web3: _web3, accounts: _accounts, chainId: _chainId
            }))
        })()
    }, [])

    useEffect(() => {
        loadInitialContracts()
    }, [chainId])

    const getWeb3 = async () => {
        const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545')
        const network = await web3.eth.net.getNetworkType();
        console.log({network})
        return web3
    }

    const loadInitialContracts = async () => {
        // <=42 to exclude Kovan, <42 to include kovan
        if (chainId === null) {
            // Wrong Network!
            return
        }

        let _chainID = 0;
        if (chainId === 5) {
            _chainID = 5; // "goerli"
        }
        if (chainId === 42) {
            _chainID = 42;
        }
        if (chainId === 1337) {
            _chainID = "dev"
        }
        const solidityStorage = await loadContract(_chainID, "SolidityStorage")
        if (!solidityStorage) {
            return
        }
        console.log(solidityStorage._address)

        const solidityValue = await solidityStorage.methods.get().call()

        dispatch(slice.actions.setStateProject({
            solidityStorage, solidityValue,
        }))
    }

    const loadContract = async (chain, contractName) => {
        // Load a deployed contract instance into a web3 contract object

        // Get the address of the most recent deployment from the deployment map
        let address
        try {
            address = map[chain][contractName].at(0)
        } catch (e) {
            console.log(`Couldn't find any deployed contract "${contractName}" on the chain "${chain}".`)
            return undefined
        }

        // Load the artifact with the specified address
        let contractArtifact
        try {
            contractArtifact = await import(`../build/deployments/${chain}/${address}.json`)
        } catch (e) {
            console.log(`Failed to load contract artifact "../build/deployments/${chain}/${address}.json"`)
            return undefined
        }

        return new web3.eth.Contract(contractArtifact.abi, address)
    }

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



