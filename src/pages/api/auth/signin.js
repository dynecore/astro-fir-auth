import { getAuth } from "firebase-admin/auth"
import { app } from "../../../firebase/server"

export const POST = async ({ request, cookies, redirect }) => {

    const auth = getAuth(app)

    const idToken = request.headers.get("Authorization")?.split("Bearer ")[1]

    if (!idToken) {
        return new Response(
            "ERROR: NO SE DETECTÓ EL TOKEN DE AUTORIZACIÓN EN LA SOLICITUD",
            { status: 401 }
        )
    }

    try {
        await auth.verifyIdToken(idToken)
    } catch (error) {
        return new Response(
            "EL TOKEN RECIBIDO NO ES VALIDO",
            { status: 401 }
        )
    }

    const duration = 60 * 60 * 24 * 5 * 1000 
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn: duration })

    cookies.set('__session', sessionCookie, {
        path: "/"
    })

    return redirect ('/dashboard')
}