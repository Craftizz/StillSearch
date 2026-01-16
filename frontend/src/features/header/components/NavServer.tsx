import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import NavClient from "./NavClient";

export default async function NavServer() {

    const sessionResult = await auth.api.getSession({
        headers: await headers(),
    });

    return <NavClient sessionResult={sessionResult} />;
}