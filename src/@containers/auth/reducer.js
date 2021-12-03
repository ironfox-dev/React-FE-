import {ADD_SESSION_TOKEN, REMOVE_SESSION_TOKEN} from './actions';

const initState = {
    session: {
        token: null,
        refreshToken: null,
        isAuthorised: false,
    },
};

const auth = (state = initState, action) => {
    switch (action.type) {
        case ADD_SESSION_TOKEN: {
            return {
                ...state,
                session: {
                    ...action.tokenData,
                    isAuthorised: true,
                },
            };
        }
        case REMOVE_SESSION_TOKEN: {
            return {
                ...state,
                session: {
                    token: null,
                    isAuthorised: false,
                },
            };
        }
        default: {
            return state;
        }
    }
};

export default auth;
