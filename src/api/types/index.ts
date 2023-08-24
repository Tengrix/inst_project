export type LoginResponseType = {
    message: string;
    accessToken: string;
};

export type GetUserDataResponseType = {
    id: string;
    email: string;
    login: string;
    photo?: string;
    firstName?: string;
    lastName?: string;
    birthdayDate?: string;
    city?: string;
    aboutMe?: string;
    createdAt: string;
    updatedAt: string;
};
