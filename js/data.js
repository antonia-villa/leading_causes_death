// DATA SOURCE: https://catalog.data.gov/dataset/age-adjusted-death-rates-for-the-top-10-leading-causes-of-death-united-states-2013

// Retrieve Raw Data
var rawData = [];

// Get Raw Data 
function retrieveRawData() {
 
  $.get('https://data.cdc.gov/api/views/bi63-dtpu/rows.json?accessType=DOWNLOAD')
  .done(function(response) {
     var data = response.data;
  
      for(var i=0; i< data.length; i++){
        var dataItem = data[i];
        var updatedItem = {
          'year':Number(dataItem[8]), 
          'cause': dataItem[10],
          'state': dataItem[11],
          'total': Number(dataItem[12])
        };

        rawData.push(updatedItem);
     };
     // console.log(rawData);
     console.log('state data test:', getStates(rawData));
  });

    return rawData;

}

retrieveRawData();


function getStates(rawData){
  var distinctStates = {};
  var states = [];
  var state_data = [];

  for(var i = 0; i < rawData.length; i++){
    if(!distinctStates[rawData[i].state]){
      states.push(rawData[i].state);
      distinctStates[rawData[i].state] = rawData[i].total;
    }
    else {
      distinctStates[rawData[i].state] += rawData[i].total;
    }
  }
  console.log(states);
  console.log('with total', distinctStates);
  
  // for(var i = 0; i < states.length; i++){
  //   var total = 0;
  //   var state_item = {'state': states[i], 'total': total}

  //   for (var j = 0; j < rawData.length; j++){
  //     //console.log(rawData[j]);
  //     if(states[i] = rawData[j].state){
  //       total = total + rawData[j].total;
  //       // console.log(total);
  //     }
  //   }

  //   state_item.total = total;
  //   state_data.push(state_item);
  // }

  return distinctStates;
}






