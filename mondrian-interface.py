"""
Bridge between nodeJS and python in order to run Mondrian
"""

# !/usr/bin/env python
# coding=utf-8
from mondrian.mondrian import mondrian
import sys, copy, random, pdb, json

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

def main():
    #get our data as an array from read_in()
    # data = read_in()

    data = [[39, 0, 13, 0, 0, 0, 0, 0, '<=50K'], [50, 1, 13, 1, 1, 0, 0, 0, '<=50K'],[38, 2, 9, 2, 2, 0, 0, 0, '<=50K']]

    result, eval_result = mondrian(data, 1, False)

    #return the sum to the output stream
    print result

#start process
if __name__ == '__main__':
    main()

