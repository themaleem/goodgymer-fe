const pathsByName = {
  homePath: {
    href: "/",
    metaTitle: "",
    type: "static",
    metaDescription: "",
  },
  signInPath: {
    type: "auth",
    metaTitle: "",
    metaDescription: "",
    href: "/auth/sign-in",
  },
  signUpPath: {
    type: "auth",
    metaTitle: "",
    metaDescription: "",
    href: "/auth/sign-up",
  },
  completeSignupPath: {
    type: "auth",
    metaTitle: "",
    metaDescription: "",
    href: "/auth/complete-signup",
  },
  currentUserPath: {
    type: "auth",
    href: "/users/logged_in_user",
    route: "/users/logged_in_user",
  },
  sessionsPath: {
    type: "dashboard",
    href: "/sessions",
    route: "/sessions/",
  },
  registeredSessionPath: {
    type: "dashboard",
    route: "/sessions/",
    href: "/sessions/registered",
  },
  newSessionPath: {
    type: "dashboard",
    href: "/sessions/new",
    route: "/sessions/",
  },
};

const pathsByHref = Object.values(pathsByName).reduce((acc, val) => {
  acc[val.href] = val;
  return acc;
}, {});

const getPath = (pathName, params = {}) => {
  const { href, route } = pathsByName[pathName];

  let as = href;
  let apiRoute = route;

  if (params) {
    Object.keys(params).forEach((key) => {
      if (apiRoute) apiRoute = apiRoute.replace(`[${key}]`, params[key]);
      as = as.replace(`[${key}]`, params[key]);
    });
  }

  const data = { href, as };
  if (apiRoute) data.route = apiRoute;
  return data;
};

const isPathType = (href, type) => pathsByHref[href].type === type;

export { getPath, isPathType };
