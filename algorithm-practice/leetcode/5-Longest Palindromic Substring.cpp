#include <string>
#include <cstdio>
#include <cstring>
#include <iostream>
using namespace std;

class Solution {
public:
    string longestPalindrome(string s) {
    	int maxpos = 0, maxp = 0;
    	int len[3000];
    	memset(len, 0, sizeof(len));
    	string ss, ans;
    	for(int i = 0; i < s.length(); i++){
    		ss = ss + s[i] + '#';
    	}
    	ss = '#' + ss;

    	int maxvalue = 0;
    	for(int i = 0; i < ss.length(); i++){
    		int l = 2 * maxpos - maxp, r = maxp;
    		int j = 2 * maxpos - i;
    		if(r >= i){
    			if(i + len[j] < r){
    				len[i] = len[j];
    			}else{
    				int rstart = r + 1;
    				int lstart = 2 * i - (r + 1);
    				while(1){
    					if(rstart > (ss.length() - 1) || lstart < 0) break;
    					if(ss[rstart] == ss[lstart]){
    						len[i] = rstart - i;
    					}else{
    						break;
    					}
    					rstart++;
    					lstart--;
    				}
    				if(len[i] > maxvalue) maxvalue = len[i], maxp = len[i] + i, maxpos = i;
    			}
    		}else{
    			int rstart = i + 1;
    			int lstart = i - 1;
    			while(1){
    				if(rstart > (ss.length() - 1) || lstart < 0) break;
    				if(ss[rstart] == ss[lstart]){
    					len[i] = rstart - i;
    				}else{
    					break;
    				}
    				rstart++;
    				lstart--;
    			}
    			if(len[i] > maxvalue) maxvalue = len[i], maxp = len[i] + i, maxpos = i;
    		}
    	}

    	for(int i = (2 * maxpos - maxp); i <= maxp; i++){
    		if(ss[i] != '#')
    			ans = ans + ss[i];
    	}

    	/*
    	for(int i = 0; i < ss.length(); i++){
    		cout << len[i] << ' ';
    	}
    	cout << maxvalue << endl;
    	*/

    	return ans;
    }
};

int main(){
	string s, ans;
	cin >> s;
	Solution test;
	ans = test.longestPalindrome(s);
	cout << ans << endl;
}
