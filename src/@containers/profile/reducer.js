import {CHANGE_PASSWORD_RESET_FORM, CHANGE_PROFILE_FORM, LOAD_PROFILE_FORM, UPDATE_USER_PROFILE} from './actions';
import * as R from "ramda";
import {SessionStorage} from "@services";

const initialState = {
    role: R.pathOr('', ['user', 'role'], SessionStorage.getItem('session')),
    profile: R.pathOr({
        id: null,
        name: null,
        email: null,
        phone: null,
        avatar_path: null,
        role: null,
        permissions: [],
        agencies: [],
        twilio_token: null,
        twilio_sid: null,
        twilio_mobile_number: null,
    }, ['user'], SessionStorage.getItem('session')),
    profileForm: {
        id: null,
        name: '',
        email: '',
        phone: '',
        avatar: '',
        twilio_token: '',
        twilio_sid: '',
        twilio_mobile_number: '',
    },
    passwordResetForm: {
        password: '',
        password_confirmation: '',
    }
};

function profile(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER_PROFILE: {
            return {
                ...state,
                role: action.profile.role.toLowerCase(),
                profile: {
                    ...action.profile,
                }
            };
        }
        case LOAD_PROFILE_FORM: {
            return {
                ...state,
                profileForm: action.profile
            };
        }
        case CHANGE_PROFILE_FORM: {
            return {
                ...state,
                profileForm: {
                    ...state.profileForm,
                    ...action.profile,
                }
            };
        }
        case CHANGE_PASSWORD_RESET_FORM: {
            return {
                ...state,
                passwordResetForm: {
                    ...state.passwordResetForm,
                    ...action.passwordResetForm
                }
            }
        }
        default: {
            return {
                ...state,
                role: state.role.toLowerCase(),
            };
        }
    }
}

export default profile;
