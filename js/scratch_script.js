// DATA SOURCE: https://catalog.data.gov/dataset/age-adjusted-death-rates-for-the-top-10-leading-causes-of-death-united-states-2013


var cause = 'cause';
var year = 'year'
var state = 'state';
var total = 'deaths';
var rawData = [];


// Distinct data values
var distinctCauses = {};
var distinctYears = {};
var distinctStates = {};
var causes = [];
var years = [];
var states = [];

// Get Raw Data 
function retrieveRawData() {


  $.get('https://data.cdc.gov/api/views/bi63-dtpu/rows.json?accessType=DOWNLOAD', {
    }).done(function(response) {
     var data = response.data;
     //console.log(data[0]);

     // for(var i=0; i< data.length; i++){
      for(var i=0; i< 10; i++){
      var dataItem = data[i];
      //console.log(dataItem)
      var updatedItem = {
        [year]:Number(dataItem[8]), 
        [cause]: dataItem[10],
        [state]: dataItem[11],
        [total]: Number(dataItem[12])
      };
      rawData.push(updatedItem);

     };
     // console.log(rawData);
  });

    return rawData;

}

rawData.forEach(retrieveYears);


// Create Unique Identifiers for Data Set
function retrieveYears(item,index) {
  for(var key in item){
    console.log(item[key]);
  }
}



      // Retrieve unique years
      if(!distinctYears[rawData.year]){
        years.push(Number(rawData.year));
        distinctYears[rawData[i].year] = true;
      }

      // Retrieve unique Causes
      if(!distinctCauses[rawData[i].cause]){
          causes.push(rawData[i].cause);
          distinctCauses[rawData[i].cause] = true;
      }

      // Retrieve unique states
      if(!distinctStates[rawData[i].state]){
          states.push(rawData[i].state);
          distinctStates[rawData[i].state] = true;
      }

    };



// }


// retrieveRawData();

// console.log(a);
//console.log(rawData);



function causes(){

  var test = 0;
  console.log('test');
  for (var i = 0; i < causes.length; i++) {
    console.log(causes.length);
    for (var j in rawData){
      //console.log('test');
      if (rawData[j].cause == causes[i]) {
        test = test + rawData[j].total;
      }
  }

  var testItem = {[cause]: causes[i], [total]: test};
  causeTotal.push(testItem);
  console.log(causeTotal);
  }

}

causes();

//console.log(causeTotal);



