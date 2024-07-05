const callAPI = async (link: any, value: any) => {
  value = value.replace(/\D/g, "");
  if (value.toString().length === 8) {
    let linkURL = `${link.paramBeginning}${value}${link.paramEnd}`;
    console.log(linkURL);
    try {
      const response = await fetch(linkURL);
      const data = await response.json();
      //console.log('callAPI ln9: ',data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
};

export default callAPI;
