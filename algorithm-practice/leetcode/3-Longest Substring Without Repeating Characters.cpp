#include <cstdio>
#include <string>
#include <cstring>
#include <iostream>
#include <algorithm>
using namespace std;

class Solution {
public:
    int lengthOfLongestSubstring(string s) {
    	int res = 0, begin = 0;
    	int vis[200];
    	memset(vis, -1 ,sizeof(vis));
    	int count = 0;

    	for(int i = 0; i < s.length(); i++){
    		if(vis[s[i]] >= 0)
    			begin = max(begin, vis[s[i]] + 1);
    		//cout << begin << endl; 
    		vis[s[i]] = i;
    		count = i - begin + 1;
    		res = max(count, res);
    	}

        return res;
    }
};

int main(){
	string inputString;
	cin >> inputString;
	Solution test;
	int ans = test.lengthOfLongestSubstring(inputString);
	cout << ans << endl;
}
