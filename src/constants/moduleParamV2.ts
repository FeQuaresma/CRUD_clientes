import { FunctionJson } from "../functions/executeJsonFunctions";

export interface Param {
  label?: string;
  inputType: string;
  inputMode?: string;
  value: string | { start: string; end: string };
  placeholder?: string;
  masks?: string[] | [RegExp, string, number][];
  valueMasked?: string | { start: string; end: string };
  maxLength?: number;
  options?: { label: string; value: string }[];
  customInputCSS?: object;
  isNumber?: boolean;
  zeroTrim?: boolean;
  isCurrency?: boolean;
}

export interface pageParam extends Param {
  isRequired: boolean;
  isEditable: boolean;
  isLocked?: boolean;
  function?: FunctionJson;
  link?: {
    paramBeginning: string;
    paramSize: number;
    paramEnd: string;
    type: "fillform" | "errorMsg" | null;
  };
  quebraDeLinha?: boolean;
  tableParam?: TableInterface;
}

export interface TableInterface {
  tableSettings: {
    tableCss?: {}
    tableSort?: string;
    tableURL?: string;
    hasSearchBar: boolean
  }
  tableParam?: {
    [key: string]: TableParam;
  };
}

export interface TableParam extends Param {
  customHeaderCSS?: object;
  customCellCSS?: object;
  customFooterCSS?: object;
  customColumnCSS?: object;
  customHeaderTextCSS?: object;
  customCellTextCSS?: object;
  customFooterTextCSS?: object;
  customColumnTextCSS?: object;
  tableWidth: number;
  isVisible: boolean;
  searchParam?: string[] | [RegExp, string][];
  footerLabel?: { function: "sumEntries" | "sumTotal"; value: string };
  cellMasks?: string[] | [RegExp, string, number][];
  callbackMask?: [RegExp, string];
  searchSign?: "equals" | "greater-than" | "less-than";
}

export type ModuleParam = {
  globalSettings: { CSS: {} };
  modules: {
    [key: string]: {
      moduleSettings: { CSS: {} };
      pages: { pageSettings: { CSS: {} }; components: { [key: string]: {} } };
    };
  };
};

export const modulesParam: any = {
  globalSettings: {},
  modules: {},
};
