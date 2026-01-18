"use client";

import { useDropzone } from "react-dropzone";
import ImageIcon from "@/components/icons/ImageIcon";
import Button from "@/components/ui/Button";
import styles from "./Dropzone.module.css";

export default function Dropzone({
	onDrop,
}: {
	onDrop: (files: File[]) => void;
}) {
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		multiple: true,
		accept: {
			"image/jpeg": [".jpg"],
			"image/png": [".png"],
			"image/webp": [".webp"],
		},
		maxSize: 10 * 1024 * 1024, // 10 MB
		maxFiles: 100,
	});

	return (
		<div
			{...getRootProps({
				className: `${styles.dropzone} ${isDragActive ? styles.dropzoneActive : ""}`,
			})}
		>
			<input {...getInputProps()} />
			<div className={styles.content}>
				<p className={styles.instruction}>
					{isDragActive
						? "Drop Images"
						: "Drop Images Here"}
				</p>
				<p className={styles.extensions}>JPG, PNG, or WEBP. Up to 100 images</p>
			</div>
		</div>
	);	
}
