export const Routes = {
    LOGIN: '/sign-in',
    REGISTER: '/sign-up',
    HOME: '/home',
    PROFILE: '/profile',
    PROFILE_SETTINGS: '/profile/settings/',
} as const

export const PublicRoutes = [
    Routes.LOGIN,
    Routes.REGISTER,
] as const
export const PrivateRoutes = [
    Routes.PROFILE,
    Routes.PROFILE_SETTINGS,
    Routes.HOME
]
