export const genPlot = (plot) => {

  let graphCoords = "M0 ";
  let signal = plot;

  
  for (var i = 0; i < signal.length; i++) {
    graphCoords = graphCoords + signal[i] + '  L ' + Number(10+i*10) + ' '
  }

  return  graphCoords

  
}
