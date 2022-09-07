import DI from "../DI.js";

export const makeRandomNumber = ({random}) => max =>{
    return Math.floor(random() * (max + 1))
}

DI.service.register({
    serviceName:'randomNumber',
    service: makeRandomNumber,
    dependencies: ['random']
})
