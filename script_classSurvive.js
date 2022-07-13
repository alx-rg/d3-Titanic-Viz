console.log('Class Survive')

async function handleData() {

  let data = await d3.json('titanic-passengers.json')

  // const getFaresAndAges = (data) => {
    
    // const cabins = data.filter((cabin) => cabin.fields.cabin && cabin.fields.survived)
    // console.log(cabins)
    // const filterCabin = cabins.filter((cabin) => cabin !== undefined)
    // console.log(filterCabin)
    // const firstLetterCabins = filterCabin.map((cabin) => cabin[0])
    // console.log(firstLetterCabins)
    // const fareLength = filterFare.length
    // console.log(fareLength)
    // const age = data.filter((passenger) => passenger.fields.age & passenger.fields.fare);
    // console.log(age)
    // return age
  // }

  // console.log(getFaresAndAges(data));

  // const getFirstLetterCabins = (data, property) => {
  //   const filteredResults = data.filter((filter) => filter.fields[property] !== undefined)
  //   const getAllUniqueValues = filteredResults.reduce((acc, passenger) => {
  //     const propertyValues = passenger.fields[property][0]
  //     return { [propertyValues]: propertyValues, ...acc }
  //   }, {}) 
  
  //   return Object.values(getAllUniqueValues)
  // }
  // // console.log(getFirstLetterCabins(data, "cabin"))

  // const getCabinSurvival = (data) => {
  //   const newArray = [];
  //   const cabinLevels = getFirstLetterCabins(data, 'cabin')
  //   const cabinSurvived = data.filter((cabin) => cabin.fields.cabin && cabin.fields.survived)
  //   console.log(cabinSurvived)
  //   const buckets = cabinLevels.length
  //   // console.log(buckets)

  //   for (let i = 0; i < buckets; i++){
  //     newArray.push({
  //       cabinLevel: "",
  //       lived: 0,
  //       died: 0,
  //       total: 0,
  //     })
  //   }

  //   for (const passenger of cabinSurvived){
  //     const bucket = passenger.fields.cabin[0]
  //     console.log(`What is the bucket after going through the passenger : ${bucket}`)
  //     console.log(newArray)
  //     const index = newArray.findIndex((obj) => obj.cabinLevel === bucket)
  //     console.log(newArray)
  //     console.log(`This is the index: ${index}`)
  //     newArray[index].total += 1;
  //     passenger.fields.survived === "Yes" ? newArray[index].lived += 1 : newArray[index].died += 1;
  //   }
  //   // console.log(cabinLevels, cabinSurvived, buckets)
  //   return newArray;
  // }

  // console.log(getCabinSurvival(data))

  

  const margin = { top: 30, right: 20, bottom: 10, left: 40 }
  const width = 950 - (margin.left + margin.right)
  const height = 500 - (margin.top + margin.bottom)

  const svg = d3.select('#svg_classSurvive')
   
}

handleData()