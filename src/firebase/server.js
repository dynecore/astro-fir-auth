import { cert, getApps, initializeApp } from "firebase-admin/app";
import path from 'path'

const activeApps = getApps()
const initApp = () => {
    return initializeApp({
        credential: cert(path.join(process.cwd(), 'firebase-admin-key.json'))
    })
}

export const app = activeApps.length === 0 ? initApp() : activeApps[0]
