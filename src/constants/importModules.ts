export const moduleMap: { [key: string]: () => Promise<any> } = {
  "react-native": () => import("react-native"),
  appFunctions: () => import("src/functions/appFunctions"),
  enter8: () => import("src/functions/enter8"),
};
