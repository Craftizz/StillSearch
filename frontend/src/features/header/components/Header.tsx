'use server';

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import NavAuth from "./NavAuth";
import type { ComponentType } from "react";

import styles from "./Header.module.css";
import Nav from "./Nav";

export default async function Header() {

    const session = await auth.api.getSession({
        headers: await headers()
    });

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<h1 className={styles.title}>StillSearch</h1>
				<Nav isAuthenticated={!!session} />
				{/* { session ? <p>Authenticated</p> : <NavigationAuth /> } */}
			</div>
		</header>
	);
}
