// Modulo 21 - Dashboard  - instalando o redux e preparando as pastas.
import { combineReducers } from 'redux';

const reducers = combineReducers({

	root : (state,action) => state || {}
});

export default reducers;