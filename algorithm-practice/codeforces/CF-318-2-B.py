line = raw_input()
n = int(line.split()[0])
m = int(line.split()[1])

count = [];
'''
map = [];
for l in range(n + 1):
    count.append(0)
    map.append([])
    for r in range(n + 1):
        map[l].append(0)
'''

map = [[0 for col in range(n + 1)] for row in range(n + 1)]
for l in range(n + 1):
    count.append(0)

for i in range(0, m):
    line = raw_input()
    begin = int(line.split()[0])
    end = int(line.split()[1])
    count[begin] = count[begin] + 1
    count[end] = count[end] + 1
    map[begin][end] = map[end][begin] = 1

'''
for l in range(1, n + 1):
    if(count[l] - 2 < 0):
        count[l] = 0
    else:
        count[l] = count [l] - 2
'''

flag = 1
min = -1
for r1 in range(1, n + 1):
    for r2 in range(r1, n + 1):
        if(map[r1][r2]):
            for l in range(r2, n + 1):
                if(map[l][r1] and map[l][r2]):
                    res = count[l] + count[r1] + count[r2] - 6
                    if(flag):
                        min = res
                        flag = 0
                    else:
                        if(res < min):
                            min = res

print(min)
