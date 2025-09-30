'use client'
import React from "react"
import { useState } from "react"
import Link from "next/link"

export default function login() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [message, setMessage] = useState()

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Something went wrong");
      }

      const data = await response.json();
      console.log("Login response:", data);

      route("/upload");

    } catch (err) {
      console.error(err);
      setMessage(err.message);
    }
  };  

    return ( 
        <div className="flex justify-center items-center h-screen text-lg">
            <div className="bg-white p-10 rounded border">
            <h2 className="text-2xl text-center mb-5">Login</h2>
            <form onSubmit={handleSubmit}>
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
                    Login
                </button>
            </form>

            <p className="mt-10 text-sm">Create a new account?</p>
            <Link href="/signup" className="block text-center w-full border py-2 bg-[#EBCCDF] mt-3 rounded-lg"> Register </Link>
            {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}
            </div>
        </div>
    )
}

