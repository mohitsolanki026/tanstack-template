import { useAuth } from "@/lib/auth/authentication";
import axios from "@/lib/axios";
import { Outlet, createFileRoute, redirect, } from "@tanstack/react-router"

export const Route = createFileRoute('/_protected')({
    loader: async ({ location, context: { queryClient } }) => {
        const data = await queryClient.ensureQueryData({
            queryKey: ['/api/user'],
            queryFn: async() =>
                axios
                    .get("/api/user")
                    .then((res) => res.data)
                    .catch((error) => {
                        throw redirect({
                            to: '/login',
                            replace: false, 
            
            
                            //   search: {
                            //     // Use the current location to power a redirect after login
                            //     // (Do not use `router.state.resolvedLocation` as it can
                            //     // potentially lag behind the actual current location)
                            //     redirect: location.href,
                            //   },
                        })
                    }),
            retry: 1,
        })

    },

    component: Protected
})

function Protected() {

    //you can use either loader or bellow code both works properly
    //   const {user} = useAuth({
    //     middleware:"auth",
    //     redirectIfAuthenticated:"/login"
    //   })

    const {logout} = useAuth({
        middleware:"auth",
        redirectIfAuthenticated:"/login"
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

