import { Location } from "../app/(tabs)/_layout"
import { ModuleParam } from "../constants/moduleParamV2"

export function getAllValues(appJson: ModuleParam, location: Location){


  const page = appJson.modules[location.module].pages[location.page].components
  const exportedObject: any = {}



  Object.keys(page).forEach((component) => {
    if(page[component].inputType !== "button") {
      exportedObject[component] = page[component].value
    }
  })



  return exportedObject;
}