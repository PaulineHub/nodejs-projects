//on execute d'abord le code immediat, puis les callbacks des fonctions asynchrones
//readFile est une fonction asynchrone

const { readFile } = require('fs')

console.log('started a first task')
// CHECK FILE PATH!!!!
readFile('./content/first.txt', 'utf8', (err, result) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(result)
  console.log('completed first task')
})
console.log('starting next task')