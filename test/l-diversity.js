import test from 'ava'
import { lDiversityHelpers, lDiversity } from './../index.js'

const data = require('./../data/adult.json')
const attributes = require('./../data/adult-attributes-2.json')
const preProcessed = [
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

const processed = [
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

const postProcessed = [
  {
    'age': '28,53',
    'workclass': '*',
    'educationNum': '5,14',
    'maritalStatus': '*',
    'race': '*',
    'sex': '*',
    'nativeCountry': '*',
    'occupation': 'Adm-clerical'
  },
  {
    'age': '28,53',
    'workclass': '*',
    'educationNum': '5,14',
    'maritalStatus': '*',
    'race': '*',
    'sex': '*',
    'nativeCountry': '*',
    'occupation': 'Exec-managerial'
  },
  {
    'age': '28,53',
    'workclass': '*',
    'educationNum': '5,14',
    'maritalStatus': '*',
    'race': '*',
    'sex': '*',
    'nativeCountry': '*',
    'occupation': 'Handlers-cleaners'
  },
  {
    'age': '28,53',
    'workclass': '*',
    'educationNum': '5,14',
    'maritalStatus': '*',
    'race': '*',
    'sex': '*',
    'nativeCountry': '*',
    'occupation': 'Handlers-cleaners'
  },
  {
    'age': '28,53',
    'workclass': '*',
    'educationNum': '5,14',
    'maritalStatus': '*',
    'race': '*',
    'sex': '*',
    'nativeCountry': '*',
    'occupation': 'Prof-specialty'
  },
  {
    'age': '28,53',
    'workclass': '*',
    'educationNum': '5,14',
    'maritalStatus': '*',
    'race': '*',
    'sex': '*',
    'nativeCountry': '*',
    'occupation': 'Exec-managerial'
  },
  {
    'age': '28,53',
    'workclass': '*',
    'educationNum': '5,14',
    'maritalStatus': '*',
    'race': '*',
    'sex': '*',
    'nativeCountry': '*',
    'occupation': 'Other-service'
  },
  {
    'age': '28,53',
    'workclass': '*',
    'educationNum': '5,14',
    'maritalStatus': '*',
    'race': '*',
    'sex': '*',
    'nativeCountry': '*',
    'occupation': 'Exec-managerial'
  },
  {
    'age': '28,53',
    'workclass': '*',
    'educationNum': '5,14',
    'maritalStatus': '*',
    'race': '*',
    'sex': '*',
    'nativeCountry': '*',
    'occupation': 'Prof-specialty'
  },
  {
    'age': '28,53',
    'workclass': '*',
    'educationNum': '5,14',
    'maritalStatus': '*',
    'race': '*',
    'sex': '*',
    'nativeCountry': '*',
    'occupation': 'Exec-managerial'
  }
]

test('preProcess', t => {
  let result = lDiversityHelpers.preProcess(data.slice(0, 10), attributes)
  t.deepEqual(preProcessed, result)
})

test('callMondrian', async t => {
  t.deepEqual(processed, await lDiversityHelpers.callMondrian(preProcessed, 10))
})

test('postProcess', async t => {
  t.deepEqual(postProcessed, lDiversityHelpers.postProcess(processed, attributes))
})
