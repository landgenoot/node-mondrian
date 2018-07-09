import test from 'ava'
import { preProcess, postProcess, callMondrian, kAnonymity } from './../index.js'

const data = require('./../data/adult.json')
const attributes = require('./../data/adult-attributes.json')
const preProcessed = [
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
const processed = [
  ['28,53', '0,2', '5,14', '0,3', '0,4', '0,1', '0,1', '0,2', '<=50K'],
  ['28,53', '0,2', '5,14', '0,3', '0,4', '0,1', '0,1', '0,2', '<=50K'],
  ['28,53', '0,2', '5,14', '0,3', '0,4', '0,1', '0,1', '0,2', '<=50K'],
  ['28,53', '0,2', '5,14', '0,3', '0,4', '0,1', '0,1', '0,2', '<=50K'],
  ['28,53', '0,2', '5,14', '0,3', '0,4', '0,1', '0,1', '0,2', '<=50K'],
  ['28,53', '0,2', '5,14', '0,3', '0,4', '0,1', '0,1', '0,2', '<=50K'],
  ['28,53', '0,2', '5,14', '0,3', '0,4', '0,1', '0,1', '0,2', '<=50K'],
  ['28,53', '0,2', '5,14', '0,3', '0,4', '0,1', '0,1', '0,2', '>50K'],
  ['28,53', '0,2', '5,14', '0,3', '0,4', '0,1', '0,1', '0,2', '>50K'],
  ['28,53', '0,2', '5,14', '0,3', '0,4', '0,1', '0,1', '0,2', '>50K']
]
const postProcessed = [
  {
    'age': '28,53',
    'workclass': 'State-gov,Self-emp-not-inc,Private',
    'educationNum': '5,14',
    'maritalStatus': 'Never-married,Married-civ-spouse,Divorced,Married-spouse-absent',
    'occupation': 'Adm-clerical,Exec-managerial,Handlers-cleaners,Prof-specialty,Other-service',
    'race': 'White,Black',
    'sex': 'Male,Female',
    'nativeCountry': 'United-States,Cuba,Jamaica',
    'class': '<=50K'
  },
  {
    'age': '28,53',
    'workclass': 'State-gov,Self-emp-not-inc,Private',
    'educationNum': '5,14',
    'maritalStatus': 'Never-married,Married-civ-spouse,Divorced,Married-spouse-absent',
    'occupation': 'Adm-clerical,Exec-managerial,Handlers-cleaners,Prof-specialty,Other-service',
    'race': 'White,Black',
    'sex': 'Male,Female',
    'nativeCountry': 'United-States,Cuba,Jamaica',
    'class': '<=50K'
  },
  {
    'age': '28,53',
    'workclass': 'State-gov,Self-emp-not-inc,Private',
    'educationNum': '5,14',
    'maritalStatus': 'Never-married,Married-civ-spouse,Divorced,Married-spouse-absent',
    'occupation': 'Adm-clerical,Exec-managerial,Handlers-cleaners,Prof-specialty,Other-service',
    'race': 'White,Black',
    'sex': 'Male,Female',
    'nativeCountry': 'United-States,Cuba,Jamaica',
    'class': '<=50K'
  },
  {
    'age': '28,53',
    'workclass': 'State-gov,Self-emp-not-inc,Private',
    'educationNum': '5,14',
    'maritalStatus': 'Never-married,Married-civ-spouse,Divorced,Married-spouse-absent',
    'occupation': 'Adm-clerical,Exec-managerial,Handlers-cleaners,Prof-specialty,Other-service',
    'race': 'White,Black',
    'sex': 'Male,Female',
    'nativeCountry': 'United-States,Cuba,Jamaica',
    'class': '<=50K'
  },
  {
    'age': '28,53',
    'workclass': 'State-gov,Self-emp-not-inc,Private',
    'educationNum': '5,14',
    'maritalStatus': 'Never-married,Married-civ-spouse,Divorced,Married-spouse-absent',
    'occupation': 'Adm-clerical,Exec-managerial,Handlers-cleaners,Prof-specialty,Other-service',
    'race': 'White,Black',
    'sex': 'Male,Female',
    'nativeCountry': 'United-States,Cuba,Jamaica',
    'class': '<=50K'
  },
  {
    'age': '28,53',
    'workclass': 'State-gov,Self-emp-not-inc,Private',
    'educationNum': '5,14',
    'maritalStatus': 'Never-married,Married-civ-spouse,Divorced,Married-spouse-absent',
    'occupation': 'Adm-clerical,Exec-managerial,Handlers-cleaners,Prof-specialty,Other-service',
    'race': 'White,Black',
    'sex': 'Male,Female',
    'nativeCountry': 'United-States,Cuba,Jamaica',
    'class': '<=50K'
  },
  {
    'age': '28,53',
    'workclass': 'State-gov,Self-emp-not-inc,Private',
    'educationNum': '5,14',
    'maritalStatus': 'Never-married,Married-civ-spouse,Divorced,Married-spouse-absent',
    'occupation': 'Adm-clerical,Exec-managerial,Handlers-cleaners,Prof-specialty,Other-service',
    'race': 'White,Black',
    'sex': 'Male,Female',
    'nativeCountry': 'United-States,Cuba,Jamaica',
    'class': '<=50K'
  },
  {
    'age': '28,53',
    'workclass': 'State-gov,Self-emp-not-inc,Private',
    'educationNum': '5,14',
    'maritalStatus': 'Never-married,Married-civ-spouse,Divorced,Married-spouse-absent',
    'occupation': 'Adm-clerical,Exec-managerial,Handlers-cleaners,Prof-specialty,Other-service',
    'race': 'White,Black',
    'sex': 'Male,Female',
    'nativeCountry': 'United-States,Cuba,Jamaica',
    'class': '>50K'
  },
  {
    'age': '28,53',
    'workclass': 'State-gov,Self-emp-not-inc,Private',
    'educationNum': '5,14',
    'maritalStatus': 'Never-married,Married-civ-spouse,Divorced,Married-spouse-absent',
    'occupation': 'Adm-clerical,Exec-managerial,Handlers-cleaners,Prof-specialty,Other-service',
    'race': 'White,Black',
    'sex': 'Male,Female',
    'nativeCountry': 'United-States,Cuba,Jamaica',
    'class': '>50K'
  },
  {
    'age': '28,53',
    'workclass': 'State-gov,Self-emp-not-inc,Private',
    'educationNum': '5,14',
    'maritalStatus': 'Never-married,Married-civ-spouse,Divorced,Married-spouse-absent',
    'occupation': 'Adm-clerical,Exec-managerial,Handlers-cleaners,Prof-specialty,Other-service',
    'race': 'White,Black',
    'sex': 'Male,Female',
    'nativeCountry': 'United-States,Cuba,Jamaica',
    'class': '>50K'
  }
]
let intuitiveDict

test('preProcess', t => {
  let result = preProcess(data.slice(0, 10), attributes)
  intuitiveDict = result.intuitiveDict
  t.deepEqual(preProcessed, result.data)
})

test('mondrian', async t => {
  t.deepEqual(processed, await callMondrian(preProcessed, 10, false))
})

test('postProcess', async t => {
  let post = postProcess(processed, attributes, intuitiveDict)
  t.deepEqual(postProcessed, post)
})

test('endToEnd', async t => {
  t.deepEqual(postProcessed, await kAnonymity(data.slice(0, 10), attributes, 10))
})
