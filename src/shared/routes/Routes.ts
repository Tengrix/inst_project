export type PrivateRoutesType = '/home' | '/profile' | '/profile-settings';
export type PublicRoutesType = '/sign-in' | '/sign-up' | '/forgot-password';
export const Routes = {
    LOGIN: '/sign-in',
    REGISTER: '/sign-up',
    FORGOT_PASSWORD: '/forgot-password',
    HOME: '/home',
    PROFILE: '/profile',
    PROFILE_SETTINGS: '/profile-settings'
} as const;

export const PublicRoutes = [Routes.LOGIN, Routes.REGISTER, Routes.FORGOT_PASSWORD] as const;
export const PrivateRoutes = [Routes.PROFILE, Routes.PROFILE_SETTINGS, Routes.HOME];
