import { use, useContext, useEffect } from "react";
import UserContext from "../components/UserContext";
import { useRouter } from "next/router";

export default function Error() {
    const context = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        if(context.userContext.id != -1){
            router.push('/');
        }
    }, [context, router]);



    return (
        <div>
            <h1>500 - Server-side error occurred</h1>
        </div>
    )
}