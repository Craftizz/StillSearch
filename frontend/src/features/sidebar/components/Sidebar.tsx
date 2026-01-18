import FolderIcon from "@/components/icons/FolderIcon";
import Button from "@/components/ui/Button";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar} aria-hidden="true">
      <div className={styles.sidebarContent}>
        {/* <Button variant="transparent" size="large" prefix={<FolderIcon />}>
          Upload
        </Button> */}
      </div>
    </aside>
  )
}
