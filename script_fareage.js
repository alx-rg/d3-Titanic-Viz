async function handleData() {

  const svg = d3.select('#svg_fareage')
    .style('border', 'solid 1px')

  let data = await d3.json('titanic-passengers.json')


  const getFaresAndAges = (data) => {
    
    const fares = data.map((fare) => fare.fields.fare)
    // console.log(fares)
    const filterFare = fares.filter((fare) => fare !== undefined)
    // console.log(filterFare)
    const fareLength = filterFare.length
    // console.log(fareLength)
    const age = data.filter((passenger) => passenger.fields.age & passenger.fields.fare);
    // console.log(age)
    return age
  }

  // console.log(getFaresAndAges(data));

  const fares = getFaresAndAges(data).map((fare) => fare.fields.fare)
  // console.log(fares)
  const maxFare = Math.max(...fares)
  // console.log(maxFare)
  const ages = getFaresAndAges(data).map((age) => age.fields.age)
  // console.log(a/ges)
  const maxAge = Math.max(...ages)
  // console.log(maxAge)

  const margin = { top: 30, right: 10, bottom: 20, left: 60 }
  const width = 800 - (margin.left + margin.right)
  const height = 500 - (margin.top + margin.top)

  const xscale = d3.scaleLinear()
    .domain([0, maxFare])
    .range([margin.left, width])

  const yscale = d3.scaleLinear()
    .domain([0, maxAge])
    .range([height, margin.bottom])

  const xAxis = d3.axisBottom(xscale)
  svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis)

  const yAxis = d3.axisLeft(yscale)
  svg
    .append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(yAxis)
  
  const bottomText = svg
    .append('g')

  bottomText
    .append('text')
    .text('Cost of Tickets')
    .attr('transform', `translate(${width / 2.2}, ${height + 40})`)

  const yText = svg
    .append('g')

  yText
    .append('text')
    .text('Age of Passenger')
    .attr('transform', `translate(${margin.top}, ${height / 1.5}) rotate(270) `)


  svg
    .append('g')
    .selectAll('circle')
    .data(getFaresAndAges(data))
    .enter()
    .append('circle')
    .attr('cx', (d) => xscale(d.fields['fare']))
    .attr('cy', (d) => yscale(d.fields['age']))
    .attr('r', 6)
    .attr('stroke', 'rgba(0, 0, 0, 0.2)')
    .attr('fill', d => {
        if (d.fields["survived"] === "Yes") {
          return "rgba(60, 179, 113, 0.5)"
        }
        return "rgba(255, 0, 0, 0.5)"
    })

  const title = svg
    .append('g')

  title
    .append('text')
    .text('Survival of Passengers based on Price of Tickets and Age')
    .attr('transform', `translate(${width / 2 - 140}, 30)`)
    .attr('class', 'labelText')

}

handleData()