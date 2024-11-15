

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
