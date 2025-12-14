import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"

import { Button } from "~components/ui/button"
import { Input } from "~components/ui/input"
import { auth } from "~firebase/firebaseClient"
import useFirebaseUser from "~firebase/useFirebaseUser"

export default function AuthForm() {
    const [showLogin, setShowLogin] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { isLoading, onLogin } = useFirebaseUser()

    const signIn = async (e: any) => {
        e.preventDefault()
        if (!email || !password)
            return console.log("Please enter email and password")

        try {
            await signInWithEmailAndPassword(auth, email, password)
            onLogin()
        } catch (error: any) {
            console.log(error.message)
        } finally {
            setEmail("")
            setPassword("")
        }
    }

    return (
        <div className="flex items-center justify-center w-full overflow-x-hidden rounded-xl overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="w-full max-w-2xl max-h-full">
                <div className="bg-slate-900 rounded-lg text-slate-100">
                    <div className="flex flex-row items-center justify-center">
                        {!isLoading && (
                            <span className="text-slate-100 font-bold text-3xl text-center">
                                {showLogin ? "Login" : "Sign Up"}
                            </span>
                        )}
                        {isLoading && (
                            <span className="text-slate-100 font-bold text-3xl text-center">
                                Loading...
                            </span>
                        )}
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 text-slate-100">
                        {showLogin && !isLoading && (
                            <form className="space-y-4 md:space-y-6" onSubmit={signIn}>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-slate-200">
                                        Your email
                                    </label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        className="bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-400 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-slate-200">
                                        Password
                                    </label>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        placeholder="••••••••"
                                        className="bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-400 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
                                    Sign in
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
