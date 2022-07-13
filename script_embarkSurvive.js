console.log('Embark Survive')

async function handleData() {

  const svg = d3.select('#svg_embarkSurvive')

  let data = await d3.json('titanic-passengers.json')
}

handleData()