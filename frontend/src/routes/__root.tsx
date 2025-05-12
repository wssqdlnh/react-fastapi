import { ColorModeButton } from '@/components/ui/color-mode';
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
  return (
    <>
      <Link to='/page1'></Link>
      <Tabs.Root>
        <Tabs.List>
          <Tabs.Trigger value='home' as={Link} to='/' {...{} as any}>
            home
          </Tabs.Trigger>
          {pagePaths.map((path) => (
            <Tabs.Trigger key={path} value={path} as={Link} to={path} {...{} as any}>
              {path}
            </Tabs.Trigger>
          ))}
          <ColorModeButton />
        </Tabs.List>
      </Tabs.Root>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}
