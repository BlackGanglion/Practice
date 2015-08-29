#include <vector>
#include <map>
#include <iostream>
#include <cstdio>
#include <cstring>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
    	map<int, pair<int, int>> NumHash;
    	pair<int, int> element;
    	vector<int> ans;

    	for(int i = 0; i < nums.size(); i++){
    		int searchValue = target - nums[i];
    		map<int, pair<int, int>>::iterator it;
    		it = NumHash.find(searchValue);
    		if(it != NumHash.end()){
    			//cout << (*it).second.first << ' ' << i << endl;
    			ans.push_back((*it).second.first + 1);
    			ans.push_back(i + 1);
    			break;
    		}else{
    			element = make_pair(i, nums[i]);
    			NumHash[nums[i]] = element;
    		}
    	}
    	return ans;
    }
};

int main(){
	vector<int> array, result;
	int n, element, target;
	cin >> n >> target;
	for(int i = 1; i <= n; i++){
		cin >> element;
		array.push_back(element);
	}
	Solution test; 
	result = test.twoSum(array, target);
	cout << result[0] << ' ' << result[1] << endl;
}
