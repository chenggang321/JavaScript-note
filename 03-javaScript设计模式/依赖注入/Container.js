import { random, slowRandom } from './container/random.js'
import { makeRandomNumber } from './container/randomNumber.js'
import { makeRandomNumberList } from './container/randomNumberList.js'
import DI from './DI.js'

const dependencies = {
    random: random,
    randomNumber: makeRandomNumber,
    randomNumberList: makeRandomNumberList
}
const container = {}

Object.entries(dependencies).forEach(([dependenciesName, factory]) => {
    return Object.defineProperty(container,dependenciesName,{
        get: () => {
            return factory(container)
        }
    })
})

export default container
