import {api} from '../../@services';
import * as actions from './actions';
import {sendMessage} from "../messages/thunks";


export const getUserProfile = () => async (dispatch) => {
    try {
        const {data} = await api.get('/v1/profile');
        await dispatch(actions.updateUserProfile(data));
        await dispatch(actions.loadProfileForm(data));
    } catch (e) {
        // dispatch(sendMessage(e.message, true))
    }
};

export const updateProfile = profile => {
    return async dispatch => {
        try {
            await api.patch('/v1/profile', profile);
            await dispatch(getUserProfile());
            dispatch(sendMessage('Your profile was updated'))
        } catch (e) {
            dispatch(sendMessage(e.message, true));
        }
    }
};
