export function sumClass(classString: string, classes: any) {
  if (classString) {
    let classObj: any = {};
    classString.split(" ").forEach((className) => {
      classObj = { ...classObj, ...classes[className] };
    });
    return classObj;
  } else {
    return {};
  }
}
