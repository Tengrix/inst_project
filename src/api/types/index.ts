export type LoginResponseType = {
    message: string;
    accessToken: string;
};

export type GetUserDataResponseType = {
    id: string;
    email: string;
    login: string;
    photo?: any;
    firstName?: any;
    lastName?: any;
    birthdayDate?: any;
    city?: any;
    aboutMe?: any;
    createdAt: string;
    updatedAt: string;
};
