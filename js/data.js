// DATA SOURCE: https://catalog.data.gov/dataset/age-adjusted-death-rates-for-the-top-10-leading-causes-of-death-united-states-2013

// Data Sets
var rawData = [];
var stateData = [];
var yearData = [];
var causeData = [];
var stateYearData = []
var stateYearDataAdjusted = []

// Unique Values
var years = [];
var causes = [];
var states = [];

// Load Page Content
document.addEventListener("DOMContentLoaded", function() {

  document.getElementById('introText').style.display = 'block';
  document.getElementById('dataVisual').style.display = 'none';
  loadVisual();
});


function loadVisual(){
  $("#enterPage").click(function(e){
      e.preventDefault();
    document.getElementById('introText').style.display = 'none';
    document.getElementById('dataVisual').style.display = 'block';
      retrieveRawData();
  })
}


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

        if(updatedItem.state != 'United States'){
        rawData.push(updatedItem);
      }
     };

     // Create sub-data sets
     stateData = getStateData(rawData);
     yearData = getYearData(rawData);
     causeData = getCauseData(rawData);

    // load visual data
    causeVisual();
    addCauseEventListeners();
    return rawData;
  });
}

// Create Year Data Set
function getYearData(rawData){
  var distinctYears = [];

  for(var i = 0; i < rawData.length; i++){
    if(!distinctYears[rawData[i].year]){
      years.push(rawData[i].year);
      distinctYears[rawData[i].year] = rawData[i].total;
    }
    else {
      distinctYears[rawData[i].year] += rawData[i].total;
    }
  }
  return years;
  return distinctYears;
}

// Create Year Cause Data Set
function getCauseData(rawData){
  var distinctCauses = [];

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

// Create State Cause Data Set
function getStateData(rawData){
  var distinctStates = [];

  for(var i = 0; i < rawData.length; i++){
    if(!distinctStates[rawData[i].state]){
      states.push(rawData[i].state);
      distinctStates[rawData[i].state] = rawData[i].total;
    }
    else {
      distinctStates[rawData[i].state] += rawData[i].total;
    }
  }
  return states;
  return distinctStates;
}

function stateCauseData(cause) {
  for(var i=0; i< states.length; i++){
    var stateObject = {'state': states[i]};
    var stateTotal = 0;

      for(var j=0; j< rawData.length;j++){
          if(rawData[j].state === states[i] && rawData[j].cause === cause){
              var year = rawData[j].year;
              stateObject[year] = rawData[j].total;
              stateTotal = stateTotal + rawData[j].total;
              stateObject['total'] = stateTotal
          }
      }
    stateYearData.push(stateObject);
  }

  return stateYearData;
}




