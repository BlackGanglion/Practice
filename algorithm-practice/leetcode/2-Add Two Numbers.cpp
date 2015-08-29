/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
#include <cstdio>
#include <cstring>
#include <iostream>
using namespace std;

struct ListNode {
	int val;
	ListNode *next;
	ListNode(int x) : val(x), next(NULL) {}
}; 

class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    	ListNode *ans = NULL, *pre = NULL;
    	int flag = 1;
    	int LfirstValue, LsecondValue;
    	int Carry = 0;
        while(l1 != NULL || l2 != NULL || Carry == 1){
        	if(l1 != NULL){
        		LfirstValue = l1 -> val;
        		//cout << LfirstValue << endl;
        		l1 = l1 -> next;
        	}else{
        		LfirstValue = 0;
        	}

        	if(l2 != NULL){
        		LsecondValue = l2 -> val;
        		//cout << LsecondValue <<endl;
        		l2 = l2 -> next;
        	}else{
        		LsecondValue = 0;
        	}

        	int nodeValue = LfirstValue + LsecondValue + Carry;
        	//cout << nodeValue << endl;
        	if(nodeValue >= 10){
        		Carry = 1;
        		nodeValue %= 10;
        	}else{
        		Carry = 0;
        	}

            /*
            这种是错误的，ans->next = null，pre = null
        	if(flag){
        		ans = new ListNode(nodeValue);
        		flag = 0;
        		pre = ans -> next;
        	}else{
        		pre = new ListNode(nodeValue);
        		pre = pre -> next; 
        	}
        	*/

        	if(flag){
        		ans = new ListNode(nodeValue);
        		flag = 0;
        		pre = ans;
        	}else{
        		pre -> next = new ListNode(nodeValue);
        		pre = pre -> next;
        	}
        }
        return ans;
    }
};

int main(){
	int n, m, element;
	cin >> n >> m;
	ListNode *first = NULL, *second = NULL, *pre = NULL, *ans = NULL;
	for(int i = 0; i < n; i++){
		if(i == 0){
			cin >> element;
			first = new ListNode(element);
			//cout << first->val;
			pre = first;
		}else{
			cin >> element;
			pre -> next = new ListNode(element);
			pre = pre -> next;
		}
	}
	for(int i = 0; i < m; i++){
		if(i == 0){
			cin >> element;
			second = new ListNode(element);
			pre = second;
		}else{
			cin >> element;
			pre -> next = new ListNode(element);
			pre = pre -> next;
		}
	}

	Solution test;
	ans = test.addTwoNumbers(first, second);
	while(ans != NULL){
		cout << ans -> val << endl;
		ans = ans -> next;
	}
}
