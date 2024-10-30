import { pageParam } from "../interfaces";

export type DataRow = {
  [key: string]: string;
};

export type DataTable = {
  formAtual: DataRow[];
  [key: string]: any;
};

export type SortedCol = {
  name: string;
  order: "asc" | "desc";
};

export type ModuleParam = {
  temp?: boolean,
  style?: { [key: string]: any };
  modules: { [key: string]: Module };
  console: { log: string};
  classString?: string[];
  class?: { [key: string]: { [key: string]: string | number } };
  [key: string]: any;
};

export type Module = {
  varNames?: string[];
  funcNames?: string[];
  variables?: any;
  stringFunctions?: string[];
  functions?: any;
  moduleName: string;
  moduleSettings?: {
    navBar?: { classCss?: string; styles?: {} };
    navBarText?: { classCss?: string; styles?: {} };
  };

  pages: {
    [key: string]: {
      pageName: string;
      pageSettings?: { mainView?: { style?: any; class?: string } };
      components: { [key: string]: pageParam };
    };
  };
  
};