import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"

import { auth } from "~firebase/firebaseClient"
import useFirebaseUser from "~firebase/useFirebaseUser"

export default function AuthForm() {
    const [showLogin, setShowLogin] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { isLoading, onLogin } = useFirebaseUser()

    const signIn = async (e: any) => {
        if (!email || !password)
            return console.log("Please enter email and password")

        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error: any) {
            console.log(error.message)
        } finally {
            setEmail("")
            setPassword("")
            onLogin()
        }
    }

    return (
        <div className="flex items-center justify-center w-full p-4 overflow-x-hidden rounded-xl overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="w-full max-w-2xl max-h-full">
                <div className="p-10 bg-white rounded-lg shadow">
                    <div className="flex flex-row items-center justify-center">
                        {!isLoading && (
                            <span className="text-black font-bold text-3xl text-center">
                                {showLogin ? "Login" : "Sign Up"}
                            </span>
                        )}
                        {isLoading && (
                            <span className="text-black font-bold text-3xl text-center">
                                Loading...
                            </span>
                        )}
                    </div>

                    <div className="p-4 rounded-xl bg-white text-black">
                        {showLogin && !isLoading && (
                            <form className="space-y-4 md:space-y-6" onSubmit={signIn}>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900">
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-black bg-gray-300 hover:bg-primary-dark focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    Sign in
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}