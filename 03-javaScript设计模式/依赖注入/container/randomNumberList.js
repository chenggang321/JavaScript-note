import DI from "../DI.js";

export const makeRandomNumberList = ({randomNumber}) => (max,length) =>{
    return Array(length).fill(null).map(()=>randomNumber(max))
}


DI.service.register({
    serviceName:'randomNumberList',
    service: makeRandomNumberList,
    dependencies: 'randomNumber'
})