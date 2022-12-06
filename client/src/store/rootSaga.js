import {all} from "redux-saga/effects";
import projectSaga from "../reducers/project/projectSaga";


export default function* rootSaga() {
    yield all([
        projectSaga()

    ])
}
