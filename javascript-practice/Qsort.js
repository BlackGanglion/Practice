var sol = function(arr) {
  var Partition = function(l, r) {
    var pos = arr[l];
    while(l < r){
      while(l < r && arr[r] >= pos) {
        r--;
      }
      arr[l] = arr[r];
      while(l < r && arr[l] <= pos) {
        l++;
      }
      arr[r] = arr[l];
    }
    arr[l] = pos;
    return l;
  }

  var Qsort = function(l, r){
    if(l < r){
      var pos = Partition(l, r);
      Qsort(l, pos - 1);
      Qsort(pos + 1, r);
    }
  }

  Qsort(0, arr.length - 1);

  return arr;
}

var arr = [49, 14, 15, 17, 78, 98, 123, 45];

console.log(sol(arr));
