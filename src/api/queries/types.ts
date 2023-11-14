export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
};

export type Mutation = {
    __typename?: 'Mutation';
    getAdminRole: User2;
};

export type MutationGetAdminRoleArgs = {
    id: Scalars['String']['input'];
};

export type Query = {
    __typename?: 'Query';
    deleteUser: User2;
    getAllUsers: Array<User2>;
    getUserById: User2;
};

export type QueryDeleteUserArgs = {
    id: Scalars['String']['input'];
};

export type QueryGetAllUsersArgs = {
    itemsPerPage: Scalars['Float']['input'];
    page: Scalars['Float']['input'];
    search: Scalars['String']['input'];
    userId: Scalars['String']['input'];
};

export type QueryGetUserByIdArgs = {
    id: Scalars['String']['input'];
};

export type User2 = {
    __typename?: 'User2';
    aboutMe?: Maybe<Scalars['String']['output']>;
    birthdayDate?: Maybe<Scalars['String']['output']>;
    city?: Maybe<Scalars['String']['output']>;
    comment: Array<Scalars['String']['output']>;
    createdAt: Scalars['String']['output'];
    email: Scalars['String']['output'];
    firstName?: Maybe<Scalars['String']['output']>;
    id: Scalars['String']['output'];
    lastName?: Maybe<Scalars['String']['output']>;
    login?: Maybe<Scalars['String']['output']>;
    photo?: Maybe<Scalars['String']['output']>;
    /** User's description to the movie */
    refreshToken?: Maybe<Scalars['String']['output']>;
    role: Scalars['String']['output'];
    updatedAt: Scalars['String']['output'];
};
