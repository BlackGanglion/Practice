#include <cstdio>
#include <algorithm>
#include <string>
#include <cstring>
#include <iostream>
using namespace std;

class Solution {
public:
    string convert(string s, int numRows) {
    	string ans;
    	int length = s.length();
    	
    	if(!length) return s;
    	
    	vector< vector<char> > v(length + 1);

    	int count = 1;
    	int stringIndex = 0;
    	int status = 0;

    	v[count].push_back(s[stringIndex]);
    	stringIndex++;

    	while(stringIndex != length) {
    		if(status) {
    			count--;
    		} else {
    			count++;
    		}

    		v[count].push_back(s[stringIndex]);
    		//cout << count << endl; 

    		if(count == 1 || count == numRows) {
    			status = !status;
    		}
    		stringIndex++;
    	}
    	
    	for(int i = 1; i <= length; i++) {
    		vector<char>::iterator it;
    		for(it = v[i].begin(); it != v[i].end(); it++) {
    			ans = ans + *it;
    		}
    	}
        return ans;
    }
};

int main() {
	string input = "A";
	int numRows = 1;

	Solution sol;
	string ans = sol.convert(input, numRows);
	cout << ans << endl;
}
