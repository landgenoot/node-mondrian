# Node-mondrian
k-anonymity and l-diversity for nodeJS. Using [Mondrian](https://github.com/qiyuangong/Mondrian) and [Mondrian_L_Diversity](https://github.com/qiyuangong/Mondrian_L_Diversity) under the hood.
## Usage
Install with
```
npm install node-mondrian
```

Use in code:
```
const Mondrian = require('node-mondrian')

// See this repo for example data
const data = require('data/adult.json')
const attributes = require('data/adult-attributes.json')

let anonymized = await Mondrian.kAnonymity(data, attributes, 10) 
let diversified = await Mondrian.lDiversity(anonymized, attributes, 10)
```
