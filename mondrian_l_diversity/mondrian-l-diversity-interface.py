"""
Bridge between nodeJS and python in order to run Mondrian L Diversity
"""

# !/usr/bin/env python
# coding=utf-8
from mondrian_l_diversity import mondrian_l_diversity as mondrian
from utils.read_adult_data import read_tree
import sys, copy, random, pdb, json

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    return json.loads(lines[0])

def main():
    input = read_in()
    att_trees = read_tree()
    result, eval_result = mondrian(att_trees, input['data'], input['l'])
    print json.dumps(result)

#start process
if __name__ == '__main__':
    main()

