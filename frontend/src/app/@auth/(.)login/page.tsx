"use client";

import { useRouter } from "next/navigation";
import LoginForm from "@/features/auth/components/LoginForm";


export default function Page() {
  const router = useRouter();
  
  const handleClose = () => {
    router.back();
  };

  return(
      <LoginForm onSuccess={handleClose} onClose={handleClose} />
  )
}