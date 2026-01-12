"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

import { Form } from "@base-ui/react/form";
import { Field } from "@base-ui/react/field";

import Button from "@/components/ui/Button";
import EmailIcon from "@/components/icons/EmailIcon";
import styles from "./RegisterForm.module.css";
import Input from "@/components/ui/Input";

export default function RegisterForm({
	onSuccess,
}: {
	onSuccess: () => void;
}) {
	const { signUp } = useAuth();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | undefined>(undefined);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		setError(undefined);
		setLoading(true);

		const formData = new FormData(event.currentTarget);

		const data = {
			name: formData.get("name") as string,
			email: formData.get("email") as string,
			password: formData.get("password") as string,
		};

		const result = await signUp(data.email, data.password, data.name);

		setLoading(false);

		if (!result.success) {
			setError(result.code);
			console.log(result.code);
		} else {
			console.log("SUCCESS");
			onSuccess();
		}
	}

	return (
		<section className={styles.container}>
			<div className={styles.content}>
				<h3 className={styles.title}>Sign Up</h3>

				<Form className={styles.form} onSubmit={(event) => handleSubmit(event)}>
					{/* Name */}
					<Field.Root className={styles.formField} name="name">
						<Field.Label className={styles.formLabel}>Your Name</Field.Label>
						<Field.Control
							render={<Input />}
							placeholder="Name"
							type="text"
							autoComplete="off"
							required
						/>
					</Field.Root>

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
					<div className={styles.formFooter}>
						<p className={styles.formTerms}>
							By continuing, you agree to our Terms of Service and Privacy Policy.
						</p>
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
					</div>
				</Form>
			</div>
		</section>
	);
}
