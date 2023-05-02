import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import BackendContext from "../Context/BackendContext";

export default function Login() {
    const navigate = useNavigate()
    const { LoginUserFunc } = useContext(BackendContext)

    const [ValidationError, setValidationError] = useState(false)

    const handleLoginFunc = (e) => {
        setValidationError(false)
        e.preventDefault()
        const form = document.getElementById('loginForm')
        const formData = new FormData(form)
        const data = Object.fromEntries(formData)
        LoginUserFunc(data).then(() => {
            navigate('/dashboard')
        }).catch((error) => {
            console.log(error)
            setValidationError(true)
        })
        // navigate('/dashboard')
    }

    return (
        <>
            <div className="bg-purple-900 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5 h-full w-full overflow-hidden">
            </div>
            <div className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent rounded-3xl shadow-xl">
                <div className="flex-col flex self-center lg:px-14 sm:max-w-4xl xl:max-w-md z-10">
                    <div className="self-start hidden lg:flex flex-col text-gray-300">
                        <h1 className="my-3 font-semibold text-4xl">Welcome back !</h1>
                        <p className="pr-3 text-sm opacity-75">
                            Lorem ipsum is placeholder text commonly used in the graphic, print,
                            and publishing industries for previewing layouts and visual mockups
                        </p>
                    </div>
                </div>

                <div className="flex justify-center self-center z-10">
                    <div className="p-12 bg-white mx-auto rounded-3xl w-96">

                        {/* Sign Up */}
                        <div className="mb-7">
                            <h3 className="font-semibold text-2xl text-gray-800">Sign In </h3>
                            <p className="text-gray-400">
                                Don't have an account? <Link to="/register" className="text-sm text-slate-900 hover:text-slate-700">Sign Up</Link>
                            </p>
                        </div>

                        {/* Login Form */}
                        <form id="loginForm" onSubmit={handleLoginFunc} className="space-y-6">

                            {ValidationError && <p className="text-red-600 text-sm">Invalid credentials</p>}

                            {/* Email */}
                            <div>
                                <input
                                    required
                                    name="email"
                                    className={`w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border ${ValidationError ? 'border-red-400' : 'border-gray-200'} rounded-lg focus:outline-none focus:border-slate-600`}
                                    type=""
                                    placeholder="Email"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <input
                                    required
                                    name="password"
                                    placeholder="Password"
                                    type='password'
                                    className={`w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border ${ValidationError ? 'border-red-400' : 'border-gray-200'} rounded-lg focus:outline-none focus:border-slate-600 focus:ring-0`}
                                />
                            </div>

                            {/* Sign In  */}
                            <div className="mt-6">
                                <button
                                    className="w-full py-3 text-sm font-medium text-white bg-slate-900 hover:bg-slate-700 rounded-lg"
                                    type="submit"

                                >
                                    Sign In
                                </button>
                            </div>

                            {/* Forget Password */}
                            <div className="mt-6 text-center">
                                <a href="#" className="text-sm text-slate-900 hover:text-slate-700">
                                    Forgot Password?
                                </a>
                            </div>
                        </form>
                        {/*End Login Form */}

                    </div>
                </div>
            </div>
        </>
    )
}

