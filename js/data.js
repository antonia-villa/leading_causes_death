// DATA SOURCE: https://catalog.data.gov/dataset/age-adjusted-death-rates-for-the-top-10-leading-causes-of-death-united-states-2013

// Retrieve Raw Data
var rawData = [];
var stateDate = [];
var yearData = [];
var causeData = [];

// Get Raw Data 
function retrieveRawData() {
 
  $.get('https://data.cdc.gov/api/views/bi63-dtpu/rows.json?accessType=DOWNLOAD')
  .done(function(response) {
     var data = response.data;
  
      for(var i=0; i< data.length; i++){
        var dataItem = data[i];
        var updatedItem = {
          'year': Number(dataItem[8]), 
          'category': dataItem[9],
          'cause': dataItem[10],
          'state': dataItem[11],
          'total': Number(dataItem[12])
        };

        rawData.push(updatedItem);
     };
     console.log('state data:', getStateData(rawData));
     console.log('year data:', getYearData(rawData));
     console.log('cause data:', getCauseData(rawData));
  });
    return rawData;
}

retrieveRawData();

function getYearData(rawData){
  var distinctYears = {};
  var years = [];

  for(var i = 0; i < rawData.length; i++){
    if(!distinctYears[rawData[i].year]){
      years.push(rawData[i].year);
      distinctYears[rawData[i].year] = rawData[i].total;
    }
    else {
      distinctYears[rawData[i].year] += rawData[i].total;
    }
  }
  return distinctYears;
}

function getCauseData(rawData){
  var distinctCauses = {};
  var causes = [];

  for(var i = 0; i < rawData.length; i++){
    if(!distinctCauses[rawData[i].cause]){
      causes.push(rawData[i].cause);
      distinctCauses[rawData[i].cause] = rawData[i].total;
    }
    else {
      distinctCauses[rawData[i].cause] += rawData[i].total;
    }
  }
  return distinctCauses;
}

function getStateData(rawData){
  var distinctStates = {};
  var states = [];

  for(var i = 0; i < rawData.length; i++){
    if(!distinctStates[rawData[i].state]){
      states.push(rawData[i].state);
      distinctStates[rawData[i].state] = rawData[i].total;
    }
    else {
      distinctStates[rawData[i].state] += rawData[i].total;
    }
  }
  return distinctStates;
}

//console.log(distinctStates);







