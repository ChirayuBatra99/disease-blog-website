
import { connectToDB } from "@/lib/mongodb";

export async function POST(req) {
    try {
        const data = await req.json();
        const { name, email, password } = data;

        if (!name || !email || !password) {
            return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
        }

        const { client } = await connectToDB();
        const db = client.db();

        await db.collection("users").insertOne({
            name,
            email,
            password
        });

        return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201 });
    } catch (error) {
        console.error("Error registering user:", error);
        return new Response(JSON.stringify({ message: "Error registering user", error: error.message }), { status: 500 });
    }
}
