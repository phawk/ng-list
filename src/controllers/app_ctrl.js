(function() {

    App.controller('AppCtrl', ['$scope', 'dropbox', function($scope, dropbox) {
        $scope.user = {};
        $scope.authed = false;

        $scope.signIn = function($event) {
            $event.preventDefault();

            dropbox.authenticate();
        };

        $scope.signOut = function($event) {
            $event.preventDefault();

            dropbox.signOut(function() {
                window.location.reload();
            });
        };

        if (dropbox.isAuthenticated()) {
            $scope.authed = true;

            dropbox.getAccountInfo(function(err, data, user_info) {
                if (err) {
                    return console.error(err);
                }

                $scope.user = user_info;
            });
        }

    }]);


})();
