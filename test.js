import test from 'ava'
import * as data from './data/adult.json'
import * as attributes from './data/adult-attributes.json'

test('Init', async t => {
  const bar = Promise.resolve('bar')
  console.log(data, attributes)

  t.is(await bar, 'bar')
})
