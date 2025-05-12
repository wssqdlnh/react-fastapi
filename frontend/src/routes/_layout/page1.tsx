import { Button } from '@chakra-ui/react'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/page1')({
  component: RouteComponent,
})

function RouteComponent() {
  return (<>
    <Link to="/navigate/npage1"
      search={{ data: { name: 'liu', age: 18 } }}>
      <Button>Page 2</Button>
    </Link>
  </>)
}
