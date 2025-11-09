import { all } from 'redux-saga/effects';
import { tokenSaga } from './tokenSaga';


export function* sagas() {
  yield all([tokenSaga()]);
}
