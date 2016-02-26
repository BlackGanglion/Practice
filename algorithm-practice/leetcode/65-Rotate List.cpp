#include <cstdio>
#include <iostream>
#include <algorithm>
using namespace std;

struct ListNode {
  int val;
  ListNode *next;
  ListNode(int x) : val(x), next(NULL) {}
};

class Solution {
public:
	ListNode* rotateRight(ListNode* head, int k) {
		int length = 0;
		ListNode *pre = head, *end;
		while(pre != NULL) {
			length++;
			if(pre->next == NULL) {
				end = pre;
				break;
			} else {
				pre = pre->next;
			}
		}
		if(!length) {
			return head;
		}

		
		k = k % length;
		if(!k) {
			return head;
		}

		ListNode *oldHead = head;
		pre = head;
		int count = 0, endCount = length + 1 - k;
		// 找新节点的前驱节点
		while(pre != NULL) {
			count++;
			if(endCount - 1 == count) {
				head = pre->next;
				pre->next = NULL;
				end->next = oldHead;
				break;
			} else {
				pre = pre->next;
			}
		}

		return head;
    }
};

void outputResult(ListNode* head) {
  ListNode *pre = head;
  while(pre != NULL) {
    cout << pre->val << endl;
    pre = pre->next;
  }
}

int main() {
  int n, k;
  cin >> n >> k;
  ListNode *head, *pre, *newNode, *result;
  for(int i = 0; i < n; i++) {
    int number;
    cin >> number;
    if(i == 0) {
      head = new ListNode(number);
      pre = head;
    } else {
      newNode = new ListNode(number);
      pre->next = newNode;
      pre = newNode;
    }
  }
  Solution ans; 
  result = ans.rotateRight(head, k);
  outputResult(result);
}
