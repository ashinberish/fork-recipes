import { DefineRouteFunction } from "@remix-run/dev/dist/config/routes";

const routes = (route:DefineRouteFunction) => {
    route("auth", "authentication/layout.tsx", () => {
        route("signup", "authentication/signup/signup.tsx");
        route("login", "authentication/login/login.tsx");
      });
}
export default routes;