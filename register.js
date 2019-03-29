require('ts-node').register({
    // 只能这样引入配置文件
    project: 'tsconfig.json',
    // ts不会自动读取 .d.ts 声明文件，需要这样引入
    files: ['types/*.d.ts']
})
require('tsconfig-paths').register({
    // ts-node不处理paths和baseurl
    baseUrl: './',
    paths: { '@/*': ['./*'] }
})
