console.log('Embark Survive')

async function handleData() {

  const svg = d3.select('#svg_embarkSurvive')

  let data = await d3.json('titanic-passengers.json')

  const embarkedIn = data.filter((passenger) => passenger.fields.embarked !== undefined)
  // console.log(embarkedIn)
  const survivedYes = data.filter((passenger) => passenger.fields.survived !== "Yes" & passenger.fields.embarked !== undefined)
  const survivedNo = data.filter((passenger) => passenger.fields.survived !== "No" & passenger.fields.embarked !== undefined)
  // console.log(survivedYes)
  // console.log(survivedNo)

  const getFilteredResults = (data, property) => {
    const filteredResults = data.filter((filter) => filter.fields[property] !== undefined)
    const getAllUniqueValues = filteredResults.reduce((acc, passenger) => {
      const propertyValues = passenger.fields[property]
      return { [propertyValues]: propertyValues, ...acc }
    }, {}) 
  
    return Object.values(getAllUniqueValues)
  }
  // console.log(getFilteredResults(data, "embarked"))

  





}

handleData()