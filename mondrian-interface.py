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
    return json.loads(lines[0])

def main():
    data = read_in()
    result, eval_result = mondrian(data, 20, False)
    print json.dumps(result)

#start process
if __name__ == '__main__':
    main()

