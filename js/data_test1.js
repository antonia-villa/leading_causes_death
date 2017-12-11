// DATA SOURCE: https://catalog.data.gov/dataset/age-adjusted-death-rates-for-the-top-10-leading-causes-of-death-united-states-2013

  // New Data Set 
 // var data = [];
  var distinctCauses = {};
  var distinctYears = {};
  var distinctStates = {};
  var causes = [];
  var years = [];
  var states = [];

// Create Unique Identifiers for Data Set
function retrieveRawData() {

  
  $.get('https://data.cdc.gov/api/views/bi63-dtpu/rows.json?accessType=DOWNLOAD').done(function(response) {
     var data = response.data;
     console.log(data);

     for(var i=0; i< data.length; i++){
      var dataItem = data[i];

      // Retrieve unique years
      if(!distinctYears[dataItem[8]]){
        years.push(Number(dataItem[8]));
        distinctYears[dataItem[8]] = true;
      }

      // Retrieve unique Causes
      if(!distinctCauses[dataItem[10]]){
          causes.push(dataItem[10]);
          distinctCauses[dataItem[10]] = true;
      }

      // Retrieve unique states
      if(!distinctStates[dataItem[11]]){
          states.push(dataItem[11]);
          distinctStates[dataItem[11]] = true;
      }

     };
  });
}


retrieveRawData();
// console.log(data);
console.log(years);
console.log(causes);
console.log(states);



