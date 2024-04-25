import { useAuth } from "@/lib/auth/authentication";
import protectedfun from "@/lib/auth/protected";
import axios from "@/lib/axios";
import { Outlet, createFileRoute, redirect, } from "@tanstack/react-router"

export const Route = createFileRoute('/_protected')({
    loader: async ({ location, context: { queryClient } }) => protectedfun(location, queryClient),

    component: Protected
})

function Protected() {

    //you can use either loader or bellow code both works properly
    //   const {user} = useAuth({
    //     middleware:"auth",
    //     redirectIfAuthenticated:"/login"
    //   })

    const { logout } = useAuth({
        middleware: "auth",
        redirectIfAuthenticated: "/login"
    })

    function handleLogout() {
        logout.mutate()
    }

    return (
        <div>
            <Outlet />
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}

