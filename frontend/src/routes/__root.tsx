import { Tabs } from '@chakra-ui/react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: Root,
})
function Root() {
  const modules = import.meta.glob('./_layout/*.tsx');
  const pagePaths = Object.keys(modules).map(path =>
    path.replace('./_layout', '').replace('.tsx', '')
  );
  console.log(pagePaths)
  return (
    <>
      <Link to='/page1'></Link>
      <Tabs.Root>
        <Tabs.List>
          {pagePaths.map((path) => (
            <Tabs.Trigger value={path} as={Link} to={path}>
              {path}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}
