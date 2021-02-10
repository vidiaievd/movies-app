import { combineReducers } from 'redux';

import { authReducer } from './reducers';

export const rootReducer = combineReducers({
    auth: authReducer
});

// const store = {
//     auth: {
//         firstName: 'John',
//         lastName: 'Doe',
//         age: 23
//     }
// };
