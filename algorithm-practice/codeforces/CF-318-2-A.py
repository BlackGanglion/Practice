n = int(raw_input())
line = raw_input();
flag = 0;
vote = [];

for e in line.split():
    if flag == 0:
        my = int(e)
        flag = 1
    else:
        vote.append(int(e))

vote.sort()
ans = 0
while(1):
    if(vote[len(vote) - 1] >= my):
        vote[len(vote) - 1] = vote[len(vote) - 1] - 1
        my = my + 1
        ans = ans + 1
    else:
        break

    vote.sort()
    if(vote[len(vote) - 1] < my):
        break

print(ans)


'''
for i in range(0, len(vote)):
    if(vote[i] >= my):
        break

#print(i)
ans = 0
while(1):
    for j in range(i, len(vote)):
        if(vote[j] >= my):
            vote[j] = vote[j] - 1
            my = my + 1
            ans = ans + 1
    if(vote[len(vote) - 1] < my):
        break

print(ans)
'''
