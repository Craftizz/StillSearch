"use client";

import RegisterForm from "@/features/auth/components/RegisterForm";

import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <RegisterForm onSuccess={() => {}} />
      </div>
    </div>
  )
}