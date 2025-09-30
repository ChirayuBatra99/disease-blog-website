'use client'
import React from "react"
import { useState } from "react"
import Link from "next/link"

export default function signup() {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = (e) =>{
        e.preventDefault()
        
        try{
            const response = fetch("/api/signup", {method: "POST", headers:{"Content-Type":"application/json"},
                                            body: JSON.stringify({name, email, password}),
            });

            if(!response.ok){
                throw new Error("Something went wrong");
            }

            const data = response.json()
            console.log(data);

            navigate("/login")
        }catch (err) {
            console.log(err)
        }
    }   

    return ( 
        <div className="flex justify-center items-center h-screen text-lg">
            <div className="bg-white p-10 rounded border">
            <h2 className="text-2xl text-center mb-5">Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="block mb-1">
                        <strong>Name</strong>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        name="name"
                        className="w-full px-3 py-2 border"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="block mb-1">
                        <strong>Email</strong>
                    </label>
                    <input
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        className="w-full px-3 py-2 border "
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="block mb-1">
                        <strong>Password</strong>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Password"
                        name="password"
                        className="w-full px-3 py-2 border "
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="w-full border py-2 bg-[#EBCCDF] rounded-lg">
                    Register
                </button>
            </form>

            <p className="mt-10 text-sm">Already have an account?</p>
            <Link href="/login" className="block text-center w-full border py-2 bg-[#EBCCDF] mt-3 rounded-lg"> Login </Link>
            </div>
        </div>
    )
}

