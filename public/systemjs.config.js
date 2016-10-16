(function(global) {
    // map tells the System loader where to look for things
    var map = {
        'app': 'dist/src', // 'dist/src instead src when build bundle file',
        'rxjs': 'node_modules/rxjs',
        '@angular': 'node_modules/@angular',
        'angular-in-memory-web-api': 'node_modules/angular-in-memory-web-api',
        'moment': 'node_modules/moment/moment.js',
        'ng2-cookies': 'node_modules/ng2-cookies',
        'ng2-bootstrap': 'node_modules/ng2-bootstrap',
        'ng2-uploader': 'node_modules/ng2-uploader'
    };
    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': {
            main: './app.js',
            defaultExtension: 'js'
        },
        'rxjs': {
            defaultExtension: 'js'
        },
        'angular-in-memory-web-api': {
            main: './index.js',
            defaultExtension: 'js'
        },
        'ng2-bootstrap': {
            'main': 'ng2-bootstrap.js',
            'defaultExtension': 'js'
        },
        'ng2-cookies': {
            main: 'ng2-cookies.js',
            defaultExtension: 'js'
        },
        'ng2-uploader': {
            'main': 'ng2-uploader.js',
            'defaultExtension': 'js'
        }
    };

    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'forms',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router',
        'upgrade'
    ];
    // Individual files (~300 requests):
    function packIndex(pkgName) {
        packages['@angular/' + pkgName] = {
            main: 'index.js',
            defaultExtension: 'js'
        };
    }
    // Bundled (~40 requests):
    function packUmd(pkgName) {
        packages['@angular/' + pkgName] = {
            main: '/bundles/' + pkgName + '.umd.js',
            defaultExtension: 'js'
        };
    }
    // Most environments should use UMD; some (Karma) need the individual index files
    // var setPackageConfig = System.packageWithIndex ? packUmd : packIndex;
    var setPackageConfig = packUmd;
    // Add package entries for angular packages
    ngPackageNames.forEach(setPackageConfig);

    var config = {
        map: map,
        packages: packages
    }
    System.config(config);
})(this);
