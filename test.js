import test from 'ava'
import { preProcess, postProcess, mondrian } from './index.js'

const data = require('./data/adult.json')
const attributes = require('./data/adult-attributes.json')

// test('Init', async t => {
//   mondrian()

//   // t.is(await bar, 'bar')
// })

test('preProcess', async t => {
  let preProcessed = [
    [39, 0, 13, 0, 0, 0, 0, 0, '<=50K'],
    [50, 1, 13, 1, 1, 0, 0, 0, '<=50K'],
    [38, 2, 9, 2, 2, 0, 0, 0, '<=50K'],
    [53, 2, 7, 1, 2, 1, 0, 0, '<=50K'],
    [28, 2, 13, 1, 3, 1, 1, 1, '<=50K'],
    [37, 2, 14, 1, 1, 0, 1, 0, '<=50K'],
    [49, 2, 5, 3, 4, 1, 1, 2, '<=50K'],
    [52, 1, 9, 1, 1, 0, 0, 0, '>50K'],
    [31, 2, 14, 0, 3, 0, 1, 0, '>50K'],
    [42, 2, 13, 1, 1, 0, 0, 0, '>50K']
  ]

  t.deepEqual(preProcessed, preProcess(data.slice(0, 10), attributes))
})
