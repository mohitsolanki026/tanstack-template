import { useAuth } from "@/lib/auth/authentication";
import protectedfun from "@/lib/auth/protected";
import axios from "@/lib/axios";
import { Outlet, createFileRoute, redirect, } from "@tanstack/react-router"

export const Route = createFileRoute('/_protected')({
    loader: async ({ location, context: { queryClient } }) => protectedfun(location, queryClient),
    component: Protected,
    // pendingComponent: () => <div>Loading...</div>,
    // errorComponent: () => <div>Error</div>,
})

function Protected() {

    //you can use either loader or bellow code both works properly
    //   const {user} = useAuth({
    //     middleware:"auth",
    //     redirectIfAuthenticated:"/login"
    //   })

    const { logout, isError } = useAuth({
        middleware: "auth",
        redirectIfAuthenticated: "/login"
    })

    if (isError) {
        return <div>Error</div>
    }

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

