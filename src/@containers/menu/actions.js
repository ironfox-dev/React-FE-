export const GET_USER_MENU = 'GET_USER_MENU';

export const getUserSideBarMenu = (role = 'agency') => ({
  type: GET_USER_MENU,
  role,
});
