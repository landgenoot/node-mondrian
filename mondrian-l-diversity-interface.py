"""
Bridge between nodeJS and python in order to run Mondrian L Diversity
"""

# !/usr/bin/env python
# coding=utf-8
from python_lib.mondrian_l_diversity.mondrian_l_diversity import mondrian_l_diversity
from python_lib.mondrian_l_diversity.models.gentree import GenTree
from python_lib.mondrian_l_diversity.utils.utility import cmp_str
from python_lib.mondrian_l_diversity.models.numrange import NumRange
from collections import OrderedDict
import sys, copy, random, pdb, json

#Read data from stdin
def read_in():
    """
    Parse JSON passed via standard input
    """
    lines = sys.stdin.readlines()
    return json.JSONDecoder(object_pairs_hook=OrderedDict).decode(lines[0])

def read_tree(attributes, data):
    """
    Read the attibutes and create the pickle and tree files
    """
    att_trees = []
    index = 0
    for attribute in attributes:
        if attributes[attribute].get('qi', False):
            if attributes[attribute].get('category', False):
                categories = get_column_categories(data, index)
                att_trees.append(compose_tree(attribute, categories))
            else:
                column = get_column(data, index)
                att_trees.append(compose_numrange(column))
            index += 1
    return att_trees

def get_column_categories(data, index):
    """
    Get distinct values of column
    """
    return list(set(map(lambda item: item[index], data)))

def get_column(data, index):
    """
    Get single column
    """
    return list(map(lambda item: item[index], data))

def compose_tree(attribute, categories):
    """
    Create two-level tree with star and category
    """
    att_tree = {}
    att_tree['*'] = GenTree('*')
    for category in categories:
        att_tree[category] = GenTree(category, att_tree['*'], True)
    return att_tree

def compose_numrange(column):
    """
    Create numrange based on frequency
    """
    numeric_dict = dict()
    for row in column:
        try:
            numeric_dict[row] += 1
        except:
            numeric_dict[row] = 1
    sort_value = list(numeric_dict.keys())
    sort_value.sort(cmp=cmp_str)
    return NumRange(sort_value, numeric_dict)

def main():
    input = read_in()
    att_trees = read_tree(input['attributes'], input['data'])
    result = mondrian_l_diversity(att_trees, input['data'], input['l'])[0]
    print json.dumps(result)

#start process
if __name__ == '__main__':
    main()

