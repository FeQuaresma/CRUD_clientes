import { Alert } from "react-native";
import { Location } from "../app/(tabs)/_layout";
import { ModuleParam } from "../constants/moduleParamV2";

export const callAPI = async (link: any, value: any) => {
  let linkURL = `${link.paramBeginning}${value}${link.paramEnd}`;
  console.log(linkURL);

  try {
    const response = await fetch(linkURL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export function getAllValues(appJson: ModuleParam, location: Location) {
  const page = appJson.modules[location.module].pages[location.page].components;
  const exportedObject: any = {};

  Object.keys(page).forEach((component) => {
    if (page[component].inputType !== "button") {
      exportedObject[component] = page[component].value;
    }
  });

  return exportedObject;
}

export const enter8 = {
  getAllValues: (appJson: ModuleParam, location: Location) =>
    getAllValues(appJson, location),

  callAPI: (link: any, value: any) => callAPI(link, value),

  alert: (title:string) => Alert.alert(title),

  contador: 1
};
