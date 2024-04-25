import { redirect } from "@tanstack/react-router"
import axios from "../axios"

export default async function protectedfun( location,queryClient){
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

}