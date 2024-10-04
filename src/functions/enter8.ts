import { Alert } from "react-native";
import { Location } from "../app/(tabs)/_layout";
import { ModuleParam } from "../constants/moduleParamV2";
import React from "react";

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

export function getValue(appJson: ModuleParam, location: Location) {
  return appJson.modules[location.module].pages[location.page].components[
    location.field
  ].value;
}

export function fillForm(
  appJson: ModuleParam,
  setAppJson: React.Dispatch<React.SetStateAction<ModuleParam>>,
  formData: any,
  location: Location
) {
  // console.log("appJson", appJson);
  // console.log("setAppJson", setAppJson);
  // console.log("formData", formData);
  // console.log("location", location);

  console.log(
    Object.keys(
      appJson.modules[location.module].pages[location.page].components
    )
  );
  console.log(
    appJson.modules[location.module].pages[location.page].components.estado
  );
  console.log(formData);

  Object.keys(formData).map((formField) => {
    if (
      appJson.modules[location.module].pages[location.page].components[
        formField
      ]
    ) {
      setAppJson((prevForm: ModuleParam) => ({
        ...prevForm,
        modules: {
          ...prevForm.modules,
          [location.module]: {
            ...prevForm.modules[location.module],
            pages: {
              ...prevForm.modules[location.module].pages,
              [location.page]: {
                ...prevForm.modules[location.module].pages[location.page],
                components: {
                  ...prevForm.modules[location.module].pages[location.page]
                    .components,
                  [formField]: {
                    ...prevForm.modules[location.module].pages[location.page]
                      .components[formField],
                    value: formData[formField],
                  },
                },
              },
            },
          },
        },
      }));
    }
  });
}

export function validateCPF(cpf: string) {
  if (cpf.length != 11) {
    return false;
  } else {
    let firstDigit = 0;
    let secondDigit = 0;
    for (let i = 0; i < 10; i++) {
      i < 9 ? (firstDigit += Number(cpf[i]) * (i + 1)) : null;
      secondDigit += Number(cpf[i]) * i;
    }
    firstDigit = firstDigit % 11 >= 10 ? 0 : firstDigit % 11;
    secondDigit = secondDigit % 11 >= 10 ? 0 : secondDigit % 11;
    if (String(firstDigit) != cpf[9] || String(secondDigit) != cpf[10]) {
      return false;
    } else {
      return true;
    }
  }
}

export const enter8 = {
  getAllValues: (appJson: ModuleParam, location: Location) =>
    getAllValues(appJson, location),

  getValue: (appJson: ModuleParam, location: Location) =>
    getValue(appJson, location),

  callAPI: (link: any, value: any) => callAPI(link, value),

  alert: (title: string) => Alert.alert(title),

  fillForm: (
    appJson: ModuleParam,
    setAppJson: React.Dispatch<React.SetStateAction<ModuleParam>>,
    formData: {},
    location: Location
  ) => fillForm(appJson, setAppJson, formData, location),

  validateCPF: (cpf: string) => validateCPF(cpf),

};
