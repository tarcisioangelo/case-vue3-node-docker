declare global {
    namespace Express {
        interface Response {
            sendRes: <T>(body: T) => void
        }
    }
}
