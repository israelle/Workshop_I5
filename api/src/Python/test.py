#!/usr/bin/python

import sys



num1 = sys.argv[1]
num2 = sys.argv[2]

# Add two numbers
# sum = float(num1) + float(num2)
res = dict();
res["recette"] = num1
res["ingredient"] = num2
print(res)
# Display the sum
# print('The sum of {0} and {1} is {2}'.format(num1, num2, sum))