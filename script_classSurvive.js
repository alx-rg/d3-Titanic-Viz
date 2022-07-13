console.log('Class Survive')

async function handleData() {

  let data = await d3.json('titanic-passengers.json')

  const margin = { top: 30, right: 20, bottom: 10, left: 40 }
  const width = 950 - (margin.left + margin.right)
  const height = 500 - (margin.top + margin.bottom)

  const svg = d3.select('#svg_classSurvive')
   
}

handleData()