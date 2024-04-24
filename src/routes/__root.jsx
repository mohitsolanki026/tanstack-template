import { createRootRoute, createRootRouteWithContext, Link, Outlet, redirect, useLoaderData } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRouteWithContext()({
  component: Root,
  errorComponent: ({ error }) =>
  <p>something went wrong reload the page</p>
})
 function Root() {

  return (
      <>
        <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
            dashboard
          </Link>{' '}
          <Link to="/home" className="[&.active]:font-bold">
            Home
          </Link>{' '}
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
      </>
    )
}



