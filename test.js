import test from 'ava'

test('Init', async t => {
  const bar = Promise.resolve('bar')

  t.is(await bar, 'bar')
})
