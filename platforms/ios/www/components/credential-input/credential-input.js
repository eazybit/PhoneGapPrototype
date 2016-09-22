angular.module('app.components.credentialInput', [])
    .directive('credentialInput', function() {
        return {
            restrict: 'E',
            scope: true,
            replace: true,
            transclude: true,
            templateUrl: 'components/credential-input/credential-input.html',
            link: link,
            controller: ['$scope', '$state', controller]
        };

        function link(scope, element) {
            if (window.localStorage.getItem('previous-user') != null) {
                scope.rememberUsernameFlag = true;
                scope.inputUsr = window.localStorage.getItem('previous-user');
                element.find(".pwd-input-box").focus();
            } else {
                scope.rememberUsernameFlag = false;
                element.find(".user-input-box").focus();
            }
        }

        function controller($scope, $state) {
            var self = this;
            var stopLoading = null;
            self.focused = false;

            // $scope.isShowRememberMe = localStorageHelper.available;//hide remember check box when in ipad private mode
            $scope.inputStyle = 'input-style';
            $scope.loginBtnStyle = 'login-btn-style';
            $scope.usernamePlaceholder = "Username";
            $scope.passwordPlaceholder = "Password";
            $scope.showLoadingBar = true;

            /**
             * initialize status of checkbox (checked/unchecked) based on history of saved username data
             */



            $scope.loginButtonConfig = {
                buttonText: 'LOG IN',
                buttonClick: loginBtnClick,
                buttonClass: 'login-btn'
            };
            $scope.errorMsgId = 'credential-input-error-msg-' + new Date().getTime();

            /* --- event handlers --- */

            /**
             * credential input box username text on change event handler
             */
            $scope.usernameOnChange = function () {
                $scope.userInputStyle = 'input-style';
                $scope.loginBtnStyle = 'login-btn-style';
                $scope.usernamePlaceholder = "Username";
            };

            /**
             * credential input box password text on change event handler
             */
            $scope.passwordOnChange = function () {
                $scope.passInputStyle = 'input-style';
                $scope.loginBtnStyle = 'login-btn-style';
                $scope.passwordPlaceholder = "Password";
            };

            /**
             * credential remember username checkbox on change event handler
             */
            $scope.checkedOnChange = function () {
                if (!($scope.rememberUsernameFlag)) {
                    window.localStorage.removeItem('previous-user');
                }
            };

            /**
             * logiin button click event handler
             * use Google cryptojs to encrypt the password using ECB mode and Pkcs7 padding
             * the key is agreeded with the server
             * call auth service to do the login
             */
            function loginBtnClick() {
                $('input').blur();
                var usr = $scope.inputUsr;
                var pwd = $scope.inputPwd;
                // check if username or password is empty
                if (usr == null || pwd == null || usr.length <= 0 || pwd.length <= 0) {
                    if (usr == null || usr.length <= 0) {
                        $scope.usernamePlaceholder = "Please enter a username";
                        $scope.userInputStyle = 'error-input';
                    }
                    else {
                        $scope.passwordPlaceholder = "Please enter a password";
                        $scope.passInputStyle = 'error-input';
                    }
                    return;
                }
                // var key = CryptoJS.enc.Utf8.parse('23hyraHdJkKPwMv');
                // var encrypted = CryptoJS.DES.encrypt(pwd, key, {
                //     mode: CryptoJS.mode.ECB,
                //     padding: CryptoJS.pad.Pkcs7
                // }).toString();

                if($scope.loginButtonConfig.loading && typeof $scope.loginButtonConfig.loading === 'function' &&
                    $scope.loginButtonConfig.reset && typeof $scope.loginButtonConfig.reset === 'function') {
                    $scope.loginButtonConfig.loading();
                    stopLoading = $scope.loginButtonConfig.reset;
                }
                $state.go('index.research');
                // call auth service to login
                // authService.login(usr, encrypted, loginSuccess, loginFailure);
            }
        }
    });