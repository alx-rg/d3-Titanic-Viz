console.log('Class Survive')

async function handleData() {

  let data = await d3.json('titanic-passengers.json')

  const cabins = data.filter((cabin) => cabin.fields.cabin && cabin.fields.survived)
  console.log(cabins)

  const getFirstLetterCabins = (data, property) => {
    const filteredResults = data.filter((filter) => filter.fields[property] !== undefined)
    const getAllUniqueValues = filteredResults.reduce((acc, passenger) => {
      const propertyValues = passenger.fields[property][0]
      return { [propertyValues]: propertyValues, ...acc }
    }, {}) 
  
    return Object.values(getAllUniqueValues)
  }
  console.log(getFirstLetterCabins(data, "cabin"))


  const getCabinSurvival = (data, cabin, status, color) => {
    const survived = status === 'Lived' ? 'Yes' : 'No';
    return {
      count: data.filter((passenger) => passenger.fields.cabin[0] === cabin && passenger.fields.survived === survived).length,
      cabin: cabin,
      status: status,
      color: color
    }
  };

  const cabinWithSurvivors = [
    getCabinSurvival(cabins, 'A', 'Lived', "rgba(60, 179, 113, 0.5)"),
    getCabinSurvival(cabins, 'A', 'Died', "rgba(255, 0, 0, 0.5)"),
    getCabinSurvival(cabins, 'B', 'Lived', "rgba(60, 179, 113, 0.5)"),
    getCabinSurvival(cabins, 'B', 'Died', "rgba(255, 0, 0, 0.5)"),
    getCabinSurvival(cabins, 'C', 'Lived', "rgba(60, 179, 113, 0.5)"),
    getCabinSurvival(cabins, 'C', 'Died', "rgba(255, 0, 0, 0.5)"),
    getCabinSurvival(cabins, 'D', 'Lived', "rgba(60, 179, 113, 0.5)"),
    getCabinSurvival(cabins, 'D', 'Died', "rgba(255, 0, 0, 0.5)"),
    getCabinSurvival(cabins, 'E', 'Lived', "rgba(60, 179, 113, 0.5)"),
    getCabinSurvival(cabins, 'E', 'Died', "rgba(255, 0, 0, 0.5)"),
    getCabinSurvival(cabins, 'F', 'Lived', "rgba(60, 179, 113, 0.5)"),
    getCabinSurvival(cabins, 'F', 'Died', "rgba(255, 0, 0, 0.5)"),
    getCabinSurvival(cabins, 'G', 'Lived', "rgba(60, 179, 113, 0.5)"),
    getCabinSurvival(cabins, 'G', 'Died', "rgba(255, 0, 0, 0.5)"),
  ]

  console.log(cabinWithSurvivors) 

  const margin = { top: 30, right: 20, bottom: 10, left: 40 }
  const width = 800 - (margin.left + margin.right)
  const height = 500 - (margin.top + margin.bottom)

  const svg = d3.select('#svg_classSurvive')

  const xScale = d3.scaleBand()
    .domain(cabinWithSurvivors)
    .range([margin.left, width + margin.left])
    .padding(0.05)

  const xScaleName = d3.scaleBand()
    .domain(cabinWithSurvivors.map(d => `${d.cabin} ${d.status}`))
    .range([margin.left, width + margin.left])
    .padding(0.05)

  const cabinSurvivors = d3.extent(cabinWithSurvivors, d => d.count)
  const yScale = d3.scaleLinear()
    .domain(cabinSurvivors)
    .range([height, margin.top])

  const title = svg
    .append('g')

  title
    .append('text')
    .text('Status Of the Passengers with Cabin Information')
    .attr('transform', `translate(${width / 2 - (margin.left + margin.right)}, 20)`)
    .attr('class', 'graphText')

  const barGroup = svg.append('g')

  barGroup
    .selectAll('rect')
    .data(cabinWithSurvivors)
    .enter()
    .append('rect')
    .attr('class', d => d.name)
    .attr('x', d => xScale(d))
    .attr('y', d => yScale(d.count))
    .attr('height', d => height - yScale(d.count))
    .attr('width', xScale.bandwidth())
    .attr('stroke', "black")
    .attr('fill', (d) => d.color)
    .attr('opacity', 0.25)

  const bottomAxis = d3.axisBottom(xScaleName)

  const leftAxis = d3.axisLeft(yScale)

  svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(bottomAxis)

  svg
    .append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(leftAxis)

  
}

handleData()