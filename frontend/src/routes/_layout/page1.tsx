import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/page1')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/page1"!</div>
}
