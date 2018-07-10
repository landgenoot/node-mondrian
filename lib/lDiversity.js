'use strict'

/**
 * Convert to JSON to array structure and remove
 * the unwanted columns
 * @param {Array} data
 * @param {Object} attributes
 */
function preProcess (data, attributes) {
  let processedData = data.map(record => {
    let processedRecord = []
    for (let attr in attributes) {
      if (attributes[attr].qi) {
        processedRecord.push(String(record[attr]))
      }
    }
    for (let attr in attributes) {
      if (attributes[attr].sensitive) {
        processedRecord.push(String(record[attr]))
      }
    }
    return processedRecord
  })
  return processedData
}

/**
 * Convert the processed data back to a nice JSON structure
 * @param {Array} data
 * @param {Object} attributes
 */
function postProcess (data, attributes) {
  return data.map(record => {
    let processedRecord = {}
    let index = 0
    for (let attr in attributes) {
      if (attributes[attr].qi) {
        processedRecord[attr] = record[index]
        index++
      }
    }
    for (let attr in attributes) {
      if (attributes[attr].sensitive) {
        processedRecord[attr] = record[index]
        index++
      }
    }
    return processedRecord
  })
}

/**
 * Call the Python module mondrian_l_diversity in order to achieve l diversity
 * @param {Array} data
 * @param {Number} l
 */
function callMondrian (data, l) {
  return new Promise((resolve, reject) => {
    let spawn = require('child_process').spawn
    let py = spawn('python', [`${__dirname}/../mondrian-l-diversity-interface.py`.replace(/ /g, '\\ ')])
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
      l
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
function lDiversity (data, attributes, l) {
  return new Promise(async (resolve, reject) => {
    let preProcessed = preProcess(data, attributes)
    let processed = await callMondrian(preProcessed, l)
    let postProcessed = postProcess(processed, attributes)
    resolve(postProcessed)
  })
}

exports.lDiversityHelpers = {
  preProcess,
  postProcess,
  callMondrian
}

exports.lDiversity = lDiversity
