import test from 'ava'
import { callMondrianLDiversity } from './../index.js'

// const data = require('./../data/adult.json')
const attributes = require('./../data/adult-attributes-2.json')
const data = [
  ['39', 'State-gov', '13', 'Never-married', 'White', 'Male', 'United-States', 'Adm-clerical'],
  ['50', 'Self-emp-not-inc', '13', 'Married-civ-spouse', 'White', 'Male', 'United-States', 'Exec-managerial'],
  ['38', 'Private', '9', 'Divorced', 'White', 'Male', 'United-States', 'Handlers-cleaners'],
  ['53', 'Private', '7', 'Married-civ-spouse', 'Black', 'Male', 'United-States', 'Handlers-cleaners'],
  ['28', 'Private', '13', 'Married-civ-spouse', 'Black', 'Female', 'Cuba', 'Prof-specialty'],
  ['37', 'Private', '14', 'Married-civ-spouse', 'White', 'Female', 'United-States', 'Exec-managerial'],
  ['49', 'Private', '5', 'Married-spouse-absent', 'Black', 'Female', 'Jamaica', 'Other-service'],
  ['52', 'Self-emp-not-inc', '9', 'Married-civ-spouse', 'White', 'Male', 'United-States', 'Exec-managerial'],
  ['31', 'Private', '14', 'Never-married', 'White', 'Female', 'United-States', 'Prof-specialty'],
  ['42', 'Private', '13', 'Married-civ-spouse', 'White', 'Male', 'United-States', 'Exec-managerial']
]

const postProcessed = [
  ['28,53', '*', '5,14', '*', '*', '*', '*', 'Adm-clerical'],
  ['28,53', '*', '5,14', '*', '*', '*', '*', 'Exec-managerial'],
  ['28,53', '*', '5,14', '*', '*', '*', '*', 'Handlers-cleaners'],
  ['28,53', '*', '5,14', '*', '*', '*', '*', 'Handlers-cleaners'],
  ['28,53', '*', '5,14', '*', '*', '*', '*', 'Prof-specialty'],
  ['28,53', '*', '5,14', '*', '*', '*', '*', 'Exec-managerial'],
  ['28,53', '*', '5,14', '*', '*', '*', '*', 'Other-service'],
  ['28,53', '*', '5,14', '*', '*', '*', '*', 'Exec-managerial'],
  ['28,53', '*', '5,14', '*', '*', '*', '*', 'Prof-specialty'],
  ['28,53', '*', '5,14', '*', '*', '*', '*', 'Exec-managerial']
]

test('mondrian', async t => {
  t.deepEqual(postProcessed, await callMondrianLDiversity(data, 10))
})
