import { match } from "path-to-regexp";
import React, { Children } from "react";
import { useEffect, useState } from "react";
import { POP_STATE_EVENT, PUSH_STATE_EVENT } from "./Link";
import { $404 } from "../pages/404";
import { RouteInterface } from "../routes";
import { getCurrentPath } from "../utils";

interface Props {
  children?:
    | React.ReactElement<RouteInterface>[]
    | React.ReactElement<RouteInterface>;
  routes: RouteInterface[];
  defaultComponent?: React.FC;
}

export const Router: React.FC<Props> = ({
  children,
  routes,
  defaultComponent = $404,
}) => {
  const [currentPath, setCurrentPath] = useState<string>(getCurrentPath);

  let routeParams;

  const routesFromChildren = Children.map(children, (children) => {
    return children!.props;
  });

  const routesToUse = routes.concat(routesFromChildren!);

  useEffect(() => {
    const onLocationChanged = () => {
      setCurrentPath(getCurrentPath);
    };
    window.addEventListener(POP_STATE_EVENT, onLocationChanged);
    window.addEventListener(PUSH_STATE_EVENT, onLocationChanged);
    return () => {
      window.removeEventListener(POP_STATE_EVENT, onLocationChanged);
      window.removeEventListener(PUSH_STATE_EVENT, onLocationChanged);
    };
  }, []);

  let ComponentToRender = defaultComponent;

  try {
    ComponentToRender =
      routesToUse.find((route) => {
        const path = route?.path;
        const cleanedPath = path?.reduce((_, path) => path);
        if (cleanedPath?.includes(currentPath)) return true;
        const urlMatcher = match(cleanedPath, { decode: decodeURIComponent });
        const urlMatched = urlMatcher(currentPath);
        if (!urlMatched) return false;
        routeParams = urlMatched.params;
        return true;
      })?.component || defaultComponent;
  } catch (e) {}

  return <ComponentToRender routeParams={routeParams} />;
};
