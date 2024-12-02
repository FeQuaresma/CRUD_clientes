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

export type TableCss = {

  header?: Tcss;
  cell?: Tcss;
  footer?: Tcss;
  column?: Tcss;
  headerText?: Tcss;
  cellText?: Tcss;
  footerText?: Tcss;
  columnText?: Tcss;

}

export interface Location {
  module: string;
  page: string;
  component: string;
  }

export type Tcss = { [key:string]: string | number | boolean };

export type ProgramProperties = {
  temp?: boolean;
  style?: {[key:string]: Tcss};
  console: string;
  classCssString?: string[];
  classCss?: { [key: string]: Tcss };
  [key: string]: function; // Funções nativas do sistema
  modules: { [key: string]: ModuleProperties };
};

export type ModuleProperties = {
  name: string;
  stringFunctions?: string[];
  style?: Tcss;
  variables?: any;
  functions?: any;
  pages: {
    [key: string]: {
      name: string;
      style?: Tcss;
      components: { [key: string]: pageComponent };
    };
  };
};

