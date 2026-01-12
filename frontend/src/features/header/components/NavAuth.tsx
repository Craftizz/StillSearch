import { NavigationMenu } from "@base-ui/react/navigation-menu";
import ButtonLink from "@/components/ui/ButtonLink";

import styles from "./NavAuth.module.css";

export default function NavAuth() {
	return (
		<>
			{/* Login */}
			<NavigationMenu.Item className={styles.navItem}>
				<ButtonLink href="/login" variant="secondary" size="small">
					Login
				</ButtonLink>
			</NavigationMenu.Item>

			{/* Sign Up */}
			<NavigationMenu.Item className={styles.navItem}>
				<ButtonLink href="/signup" variant="primary" size="small">
					Sign Up
				</ButtonLink>
			</NavigationMenu.Item>
		</>
	);
}
