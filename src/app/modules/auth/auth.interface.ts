
export type ILoginUser = {
    email: string;
    password: string;
}

export type ILoginResponse = {
    accessToken: string;
    refreshToken?: string;
}

export type IRefreshTokenResponse = {
    accessToken: string;
}