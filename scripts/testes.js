const exlink = {
  paramBeginning: "https://viacep.com.br/ws/",
  paramSize: 8,
  paramEnd: "/json/",
  type: "fillform",
}
const exvalue = "03019000"

const callAPI = async (link, value) => {
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

const fetchData = async () => {
  const result = await callAPI(exlink, exvalue);
  console.log("Result:", result);
};

fetchData()