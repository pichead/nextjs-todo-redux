interface IEnv {
    appName: string
    port: number
    backend: string
    accessTokenName: string
    refreshTokenName: string
    serviceType: "api" | "local"
}

interface IResponse {
    statusCode: number,
    messageEn: string,
    messageTh: string,
    data?: any
}

interface ITask {
    id: number
    name: string
    status: "PENDING" | "SUCCESS"
    createdAt: Date
    isActive: boolean
}

