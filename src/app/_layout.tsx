import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from ".";
import MyApp from "./(tabs)/_layout";
import { useEffect } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    
    const teste = "pessoa";
    const appClasses:any = {}
    
    function addClass(className:any, classe:any){
      appClasses[className] = classe;
    }
    const func = new Function("className","addClass", `
      class Pessoa {
        constructor(name) {
          this.name = name;
        }
        consoleLog() {
          return "teste classe funcionou";
        }
      };
    
      addClass(className, pessoa)
    `);
    
    func(teste, addClass)
    
    console.log(appClasses)
    
    const pessoa = new appClasses[teste]("Felipe");
    console.log(pessoa.name);
    console.log(pessoa.consoleLog());

  }, []);

  return (
    <Stack.Navigator
      initialRouteName="teste"
      screenOptions={{
        headerShown: false,
        orientation: "all",
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="index" component={Index} />
      <Stack.Screen name="(tabs)" component={MyApp} />
    </Stack.Navigator>
  );
}
