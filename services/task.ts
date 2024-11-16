import { ENV } from "@/utils/constants"
import { local } from "@/utils/localstorage"
import { res } from "./response"
import { sortData } from "@/utils/array-object"

const errorName = (name?: string) => {
    return `Error at task manage ${name} : `
}

const serviceType = ENV.serviceType

const initialData: ITask[] = [
    {
        id: 1731793253,
        name: "task1",
        isActive: true,
        status: "SUCCESS",
        createdAt: new Date().toISOString()
    },
    {
        id: 1731793254,
        name: "task2",
        isActive: true,
        status: "PENDING",
        createdAt: new Date().toISOString()
    },
    {
        id: 1731793255,
        name: "task3",
        isActive: true,
        status: "PENDING",
        createdAt: new Date().toISOString()
    }
    ,
    {
        id: 1731793256,
        name: "task4",
        isActive: true,
        status: "PENDING",
        createdAt: new Date().toISOString()
    },
    {
        id: 1731793257,
        name: "task5",
        isActive: true,
        status: "PENDING",
        createdAt: new Date().toISOString()
    },
    {
        id: 1731793258,
        name: "task6",
        isActive: true,
        status: "PENDING",
        createdAt: new Date().toISOString()
    }
]

const initial = async () => {
    try {
        console.log("init task")
        if (serviceType === "api") {

        }
        else {
            local.set("task", initialData)
            return res.ok("ค้นหา task สำเร็จ", sortData(initialData, "createdAt", "asc"))
        }

    } catch (error) {
        console.error(errorName(), error)
        return null
    }
}

const create = async (name: string) => {

    const createData: ITask = {
        id: Math.floor(Date.now() / 1000),
        name: name,
        createdAt: new Date().toISOString(),
        status: "PENDING",
        isActive: true
    }

    try {

        if (serviceType === "api") {

        }
        else {
            const taskData = local.get("task");
            const allTask = Array.isArray(taskData) ? taskData : [];
            const newArr = [...allTask, createData]
            const save = local.set("task", newArr)

            if (save) {
                return res.ok("สร้าง task ใหม่สำเร็จ", sortData(newArr, "id", "asc"))
            }
            else {
                return res.error("สร้าง task ไม่สำเร็จ")
            }
        }

    } catch (error) {
        console.error(errorName(), error)
        return null
    }


}

const findAll = async () => {
    try {

        if (serviceType === "api") {

        }
        else {
            const taskData = local.get("task");
            const allTask = Array.isArray(taskData) ? taskData : [];

            if (allTask) {
                return res.ok("ค้นหา task สำเร็จ", sortData(allTask, "id", "asc"))
            }
            else {
                return res.error("ค้นหา task ไม่สำเร็จ")
            }
        }

    } catch (error) {
        console.error(errorName(), error)
        return null
    }
}

const findAllActive = async () => {
    try {

        if (serviceType === "api") {

        }
        else {
            const taskData = local.get("task");
            const allTask: ITask[] = Array.isArray(taskData) ? taskData : [];
            const activeTaskList = [...allTask.filter((t) => t.isActive === true)]
            if (activeTaskList) {
                return res.ok("ค้นหา task สำเร็จ", sortData(activeTaskList, "id", "asc"))
            }
            else {
                return res.error("ค้นหา task ไม่สำเร็จ")
            }
        }

    } catch (error) {
        console.error(errorName(), error)
        return null
    }
}

const complete = async (id: number) => {
    try {

        if (serviceType === "api") {

        }
        else {
            const taskData = local.get("task");
            const allTask: ITask[] = Array.isArray(taskData) ? taskData : [];
            const existTaskIndex = allTask.findIndex((f) => f.id === id)

            if (existTaskIndex < 0) {
                return res.error("ไม่พบ Task")
            }

            if (allTask[existTaskIndex].status === "SUCCESS") {
                return res.error("Task นี้สำเร็จไปแล้ว")
            }
            allTask[existTaskIndex].status = "SUCCESS"

            const save = local.set("task", allTask)

            if (save) {
                return res.ok("ปิด task สำเร็จ", sortData(allTask, "id", "asc"))
            }
            else {
                return res.error("ปิด task ไม่สำเร็จ")
            }
        }

    } catch (error) {
        console.error(errorName(), error)
        return null
    }
}

const pending = async (id: number) => {
    try {

        if (serviceType === "api") {

        }
        else {
            const taskData = local.get("task");
            const allTask: ITask[] = Array.isArray(taskData) ? taskData : [];
            console.log("allTask : ", allTask)
            const existTaskIndex = allTask.findIndex((f) => f.id === id)
            console.log("existTaskIndex : ", existTaskIndex)
            console.log("allTask[existTaskIndex] : ", allTask[existTaskIndex])
            if (existTaskIndex < 0) {
                return res.error("ไม่พบ Task")
            }

            if (allTask[existTaskIndex].status === "PENDING") {
                return res.error("Task นี้ยังไม่สำเร็จ")
            }
            allTask[existTaskIndex].status = "PENDING"

            const save = local.set("task", allTask)

            if (save) {
                return res.ok("เปลี่ยนสถานะ task สำเร็จ", sortData(allTask, "id", "asc"))
            }
            else {
                return res.error("เปลี่ยนสถานะ task ไม่สำเร็จ")
            }
        }

    } catch (error) {
        console.error(errorName(), error)
        return null
    }
}

const removeComplete = async () => {
    try {

        if (serviceType === "api") {

        }
        else {
            const taskData = local.get("task");
            const allTask: ITask[] = Array.isArray(taskData) ? taskData : [];
            const removeCompleteTask = [...allTask.map((m) => {
                if (m.status === "SUCCESS") {
                    m.isActive = false
                }
                return m
            })]

            const save = local.set("task", removeCompleteTask)

            if (save) {
                return res.ok("ลบ task สำเร็จ", sortData(removeCompleteTask, "id", "asc"))
            }
            else {
                return res.error("ลบ task ไม่สำเร็จ")
            }

        }

    } catch (error) {
        console.error(errorName(), error)
        return null
    }
}

const removeAll = async () => {
    try {

        if (serviceType === "api") {

        }
        else {
            const taskData = local.get("task");
            const allTask: ITask[] = Array.isArray(taskData) ? taskData : [];
            const removeAllTask = [...allTask.map((m) => ({ ...m, isActive: false }))]

            const save = local.set("task", removeAllTask)

            if (save) {
                return res.ok("ลบ task ทั้งหมดสำเร็จ", sortData(removeAllTask, "id", "asc"))
            }
            else {
                return res.error("ลบ task ทั้งหมดไม่สำเร็จ")
            }

        }

    } catch (error) {
        console.error(errorName(), error)
        return null
    }
}

const remove = async (id: number) => {
    try {

        if (serviceType === "api") {

        }
        else {
            const taskData = local.get("task");
            const allTask: ITask[] = Array.isArray(taskData) ? taskData : [];
            const existTaskIndex = allTask.findIndex((f) => f.id === id)

            if (existTaskIndex < 0) {
                return res.error("ไม่พบ Task")
            }

            if (allTask[existTaskIndex].isActive === false) {
                return res.error("Task นี้ถูกลบไปแล้ว")
            }
            allTask[existTaskIndex].isActive = false

            const save = local.set("task", allTask)

            if (save) {
                return res.ok("เปลี่ยนสถานะ task สำเร็จ", sortData(allTask, "id", "asc"))
            }
            else {
                return res.error("เปลี่ยนสถานะ task ไม่สำเร็จ")
            }
        }

    } catch (error) {
        console.error(errorName(), error)
        return null
    }
}

export const task = {
    create,
    findAll,
    findAllActive,
    complete,
    pending,
    removeComplete,
    removeAll,
    remove,
    initial
}