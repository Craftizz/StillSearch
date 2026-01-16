import { authClient } from "@/lib/auth/auth-client";

type AuthResult = {
	success: boolean;
	code?: string | undefined;
};

export function useAuth() {

	async function signIn(
		email: string,
		password: string,
		rememberMe: boolean,
	): Promise<AuthResult> {
		const result = await authClient.signIn.email({
			email,
			password,
			rememberMe: rememberMe,
		});

		if (result.error) {
			return {
				success: false,
				code: result.error.code,
			};
		}

		return { success: true };
	}

	async function signUp(
		email: string,
		password: string,
		name: string,
	): Promise<AuthResult> {
		const result = await authClient.signUp.email({
			email,
			password,
			name,
		});

		if (result.error) {
			return {
				success: false,
				code: result.error.code,
			};
		}

		return { success: true };
	}

	async function signOut(): Promise<AuthResult> {
		await authClient.signOut();

		return { success: true };
	}

	return { signIn, signUp, signOut };
}
