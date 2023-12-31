export default function getCanadianData(data) {
  let canadianData = [];

  data.forEach(addData);
  function addData(item, index) {
    const names = data[index].name.split(', ');
    const lastName = names[0];
    const firstName = names[1];
    const hcpIndex = data[index].handicap;
    const playerObject = {
      lastName: lastName,
      firstName: firstName,
      hcpIndex: hcpIndex,
    };
    canadianData.push(playerObject);
  }

  return canadianData;
}
