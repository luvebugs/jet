var fs = require('fs');
var path = require('path');
var schedule = require('node-schedule');
// var Module = require('module');

var Schedule = function (options) {
    var jobs = {};
    var dirs = [];
    function init() {
        clean(jobs);
        load(options.dirname);
    };
    function cancel(key) {
        jobs[key].cancel();
        jobs[key] = null;
    }
    function subscribe(rule, run){
        var job = schedule.scheduleJob(rule, function () {
            run.apply(this, Array.from(arguments).concat({jobs: jobs}));
        });
        jobs[job.name] = job;
        return job;
    };
    function load(dirname) {
        if (~dirname.indexOf(options.targetname)) {
            dirs.push(dirname);
            fs.readdirSync(dirname).forEach(function (file) {
                var schedule = require(path.join(dirname, file));
                schedule.default({subscribe, cancel, schedule});
            })
        }
        fs.readdirSync(dirname).forEach(function (file) {
            var pathname = path.join(dirname, file);
            if (fs.statSync(pathname).isDirectory()) {
                load(pathname);
            }
        });
    }
    function clean(jobs) {
        Object.keys(jobs).forEach(function (key) {
            jobs[key] && jobs[key].cancel();
        });
        jobs = {};
    }
    return {
        init,
        load,
        clean,
        dirs
    };
};

// 插件逻辑
module.exports.schedule = ['recv-reload', function(app, conf){
    var scheduler = new Schedule({
        dirname: conf.appPath,
        targetname: conf.schedulePath,
        maxSize: conf.maxSize
    });
    scheduler.init();
    // var originModuleLoad = Module._load.bind(Module);

    // Module._load = function (request, parent, isMain) {
    //     if (request === './script') {
    //         console.log(request);
    //     }
    //     return originModuleLoad(request, parent, isMain);
    // };

    var reloader = yog.plugins['recv-reload'];
    reloader && reloader.on('cacheClean', function () {
        scheduler.dirs && scheduler.dirs.forEach(function(dir){
            reloader.cleanCacheForFolder(dir);
        })
        scheduler.init && scheduler.init();
    });
    return {
        cleanCache: function () {
            frontendLoaded = {};
            frontendCache = {};
            frontendFactoryCache = {};
        }
    }
}];

// 设置插件默认配置
module.exports.schedule.defaultConf = {
    maxSize: 100,
    appPath: yog.ROOT_PATH + '/app',
    schedulePath: 'subscribe'
}