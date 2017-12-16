// DATA SOURCE: https://catalog.data.gov/dataset/age-adjusted-death-rates-for-the-top-10-leading-causes-of-death-united-states-2013

// Reformated Raw Data
var rawData = [];

// Single Variable Datasets
var stateData = [];
var yearData = [];
var causeData = [];

// Multi-Variable Datasets
var stateYearData = [];
var stateYearDataAdjusted = [];
var causebyStatebyYear =[];

// Unique Values for legends 
var years = [];
var causes = [];
var states = [];

  // Define Color Palette 
  var colors = ['#49787e','#b3d2cd','#06304e','#86a6a2','#305b65','#97beb7','#154e67','#6a9e9d','#84b4bc','#ececec','#2a4648', '#cbdeef', '#8bb4db', '#3579b0', '#616167', '#2d436e', '#38383c']  



// Load Introductory Page
document.addEventListener('DOMContentLoaded', function() {
  $('#introText').css('display','block');
  $('#dataVisual').css('display','none');
  loadCauseVisual();
});


function loadCauseVisual(){
  $('#enterPage').click(function(e){
    e.preventDefault();
    $('#introText').css('display','none');
    $('#dataVisual').css('display','block');
    retrieveRawData();
  })
}


// Get Raw Data 
function retrieveRawData() {
 
  $.get('https://data.cdc.gov/api/views/bi63-dtpu/rows.json?accessType=DOWNLOAD')
  .done(function(response) {

     var data = response.data;
    
      // Restructure Data Set
      for(var i=0; i< data.length; i++){
        var dataItem = data[i];

        var updatedItem = {
          'year': Number(dataItem[8]), 
          'category': dataItem[9],
          'cause': dataItem[10],
          'state': dataItem[11],
          'total': Number(dataItem[12])
        };

        // Cleanse Data
        if(updatedItem.state != 'United States'){
        rawData.push(updatedItem);
      }
     };

     // Create sub-data sets
     stateData = getStateData(rawData);
     yearData = getYearData(rawData);
     causeData = getCauseData(rawData);

    // Load First Visual: Least granular data set 
    causeVisual();
    addCauseEventListeners();

    return rawData;
  });
}

// Create Year Data Set
// Aggregation of all deaths by year
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

  // Sort years reverse chronologically
  years.sort(function(a, b) {
      return a - b;
  }).reverse();

  return years;
  return distinctYears;
}

// Create Overall Cause Data Set (used by visual_allCauses.js)
// Aggregation of all deaths by Cause
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

// Create State Data Set
// Aggregation of all deaths by State
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

// Create Cause by State and Year Data Set (used by visual_cause_allStates_allYears.js)
// Aggregation of all deaths by specific cause for all states and years
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

// Create Cause by State by Year data set (used by visual_cause_state_allYears.js)
// Aggregation of all deaths by specific cause by specific state for all years
function stateYearDatabyCause(state) {
  
  for(var i=0; i< stateYearData.length; i++){
    var tempData = stateYearData[i];
      if(stateYearData[i].state === state){
         delete tempData.total;
         delete tempData.state;
         causebyStatebyYear = tempData;
      }
  }
  return causebyStatebyYear;
}

