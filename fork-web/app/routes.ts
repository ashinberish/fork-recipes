import { DefineRouteFunction } from "@remix-run/dev/dist/config/routes";

const routes = (route: DefineRouteFunction) => {
  route("auth", "authentication/layout.tsx", () => {
    route("signup", "authentication/signup/signup.tsx", { index: true });
    route("login", "authentication/login/login.tsx");
  });

  route("/", "layouts/feeds-layout.tsx", () => {
    route("", "pages/feeds/feeds.tsx", { index: true })
  })
}
export default routes;