function heapSort(array) {
  var heapSize = array.length,
      temp,
      res = [];

  // 建堆，从最后一个点的父节点开始
  for (var i = Math.floor(heapSize / 2); i >= 0; i--) {
    heapAdjust(array, i, heapSize);
  }

  //console.log(array);

  // 堆排序，每经过一次堆维护，顶上的值必定是最小的
  for (var j = heapSize - 1; j >= 0; j--) {
    res.push(array[0]);
    temp = array[0];
    array[0] = array[j]
    array[j] = temp;
    //console.log(array);
    heapAdjust(array, 0, j - 1);
    //console.log(array);
  }

  return res;
}

// 堆的维护
// 利用数组来模拟完全二叉树，当前节点下标为x，其左子节点l下标为2x，其右子节点r下标为2x+1
// 从小到大排列，将当前节点与左子右子节点分别比较，小的放前面
function heapAdjust(arr, x, len) {
  var l = 2 * x + 1,
      r = 2 * x + 2,
      min = x,
      temp;

  //console.log(arr[x], arr[l], arr[r]);
  // l < len r < len 主要判断是否有相应子节点
  // 取三者中最小
  if (l <= len && arr[l] < arr[min]) {
    min = l;
  }
  if (r <= len && arr[r] < arr[min]) {
    min = r;
  }
  //console.log(arr[min]);
  if (min != x) {
    temp = arr[x];
    arr[x] = arr[min];
    arr[min] = temp;
    // 可能对下面子节点也造成影响，继续判断是否需要交换
    heapAdjust(arr, min, len);
  }
}

var arr = [49, 38, 65, 97, 76, 13, 27, 49];
console.log(heapSort(arr));
