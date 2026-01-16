"use client";

import { NavigationMenu } from "@base-ui/react/navigation-menu";
import type { auth } from "@/lib/auth/auth";
import NavAuth from "./NavAuth";
import styles from "./NavClient.module.css";
import NavUser from "./NavUser";

type SessionResult = Awaited<ReturnType<typeof auth.api.getSession>>;

export default function NavClient({
	sessionResult,
}: {
	sessionResult: SessionResult;
}) {
	const isAuthed = Boolean(sessionResult?.session);

	return (
		<NavigationMenu.Root>
			<NavigationMenu.List className={styles.navList}>
				{isAuthed ? <NavUser /> : <NavAuth />}
			</NavigationMenu.List>
		</NavigationMenu.Root>
	);
}
