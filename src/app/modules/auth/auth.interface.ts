
export type ILoginUser = {
    email: string;
    password: string;
}

export type ILoginResponse = {
    userName: string;
    email: string;
    accessToken: string;
    refreshToken?: string;
}

export type IRefreshTokenResponse = {
    accessToken: string;
}