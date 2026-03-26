import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Navigation from "@/components/layout/Navigation";

const RootLayout = () => (
  <>
    <header>
      <Navigation />
    </header>
    <hr />
    <main>
      <Outlet />
    </main>

    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
