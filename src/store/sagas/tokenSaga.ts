import { call, select, takeEvery } from 'redux-saga/effects';
import { tokenActions, tokenSelectors } from '../slices/token'

export function* setToken(): Generator {
  const token = (yield select(tokenSelectors.get)) as string;
  yield call([localStorage, 'setItem'], 'token', token || '');
}

export function* tokenSaga() {
  yield takeEvery(tokenActions.set.type, setToken);
  yield takeEvery(tokenActions.empty.type, setToken);
}