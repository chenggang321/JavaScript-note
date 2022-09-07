import dependencies from './Dependencies.js'
const service = {}

service.register = ({serviceName:key,service:value,dependencies:dep}) => {
    if(service[key]) console.warn(`已覆盖已存在服务${key}`)
    service[key] = value
    if(dep){
        dependencies.add(dep)
    }
}

export default service