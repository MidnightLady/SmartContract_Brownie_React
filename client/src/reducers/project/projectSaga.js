import { put, select, takeEvery,} from "redux-saga/effects";
import map from "../../build/deployments/map.json";
import {slice} from "./projectSlice";
import Web3 from "web3";

function* loadContract (web, chain, contractName) {
    console.log(chain)
    let address
    try {
        address = map[chain][contractName][0]
    } catch (e) {
        console.log(`Couldn't find any deployed contract "${contractName}" on the chain "${chain}".`)
        return undefined
    }

    let contractArtifact
    try {
        contractArtifact = yield import(`../../build/deployments/${chain}/${address}.json`)
    } catch (e) {
        console.log(e)
        console.log(`Failed to load contract artifact "../build/deployments/${chain}/${address}.json"`)
        return undefined
    }

    return new web.eth.Contract(contractArtifact.abi, address)

}

function* getWeb3() {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545')
    const network = yield web3.eth.net.getNetworkType();
    console.log({network})
    return web3
}



function* handleLoadDataWeb3() {
    try {
        const _web3 = yield getWeb3()
        const accounts = yield _web3.eth.getAccounts()
        const chainId = parseInt(yield _web3.eth.getChainId())
        let _chainID = 0;
        if (chainId === 42){
            _chainID = 42;
        }
        if (chainId === 1337){
            _chainID = "dev"
        }
        console.log(chainId)
        const solidityStorage = yield loadContract(_web3 ,_chainID,"SolidityStorage")
        const solidityValue = yield solidityStorage.methods.get().call()
        yield put(slice.actions.setStateProject({web3:_web3, accounts, chainId, solidityStorage, solidityValue} ))
    }

    catch (e) {
        console.log(e)
    }
}

function* handleFetch() {
    const item = yield select(state => state.projects)
    try {
        const  solidityValue= yield item.solidityStorage.methods.get().call()
        console.log(solidityValue)
    }
    catch (e) {

    }
}

function* handleChangeSolidity(e){
    const value = e.payload
    const item = yield select(state => state.projects)
    console.log(item)

    try {
        yield item.solidityStorage.methods.set(value).send({from: item.accounts[0]})
        yield put(slice.actions.setInitialState())
    }
    catch (e) {
        console.log(e)
    }

}


export default function* projectSaga() {
    yield takeEvery(slice.actions.setInitialState.type, handleLoadDataWeb3)
    yield takeEvery(slice.actions.changeSolidity.type, handleChangeSolidity)
}
