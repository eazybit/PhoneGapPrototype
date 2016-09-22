/**
 * Created by yxzhang on 9/21/16.
 */
var TamaleRMSApp = angular.module('app', [
    'ui.bootstrap',
    'ui.router',
    'app.widgets',
    'app.components',
    'app.views'
]);
// alert('created app');
TamaleRMSApp.config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('index', {
                abstract: true,
                url: "",
                templateUrl: "views/master/master_page.html",
                controller: 'mainCtrl'
            })
            .state('login', {
                url: "/login",
                templateUrl: "views/login/login.html",
                controller: "loginCtrl"
            })
            .state('index.research', {
                url: "/research",
                templateUrl: "views/research/research.html",
                controller: "researchCtrl"
            })
        ;
    }]);
// alert('configured app');
TamaleRMSApp.run(['$rootScope', '$state',
        function($rootScope, $state){

            $rootScope.$on('$stateChangeStart', function (event, next, nextParams, from, fromParams) {
                if (next && next.name == 'error') {
                    return;
                }
                if (next && next.name !== 'login' && next.name !== '' && next.name !== 'undefined') {
                    $state.go(next.name);
                }
            });
        }]);
// alert('ran app');
TamaleRMSApp.controller('appCtrl',['$scope', '$state', function($scope, $state) {
    // alert('going to login page');
    $state.go('login');
}]);

angular.bootstrap(document, ['app']);
// alert('bootstrap app');