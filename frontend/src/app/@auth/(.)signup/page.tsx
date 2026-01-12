"use client";

import { useRouter } from "next/navigation";
import RegisterForm from "@/features/auth/components/RegisterForm";

export default function Page() {
	const router = useRouter();

	const handleClose = () => {
		router.back();
	};

	return <RegisterForm onSuccess={handleClose} onClose={handleClose} />;
}
