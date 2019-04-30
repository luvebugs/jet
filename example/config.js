/**
 * @file FIS 配置
 * @author
 */

module.exports = (options = {
    namespace: 'home'
}) => {
    // fis3-enable
    fis.config.set('namespace', options.namespace);

    // 启用npm管理前端组件
    fis.enableNPM({
        autoPack: true
    });

    fis.enableES7();

    // chrome下可以安装插件实现livereload功能
    // https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
    fis.config.set('livereload.port', 35729);

    if (fis.IS_FIS3) {
        // fis.match('/server/{action,model,lib}/**.{js,es,jsx}', {
        //     parser: fis.plugin('babel-5.x')
        // }).match('/server/**.ts', {
        //     parser: fis.plugin('typescript')
        // })
        const deployOptions = {
            rd: {
                receiver: 'http://127.0.0.1:8085/yog/upload',
                to: '/'
            }
        }
        const deployTarget = 'rd'; // 目标机器

        fis.media(deployTarget).match('*', {
            optimizer: null,
            useHash: false,
            deploy: fis.plugin('http-push', deployOptions[deployTarget])
        });
    } else {
        fis.config.set('deploy', {
            debug: {
                to: '/',
                // yog2 默认的部署入口，使用调试模式启动 yog2 项目后，这个入口就会生效。IP与端口请根据实际情况调整。
                receiver: 'http://127.0.0.1:8085/yog/upload'
            }
        });
    }
}

