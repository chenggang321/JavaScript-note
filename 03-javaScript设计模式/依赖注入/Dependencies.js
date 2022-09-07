import service from './Service.js'
const dependencies = {}
let _dependencies = []

dependencies.add = (key) => {
    if(!Array.isArray(key)) key = [key]
    _dependencies = [..._dependencies,...key]
}

dependencies.load = () => {
    const serviceKey = Object.keys(service)
    _dependencies.forEach(key=>{
        if(!serviceKey.includes(key)){
            console.error(`依赖服务${key}不存在`)
        }
    })
    return service
}

export default dependencies