"use server";

import { NavigationMenu } from '@base-ui/react/navigation-menu';
import { Separator } from '@base-ui/react/separator';
import ButtonLink from "@/components/ui/ButtonLink";
import styles from "./Nav.module.css";
import NavAuth from "./NavAuth";
import MoreIcon from '@/components/icons/MoreIcon';
import NavUser from './NavUser';

export default async function Nav({
	isAuthenticated,
}: {
	isAuthenticated: boolean;
}) {
	return (
		<NavigationMenu.Root>
			<NavigationMenu.List className={styles.navList}>
				{isAuthenticated ? <NavUser /> : <NavAuth />}
                <Separator orientation="vertical" className={styles.separator} />
				<NavigationMenu.Item>
					<ButtonLink href="/" variant="secondary" size="thin">
						<MoreIcon size={14} />
					</ButtonLink>
				</NavigationMenu.Item>
			</NavigationMenu.List>
		</NavigationMenu.Root>
	);
}
