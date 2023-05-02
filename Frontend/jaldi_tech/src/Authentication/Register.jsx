import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackendContext from "../Context/BackendContext";

export default function Register() {
    const navigate = useNavigate()
    const { RegisterUserFunc } = useContext(BackendContext)
    const [PasswordError, setPasswordError] = useState(false)
    const [EmailError, setEmailError] = useState(false)

    const handleRegisterFunc = (e) => {
        setEmailError(false)
        setPasswordError(false)
        e.preventDefault()
        const form = document.getElementById('registerForm')
        const formData = new FormData(form)
        const data = Object.fromEntries(formData)
        if (data['password'] !== data['password2']) {
            setPasswordError(true)
        }
        else {
            delete data['password2']
            RegisterUserFunc(data).then(() => {
                navigate('/login')
            }).catch(() => {
                setEmailError(true)
            })
        }
        // navigate('/login')
    }

    return (
        <>
            <div className="bg-purple-900 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5 h-full w-full overflow-hidden">
            </div>
            <div className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent rounded-3xl shadow-xl">
                <div className="flex-col flex relative right-10   self-center lg:px-14 sm:max-w-4xl xl:max-w-md z-10">
                    <div className="self-start hidden lg:flex flex-col text-gray-300">
                        <h1 className="my-3 font-semibold text-4xl whitespace-nowrap">Welcome to our CRM! </h1>
                        <p className=" text-sm opacity-75">
                            Lorem ipsum is placeholder text commonly used in the graphic, print,
                            and publishing industries for previewing layouts and visual mockups
                        </p>
                    </div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleRegisterFunc} id="registerForm" className="flex justify-center self-center z-10">
                    <div className="p-12 bg-white mx-auto rounded-3xl w-96">

                        {/* Sign Up */}
                        <div className="mb-7">
                            <h3 className="font-semibold text-2xl text-gray-800">Sign Up </h3>
                            <p className="text-gray-400">
                                Already have an account? <Link to="/login" className="text-sm text-slate-900 hover:text-slate-700">Sign In</Link>
                            </p>
                        </div>

                        <div className="space-y-6">

                            {/* Full Name */}
                            <div>
                                <input
                                    required
                                    name="username"
                                    className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-slate-600 focus:ring-0"
                                    type="text"
                                    placeholder="Full Name"
                                />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col space-y-1">
                                <input
                                    required
                                    name="email"
                                    className={`w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border ${EmailError ? 'border-red-400' : 'border-gray-200'} rounded-lg focus:outline-none focus:border-slate-600 focus:ring-0`}
                                    type="email"
                                    placeholder="Email"
                                />
                                {EmailError && <p className="text-red-600 text-xs ">Email already exists</p>}
                            </div>

                            {/* Password */}
                            <div className="flex flex-col space-y-1">
                                <input
                                    required
                                    name="password"
                                    placeholder="Password"
                                    type='password'
                                    className={`w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border  ${PasswordError ? 'border-red-600' : 'border-gray-200'} rounded-lg focus:outline-none focus:border-slate-600 focus:ring-0`}
                                />

                            </div>

                            {/* Password2 */}
                            <div className="flex flex-col space-y-1">
                                <input
                                    required
                                    name="password2"
                                    placeholder="Confirm Password"
                                    type='password'
                                    className={`w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border  ${PasswordError ? 'border-red-600' : 'border-gray-200'} rounded-lg focus:outline-none focus:border-slate-600 focus:ring-0`}
                                />
                                {PasswordError && <p className="text-red-600 text-xs ">Password didn't match</p>}

                            </div>


                            {/* Sign In  */}
                            <div className="mt-6">
                                <button
                                    className="w-full py-3 text-sm font-medium text-white bg-slate-900 hover:bg-slate-700 rounded-lg"
                                    type="submit"
                                >
                                    Sign Up
                                </button>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

