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
export type ProfileData = {
    aboutMe?: string;
    birthdayDate?: string;
    city?: string;
    file?: Blob;
    firstName: string;
    lastName: string;
};
export type SignUpRequestType = {
    userName: string;
    email: string;
    password: string;
};
export type ErrorDataType = {
    errorsMessages: string;
};
export type CustomerError = {
    data: ErrorDataType;
    status: number;
};
export type FieldError = {
    field: string;
    message: string;
};
export type SignUpError = {
    errorsMessages: FieldError[];
};

export type PostFormData = {
    description: string;
    files: Array<{
        blob: Blob;
        filename: string;
    }>;
};
export type PasswordRecoveryRequestType = {
    email: string;
    recaptchaValue: string;
};
export type ChangePasswordRequestType = {
    newPassword: string;
    recoveryCode: string;
};

export type EditPostFormDataType = {
    description: string;
    id: string;
    files: string;
};
