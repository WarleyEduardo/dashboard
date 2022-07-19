// Modulo 21 - Dashboard  - instalando o redux e preparando as pastas.
import { combineReducers } from 'redux';


/* Modulo 27 -  login com sucess: autenticação de rota */
import authReducer from './auth_reducer';

const reducers = combineReducers({
	auth: authReducer,
});

export default reducers;