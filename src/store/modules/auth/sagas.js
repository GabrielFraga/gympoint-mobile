import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
// import history from '~/services/history';
import api from '~/services/api';

import { signInSuccess, signInFailure } from './actions';

export function* signIn({ payload }) {
  const { id } = payload;

  const response = yield call(api.get, `students/${id}`);
  const { student } = response.data;

  if (student) {
    yield put(signInSuccess(student));
  } else {
    // history.push('/students');
    Alert.alert('Falha na autenticação, verifique o ID informado!');
    yield put(signInFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  // history.push('/');
}

export default all([
  // takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
