import { dbInit } from "./dbInit"

export const dbInitAction = () => {
    dbInit
    .open()
    .then(() => {
    dbInit.initializeSampleData().catch((err) => {
        console.error(
        `Failed to initialize sample data: ${err.stack}`
        )
    })
    })
    .catch((err) => {
        console.error(`Open failed: ${err.stack}`)
    })
}