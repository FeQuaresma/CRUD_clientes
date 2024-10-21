import { DataRow } from "../types";

export interface Location {
  module: string;
  page: string;
  field: string;
}
export interface Param {
  label?: string;
  inputType:
    | "input"
    | "select"
    | "multiSelect"
    | "boolean"
    | "date"
    | "file"
    | "grid"
    | "table"
    | "button"
    | "textBox"
    | "image"
    | "text"
    | "video"
    | "sound";
  inputMode?: "numeric" | "text" | "tel";
  value: string | { start: string; end: string };
  placeholder?: string;
  masks?: string[] | [RegExp, string, number][];
  valueMasked?: string | { start: string; end: string };
  maxLength?: number;
  options?: { label: string; value: string }[];
  style?: object;
  isNumber?: boolean;
  zeroTrim?: boolean;
  isCurrency?: boolean;
  class?: string;
  source?: string;
}

export interface pageParam extends Param {
  isRequired: boolean;
  isEditable: boolean;
  isLocked?: boolean;
  function?: any;
  link?: {
    paramBeginning: string;
    paramSize: number;
    paramEnd: string;
    type: "fillform" | "errorMsg" | null;
  };
  quebraDeLinha?: boolean;
  table?: TableInterface;
  errorMsg?: string;
  class?: string;
}

export interface TableInterface {
  dataTable?: DataRow[];
  dataOrigin?: DataRow[];
  tableSettings: {
    title?: string;
    tableCss?: {};
    tableSort?: string;
    tableURL?: string;
    hasSearchBar: boolean;
  };
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
