// DATA SOURCE: https://catalog.data.gov/dataset/age-adjusted-death-rates-for-the-top-10-leading-causes-of-death-united-states-2013

// Data Sets
var rawData = [];
var stateData = [];
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
          "'year'": Number(dataItem[8]), 
          "'category'": dataItem[9],
          "'cause'": dataItem[10],
          "'state'": dataItem[11],
          "'value'": Number(dataItem[12])
        };

        if(updatedItem['state'] != 'United States'){
        rawData.push(updatedItem);
      }
     };
    dataHeirarchy();
    console.log(rawData);
    return rawData;
  });
}

// Create data sets
retrieveRawData();







