import DI from '../DI.js'

export const random = () => Math.random
export const slowRandom = () => {
    return random()
}

DI.service.register({
    serviceName:'random',
    service:random
})


