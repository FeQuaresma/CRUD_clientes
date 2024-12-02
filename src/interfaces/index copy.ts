import { DataRow, Tcss, TableCss, SortedCol } from "../types";

export interface Component {
  label?: string;
  type:
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
    | "sound"
    | "googleMap";
  value: string | { start: string; end: string };
  inputMode?: 
    | "none"
    | "text"
    | "decimal"
    | "numeric"
    | "tel"
    | "search"
    | "email"
    | "url";
  placeholder?: string;
  masks?: string[] | [RegExp, string, number][];
  valueMasked?: string | { start: string; end: string };
  maxLength?: number;
  optionsItems?: { label: string; value: string }[];
  style?: Tcss;
  zeroTrim?: boolean;
  isCurrency?: boolean;
  classCss?: string;
  sourceURL?: string;
  token?: string;
}

export interface PageComponent extends Component {
  isRequired: boolean;
  isEditable: boolean;
  function?: any;
  onPress: string;
  onLongPress: string;
  tableProperties?: TableInterface;
  errorMsg?: string;
  groupTab?: string;
}

export interface TableInterface {
  dataView?: DataRow[];
  dataOrigin?: DataRow[];
  settings: {
    title?: string;
    style?: TableCss;
    sort?: SortedCol;
    URL?: string;
    hasSearchBar: boolean;
  };
  columns: {
    [key: string]: TableComponent;
  };
}


export interface TableComponent extends Component {
  style?: TableCss;
  width: number;
  isVisible: boolean;
  searchParam?: string[] | [RegExp, string][];
  footerLabel?: { function: "sumEntries" | "sumTotal"; value: string };
  cellMasks?: string[] | [RegExp, string, number][];
  callbackMask?: [RegExp, string];
  searchSign?: "equals" | "greater-than" | "less-than";
}
