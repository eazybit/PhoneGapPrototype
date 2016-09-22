/**
 * Created by yxzhang on 9/21/16.
 */
require.config({
    paths: {
        /* ------ app paths ------ */
        'state-config': 'configs/state-config',
        /* ------ vendor paths ------ */
        // use '.' to replace '-', such that it is distinguished with vendor folder name
        'angular'               : '../bower_components/angular/angular.min',
        'angular.bootstrap'     : '../bower_components/angular-bootstrap/ui-bootstrap.min',
        'angular.ui.router'     : '../bower_components/angular-ui-router/release/angular-ui-router.min',
        'bootstrap'             : '../bower_components/bootstrap/dist/js/bootstrap.min',
        'jquery'                : '../bower_components/jquery/dist/jquery.min',
    },
    shim: {
        /* ------ top level dependencies ------ */
        'jquery': {
            'exports' : 'jquery'
        },
        'angular' : {
            deps:['jquery'],
            'exports' : 'angular'
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'angular.bootstrap': {
            deps: ['angular']
        },
        'angular.ui.router': {
            deps: ['angular']
        }
    },
    waitSeconds: 0
});

require(['jquery', 'angular', 'app'], function () {
    angular.bootstrap(document, ['app']);
});