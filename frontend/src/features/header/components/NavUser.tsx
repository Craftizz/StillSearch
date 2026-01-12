import { NavigationMenu } from "@base-ui/react/navigation-menu";
import ButtonLink from "@/components/ui/ButtonLink";

import styles from "./NavUser.module.css";
import FolderIcon from "@/components/icons/FolderIcon";
import PlusIcon from "@/components/icons/PlusIcon";

export default function NavUser() {
	return (
		<>
			{/* Boards */}
			<NavigationMenu.Item className={styles.navItem}>
				<ButtonLink
					href="/boards"
					variant="secondary"
					size="small"
					suffix={<FolderIcon size={12} />}
				>
					Boards
				</ButtonLink>
			</NavigationMenu.Item>

			{/* Upload */}
			<NavigationMenu.Item className={styles.navItem}>
				<ButtonLink
					href="/upload"
					variant="secondary"
					size="small"
					suffix={<PlusIcon size={12} />}
				>
					Upload
				</ButtonLink>
			</NavigationMenu.Item>
		</>
	);
}
