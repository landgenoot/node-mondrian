'use strict'

/**
 * Note that Mondrian can only handle numeric attribute
 * So, categorical attributes should be transformed to numberic attributes
 * before anonymization. For example, Male and Female shold be transformed
 * to 0, 1 during pre-processing. Then, after anonymization, 0 and 1 should
 * be transformed to Male and Female.
 * @param {Array} data
 * @param {Object} attributes
 * @return {Array} data
 */
function preProcess (data, attributes) {
  let intuitiveDict = {}
  let processedData = data.map(record => {
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
  return {data: processedData, intuitiveDict}
}

/**
 * Convert the data back to a nice JSON structure
 * @param {Array} data
 * @param {Object} attributes
 * @param {Object} intuitiveDict
 */
function postProcess (data, attributes, intuitiveDict) {
  return data.map(record => {
    let processedRecord = {}
    let index = 0
    for (let attr in attributes) {
      if (attributes[attr].qi) {
        if (attributes[attr].category) {
          let beginStart = record[index].split(',')
          let categoryIds = []
          for (let i = beginStart[0]; i <= beginStart[1]; i++) {
            categoryIds.push(i)
          }
          processedRecord[attr] = categoryIds.map(id => intuitiveDict[attr][id]).join(',')
        } else {
          processedRecord[attr] = record[index]
        }
        index++
      }
      if (attributes[attr].sensitive) {
        processedRecord[attr] = record[index]
        index++
      }
    }
    return processedRecord
  })
}

/**
 * Call the Python module in order to do the anonymization
 * @param {Array} data
 * @param {Number} k
 */
function callMondrian (data, k, strict) {
  return new Promise((resolve, reject) => {
    let spawn = require('child_process').spawn
    let py = spawn('python', ['mondrian-interface.py'])
    let dataString = ''

    py.stdout.on('data', function (data) {
      dataString += data.toString()
    })
    py.stdout.on('end', function () {
      resolve(JSON.parse(dataString))
    })
    py.stderr.on('data', function (buf) {
      console.log('[STR] stderr "%s"', String(buf))
    })
    py.stdin.write(JSON.stringify({
      data,
      k,
      strict
    }))
    py.stdin.end()
  })
}

/**
 * Run all the pre and post processing in order
 * to do the anonymization.
 * @param {Array} data
 * @param {Object} attributes
 * @return {Promise}
 */
function kAnonymity (data, attributes, k) {
  return new Promise(async (resolve, reject) => {
    let preProcessed = preProcess(data, attributes)
    let processed = await callMondrian(preProcessed.data, k, false)
    let postProcessed = postProcess(processed, attributes, preProcessed.intuitiveDict)
    resolve(postProcessed)
  })
}

exports.kAnonymityHelpers = {
  preProcess,
  postProcess,
  callMondrian
}

exports.kAnonymity = kAnonymity
