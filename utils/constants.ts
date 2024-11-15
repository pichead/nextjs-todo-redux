export const ENV: IEnv = {
    appName: process.env.NEXT_PUBLIC_APP_NAME ? process.env.NEXT_PUBLIC_APP_NAME : "Website",
    port: process.env.NEXT_PUBLIC_PORT ? parseInt(process.env.NEXT_PUBLIC_PORT) : 3000,
    backend: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT ? process.env.NEXT_PUBLIC_BACKEND_ENDPOINT : "http://localhost:3333",
    accessTokenName: process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME ? process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME : "acct",
    refreshTokenName: process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME ? process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME : "reft",
    serviceType: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT ? "api" : "local"
}