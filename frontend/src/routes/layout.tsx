import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/layout"!</div>
}
