import Sidebar from "@/features/sidebar/components/Sidebar";

import styles from "./layout.module.css";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={styles.container}>
      <Sidebar />
      {children}
    </div>
  );
} 
