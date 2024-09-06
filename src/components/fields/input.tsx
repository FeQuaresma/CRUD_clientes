import * as React from "react";
import { styles } from "@/src/constants/styles";
import { TextInput } from "react-native";

export default function Input({ field, onValueChange }: any) {
  let errorMsg: any;
  let fillForm: any;

  return (
    <TextInput
      placeholder={field.placeholder}
                    
      style={{ ...styles.input, ...field.customInputCSS}}
      value={field.valueMasked ? field.valueMasked : field.value}
      inputMode={field.inputMode}
      maxLength={field.maxLength}
      onChangeText={async (e) => {
        // const apiData =
        //   field.link && e.length === field.link.paramSize
        //     ? await callAPI(field.link, e)
        //     : null;

        // if (field.function && field.function.includes("validateCPF")) {

        //   objetoParametro = {}
        //   for(i in field.function.parametro)]
        //   {
        //     objetoParametro[i]
        //   }
        //   teste = eval()
        //   retornoobjeto = teste.json
        //   if ( retornoobjeto.mensagem )
        //   if ( retornoobjeto.preencherForm)
        //   if ( retornoobjeto.mudarjanela )

        //   !validateCPF(e) ? (errorMsg = "CPF inválido") : (errorMsg = "");
        // }
        onValueChange(e, fillForm, errorMsg);
      }}
    />
  );
}
