
import { connectToDB } from "@/lib/mongodb";

export async function POST(req) {
    try {
        const data = await req.json();
        const {email, password } = data;

        if (!email || !password) {
            return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
        }

        const { client } = await connectToDB();
        const db = client.db();

       const user = await db.collection("users").findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        { status: 401 }
      );
    }

   
    if (user.password !== password) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        { status: 401 }
      );
    }

        return new Response(JSON.stringify({ message: "Login Successful" }), { status: 200 });
    } catch (error) {
        console.error("Error logging in user:", error);
        return new Response(JSON.stringify({ message: "Error logging in user", error: error.message }), { status: 500 });
    }
}