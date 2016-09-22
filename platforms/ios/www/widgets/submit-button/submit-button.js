angular.module('app.widgets.submitButton', [])
    .directive('submitButton', function(){
        return {
            restrict    : 'E',
            replace     : true,
            transclude  : true,
            templateUrl : 'widgets/submit-button/submit-button.html',
            controller  : ['$scope', '$element', '$timeout', controller],
            scope       : {
                config  : '=?'
            }
        };

        function controller($scope, $element, $timeout) {
            var resetTimer;
            if($scope.config == null) {
                $scope.config = {};
            }

            if($scope.config.autoLoad == null || $scope.config.autoLoad !== true) {
                $scope.config.autoLoad = false;
            }

            if($scope.config.buttonText == null || $scope.config.buttonText === '') {
                $scope.config.buttonText = 'Click';
            }

            if($scope.config.autoReset == null || $scope.config.autoReset !== true) {
                $scope.config.autoReset = false;
            }

            $scope.config.loading = loading;
            $scope.config.reset = reset;

            $scope.buttonClick = function(event) {
                if($scope.config.loadRightAway) {
                    loading();
                }
                $scope.config.buttonClick(event);
                if($scope.config.autoReset) {
                    if($scope.config.resetAfter == null || $scope.config.resetAfter < 0 || $scope.config.resetAfter > 10000) {
                        $scope.config.resetAfter = 2000;
                    }
                    $timeout($scope.config.reset, $scope.cofig.resetAfter);
                }
            };

            function loading() {
                $element.button('loading');
            }

            function reset() {
                $element.button('reset');
            }
        }
    });