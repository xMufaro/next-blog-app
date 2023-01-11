import { type NextPage } from "next";
import Head from "next/head";
import React, {useRef, useState}  from "react";
import {
    useRouter
} from "next/router"
import axios from "axios";

const Register: NextPage = () => {
    
    const router = useRouter();
    const [registerData, setRegisterData] = useState({
        username: "",
        password: "",
        email: ""
    });


    const onSubmit = async (e: any) => {
        e.preventDefault();
        if(!registerData.username || !registerData.password || !registerData.email) return;
        await fetch('/api/auth/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: registerData.username,
                password: registerData.password,
                email: registerData.email
            })
        }).then(async res => await res.json()).then(async res => {
            localStorage.setItem("account-token", res.token),
            router.push("/home")
        })
    }

    return (
        <>
            <Head>
                <title>Register</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                <div className="flex px-6 py-6 rounded-xl bg-cyan-50">
                    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto space-y-8">
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <h1 className="block text-gray-700 text-2xl font-bold mb-2">Register</h1>
                            <div className="flex flex-col">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                                <input onChange={(e) => setRegisterData({
                                    ...registerData,
                                    email: e.target.value
                                })} type="text" className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required={true} />
                            </div>
                            <div className="flex flex-col">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                                <input onChange={(e) => setRegisterData({
                                    ...registerData,
                                    username: e.target.value
                                })} type="text" className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required={true} />
                            </div>
                            <div className="flex flex-col">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                                <input onChange={(e) => setRegisterData({
                                    ...registerData,
                                    password: e.target.value
                                })} type="password" className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required={true} />
                            </div>
                            <div className="flex flex-col">
                                <label className="block text-gray-700 text-sm font-light mb-2">Want to log in?</label>
                                <button onClick={(e) => onSubmit(e)} className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                    Login
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </main>                        
        </>
    )
}

export default Register