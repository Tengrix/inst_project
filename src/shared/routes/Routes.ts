export type PrivateRoutesType = '/home' | '/profile' | '/profile-settings';
export type PublicRoutesType = '/sign-in' | '/sign-up' | '/forgot-password';
export const Routes = {
    ADMIN_SIGN_IN: '/admin/sign-in',
    LOGIN: '/sign-in',
    REGISTER: '/sign-up',
    FORGOT_PASSWORD: '/forgot-password',
    // FORGOT_PASSWORD_LINK: '/forgot-password/link-has-been-sent',
    // FORGOT_PASSWORD_RECOVERY: '/forgot-password/password-recovery',
    // FORGOT_PASSWORD_CREATE_NEW: '/forgot-password/create-new-password',
    HOME: '/home',
    PROFILE: '/profile',
    PROFILE_SETTINGS: '/profile-settings'
} as const;

export const PublicRoutes = [
    Routes.ADMIN_SIGN_IN,
    Routes.LOGIN,
    Routes.REGISTER,
    Routes.FORGOT_PASSWORD
    // Routes.FORGOT_PASSWORD_LINK,
    // Routes.FORGOT_PASSWORD_RECOVERY,
    // Routes.FORGOT_PASSWORD_CREATE_NEW
] as const;
export const PrivateRoutes = [Routes.PROFILE, Routes.PROFILE_SETTINGS, Routes.HOME];
