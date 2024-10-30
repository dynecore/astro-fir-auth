import { getAuth } from "firebase-admin/auth"
import { app } from "../../../firebase/server"

export const POST = async ({request, response}) => {
    const auth = getAuth(app)

    const formData = await request.formData()

    const name = formData.get('name')?.toString()
    const email = formData.get('email')?.toString()
    const password = formData.get('password')?.toString()

    if (!email || !name || !password) {
        return new Response(
            "ERROR: CAMPOS OBLICATORIOS AUSENTES, VERIFIQUE EMAIL, NOMBRE O CONTRASEÑA",
            { status: 400 }
        )
    }

    try {
        await auth.createUser({ email, password, displayName: name })
    } catch (error) {
        return new Response(
            "ERROR EXTERNO A LA APLICACIÓN DURANTE LA CREACION DEL USUARIO: ", error,
            { status: 400 }
        )
    }

    return redirect('/signin')
}