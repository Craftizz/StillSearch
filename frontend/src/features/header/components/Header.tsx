'use server';

import styles from "./Header.module.css";
import NavServer from "./NavServer";

export default async function Header() {

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<h1 className={styles.title}>StillSearch</h1>
				<NavServer />
			</div>
		</header>
	);
}
