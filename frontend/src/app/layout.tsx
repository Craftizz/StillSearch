import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/features/header/components/Header";
import UserProvider from "@/context/UserProvider";

const geistSans = Geist({
	variable: "--font1",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "StillSearch",
	description: "WIP",
};

export default function RootLayout({
	auth,
	children,
}: Readonly<{
	auth: React.ReactNode;
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable}`}>
				<Header />
				{auth}
				{children}
			</body>
		</html>
	);
}
