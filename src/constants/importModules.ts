export const moduleMap: { [key: string]: () => Promise<any> } = {
  "react-native": () => import("react-native"),
  validateCPF: () => import("src/functions/validateCPF"),
};
