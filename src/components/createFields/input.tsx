import { styles } from "@/src/constants/styles";
import { callAPI, validateCPF } from "@/src/functions";
import { useState } from "react";
import { TextInput } from "react-native";

export default function Input({ field, onValueChange }: any) {
  let errorMsg: any;
  let fillForm: any;

  function handleFunctions(){
    if (field.function) {
      for(let func in field.function){
        console.log(func)
      }
    }
  }

  return (
    <TextInput
      placeholder={field.placeholder}
      style={{ ...styles.input, ...field.customStyle }}
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
        handleFunctions();
        onValueChange(e, fillForm, errorMsg);
      }}
    />
  );
}
