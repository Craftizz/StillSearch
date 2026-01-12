"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

import { Form } from "@base-ui/react/form";
import { Field } from "@base-ui/react/field";

import Button from "@/components/ui/Button";
import EmailIcon from "@/components/icons/EmailIcon";
import styles from "./LoginForm.module.css";
import Input from "@/components/ui/Input";
import { useRouter } from "next/navigation";

export default function LoginForm({
	onSuccess,
}: {
	onSuccess: () => void;
}) {

	const { signIn } = useAuth();
	const router = useRouter()

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | undefined>(undefined);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		setError(undefined);
		setLoading(true);

		const formData = new FormData(event.currentTarget);

		const data = {
			email: formData.get("email") as string,
			password: formData.get("password") as string,
		};

		const result = await signIn(data.email, data.password, true);

		setLoading(false);

		if (result.success) {
			router.refresh();
			router.back();
			
		} else {
			setError(result.code);
			console.log(result.code);
		}
	}

	return (
		<section className={styles.container}>
			<div className={styles.content}>
				<h3 className={styles.title}>Login</h3>

				<Form className={styles.form} onSubmit={(event) => handleSubmit(event)}>
					{/* Email */}
					<Field.Root className={styles.formField} name="email">
						<Field.Label className={styles.formLabel}>Email</Field.Label>
						<Field.Control
							render={<Input />}
							placeholder="Email"
							type="email"
							autoComplete="off"
							required
						/>
					</Field.Root>

					{/* Password */}
					<Field.Root className={styles.formField} name="password">
						<Field.Label className={styles.formLabel}>Password</Field.Label>
						<Field.Control
							render={<Input />}
							placeholder="Password"
							type="password"
							autoComplete="off"
							required
						/>
					</Field.Root>

					{/* Submit */}
					<Field.Root className={styles.formField}>
						<Button
							prefix={<EmailIcon />}
							type="submit"
							size="large"
							variant="primary"
							disabled={loading}
							className={styles.submitButton}
						>
							Continue With Email
						</Button>
					</Field.Root>

				</Form>
			</div>
		</section>
	);
}
