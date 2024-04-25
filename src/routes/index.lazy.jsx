import { useAuth } from '@/lib/auth/authentication'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {

  return (
    <div className="p-2">
      <h3>Welcome dashboard!</h3>
    </div>
  )
}