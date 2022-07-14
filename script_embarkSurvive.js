console.log('Embark Survive')

async function handleData() {

  const svg = d3.select('#svg_embarkSurvive')

  let data = await d3.json('titanic-passengers.json')
  const embarked = data.filter((embarked) => embarked.fields.embarked && embarked.fields.survived)
  console.log(embarked)

  const getFirstLetterembarkeds = (data, property) => {
    const filteredResults = data.filter((filter) => filter.fields[property] !== undefined)
    const getAllUniqueValues = filteredResults.reduce((acc, passenger) => {
      const propertyValues = passenger.fields[property][0]
      return { [propertyValues]: propertyValues, ...acc }
    }, {}) 
  
    return Object.values(getAllUniqueValues)
  }
  console.log(getFirstLetterembarkeds(data, "embarked"))


  const getembarkedSurvival = (data, embarked, status, color) => {
    const survived = status === 'Lived' ? 'Yes' : 'No';
    return {
      count: data.filter((passenger) => passenger.fields.embarked === embarked && passenger.fields.survived === survived).length,
      embarked: embarked,
      status: status,
      color: color
    }
  };

  const embarkedWithSurvivors = [
    getembarkedSurvival(embarked, 'S', 'Lived', "rgba(0, 0, 255, 1)"),
    getembarkedSurvival(embarked, 'S', 'Died', "rgba(0, 0, 0, 1)"),
    getembarkedSurvival(embarked, 'Q', 'Lived', "rgba(0, 0, 255, 1)"),
    getembarkedSurvival(embarked, 'Q', 'Died', "rgba(0, 0, 0, 1)"),
    getembarkedSurvival(embarked, 'C', 'Lived', "rgba(0, 0, 255, 1)"),
    getembarkedSurvival(embarked, 'C', 'Died', "rgba(0, 0, 0, 1)"),
  ]

  console.log(embarkedWithSurvivors) 

  const margin = { top: 30, right: 20, bottom: 10, left: 40 }
  const width = 800 - (margin.left + margin.right)
  const height = 500 - (margin.top + margin.bottom)

  const xScale = d3.scaleBand()
    .domain(embarkedWithSurvivors)
    .range([margin.left, width + margin.left])
    .padding(0.05)

  const xScaleName = d3.scaleBand()
    .domain(embarkedWithSurvivors.map(d => `${d.embarked} ${d.status}`))
    .range([margin.left, width + margin.left])
    .padding(0.05)

  const embarkedSurvivors = d3.extent(embarkedWithSurvivors, d => d.count)
  const yScale = d3.scaleLinear()
    .domain(embarkedSurvivors)
    .range([height, margin.top])

  const title = svg
    .append('g')

  title
    .append('text')
    .text('Status Of the Passengers Who Embarked at Different Locations')
    .attr('transform', `translate(${width / 2 - (margin.left + margin.right)}, 20)`)
    .attr('class', 'graphText')

  const barGroup = svg.append('g')

  barGroup
    .selectAll('rect')
    .data(embarkedWithSurvivors)
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