'use strict'

/**
 * Note that Mondrian can only handle numeric attribute
 * So, categorical attributes should be transformed to numberic attributes
 * before anonymization. For example, Male and Female shold be transformed
 * to 0, 1 during pre-processing. Then, after anonymization, 0 and 1 should
 * be transformed to Male and Female.
 * @param {Array} data
 */
function preProcess (data) {

}

function postProcess (data) {

}

/**
 * Call the Python module in order to do the anonymization
 * @param {Array} data
 * @param {Array} attributes
 * @param {Number} k
 * @param {Boolean} strict
 */
function mondrian (data, attributes, k, strict) {

}

module.exports = mondrian
