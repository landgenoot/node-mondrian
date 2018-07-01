'use strict'

/**
 * Note that Mondrian can only handle numeric attribute
 * So, categorical attributes should be transformed to numberic attributes
 * before anonymization. For example, Male and Female shold be transformed
 * to 0, 1 during pre-processing. Then, after anonymization, 0 and 1 should
 * be transformed to Male and Female.
 * @param {Array} data
 * @return {Array} data
 */
function preProcess (data, attributes) {
  let intuitiveDict = {}
  return data.map(record => {
    let processedRecord = []
    for (let attr in attributes) {
      if (attributes[attr].qi) {
        if (attributes[attr].category) {
          intuitiveDict[attr] = intuitiveDict[attr] || []
          let dictIndex = intuitiveDict[attr].indexOf(record[attr])
          if (dictIndex === -1) {
            intuitiveDict[attr].push(record[attr])
            dictIndex = intuitiveDict[attr].length - 1
          }
          processedRecord.push(dictIndex)
        } else {
          processedRecord.push(Number(record[attr]))
        }
      }
      if (attributes[attr].sensitive) {
        processedRecord.push(record[attr])
      }
    }
    return processedRecord
  })
}

function postProcess (data, attributes) {

}

/**
 * Call the Python module in order to do the anonymization
 * @param {Array} data
 * @param {Array} attributes
 * @param {Number} k
 * @param {Boolean} strict
 */
function mondrian () {
  console.log(10)
}

exports.preProcess = preProcess
exports.postProcess = postProcess
exports.mondrian = mondrian
