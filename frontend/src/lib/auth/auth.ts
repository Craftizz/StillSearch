import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins"
import { headers } from "next/dist/server/request/headers";
import { Pool } from "pg";

export const auth = betterAuth({
	schema: "auth",
	database: new Pool({
		connectionString: process.env.DATABASE_URL,
	}),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false,
		
	},
	plugins: [ 
        username() 
    ],
	session: {
		expiresIn: 60 * 60 * 24 * 7,
		updateAge: 60 * 60 * 24,
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60,
		},
	},
	advanced: {
        cookiePrefix: "stillsearch"
    },
});

export async function requireAuth() {

	const session = await auth.api.getSession({
		headers: await headers()
	})

	if (!session) {
		throw new Error("Unauthorized")
	}

	return session;
}
