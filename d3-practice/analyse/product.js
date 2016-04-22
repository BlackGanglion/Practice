'use strict'

let read = require("fs");

read.readFile("data.json", 'utf-8', (err, data) => {
  data = JSON.parse(data);
  let l = data.length;
  console.log(l);

  let areaList = {};
  for(let i = 0; i < l; i++) {
    var area = data[i].ProArea;
    if(areaList.hasOwnProperty(area)){
      areaList[area]++;
    } else {
      areaList[area] = 1;
    }
  }
  let count = 0;
  let res = [];
  for(let e in areaList) {
    count += areaList[e];
    res.push([e, areaList[e]]);
  }
  if(count === l) {
    console.log('number is right');
  } else {
    console.log('number is wrong');
  }

  console.log(JSON.stringify(res));
});
