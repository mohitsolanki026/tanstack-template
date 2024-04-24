import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/home')({
  component: () => <div>Hello /_protected/home!</div>
})