export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
export const LOAD_PROFILE_FORM = 'LOAD_PROFILE_FORM';
export const CHANGE_PROFILE_FORM = 'CHANGE_PROFILE_FORM';
export const CHANGE_PASSWORD_RESET_FORM = 'CHANGE_PASSWORD_RESET_FORM';

export const updateUserProfile = profile => ({
    type: UPDATE_USER_PROFILE,
    profile,
});

export const loadProfileForm = profile => ({
    type: LOAD_PROFILE_FORM,
    profile,
});

export const changeProfileForm = profile => ({
    type: CHANGE_PROFILE_FORM,
    profile,
});

export const changePasswordResetForm = passwordResetForm => ({
    type: CHANGE_PASSWORD_RESET_FORM,
    passwordResetForm,
});
