#include <cstdio>
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

/* nums1.l nums1.r  nums2.l num2.r No.k */
int findK(vector<int>& nums1, vector<int>& nums2, int l1, int r1, int l2, int r2, int k){
	//cout << l1 << ' ' << r1 << ' ' << l2 << ' ' << r2 << ' ' << k << endl; 

	//nums1 or nums2 is empty
	if(l1 > r1) return nums2[l2 + k - 1];
	if(l2 > r2) return nums1[l1 + k - 1];

	//NO.1
	if(k == 1) return min(nums1[l1], nums2[l2]);

	int A, B, countA, countB, startA, startB; 
	if(r1 < (k / 2 - 1)) A = nums1[r1], countA = r1 - l1 + 1, startA = r1 + 1; 
	else A = nums1[l1 + k / 2 - 1], countA = k / 2, startA = k / 2 + l1;
	if(r2 < (k / 2 - 1)) B = nums2[r2], countB = r2 - l2 + 1, startB = r2 + 1; 
	else B = nums2[l2 + k / 2 - 1], countB = k / 2, startB = k / 2 + l2;

	//cout << A << ' ' << B << endl;

	if(A < B){
		return findK(nums1, nums2, startA, r1, l2, r2, k - countA);
	}
	if(A > B){
		return findK(nums1, nums2, l1, r1, startB, r2, k - countB);
	}

	if(A == B){
		if(k % 2){
			return findK(nums1, nums2, startA, r1, startB, r2, k - countA - countB);
		}else{
			return A;
		}
	}
}

class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    	int m = nums1.size();
    	int n = nums2.size();

    	int all = m + n;
    	double res = 0;

    	if(all % 2){
    		// all / 2 + 1
    		res = findK(nums1, nums2, 0, m - 1, 0, n - 1, all / 2 + 1);
    	}else{
    		// ( (all/2 + 1) + all/2 ) / 2
    		//res = findK(nums1, nums2, 0, m - 1, 0, n - 1, all / 2 + 1);
    		res = (findK(nums1, nums2, 0, m - 1, 0, n - 1, all / 2 + 1) + findK(nums1, nums2, 0, m - 1, 0, n - 1, all / 2)) / 2.0;
    	}
        return res;
    }
};

int main(){
	int m, n, element;
	cin >> m >> n;

	vector<int> nums1, nums2;
	while(m--){
		cin >> element;
		nums1.push_back(element);
	}
	while(n--){
		cin >> element;
		nums2.push_back(element);
	}

	Solution test;
	double ans = test.findMedianSortedArrays(nums1, nums2);
	cout << ans << endl;
}
