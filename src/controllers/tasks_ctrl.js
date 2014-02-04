(function() {

    App.controller('TasksCtrl', ['$scope', 'dropbox', 'datastore', function($scope, dropbox, datastore) {
        $scope.tasks = [];
        $scope.new_task = {name: ''};


        $scope.createTask = function(new_task) {
            datastore.then(function(ds){
                var task_table = ds.getTable('tasks'),
                    task;

                task = task_table.insert({
                    completed: false,
                    created_at: new Date(),
                    name: new_task.name
                });

                task.json = task.getFields();

                $scope.tasks.push(task);

                new_task.name = '';
            });
        };

        $scope.markTask = function(task) {
            var complete = !task.json.completed;

            task.update({ 'completed': complete });
            task.json.completed = complete;

            return true;
        };

        datastore.then(function(ds){
            var task_table = ds.getTable('tasks');

            $scope.tasks = task_table.query().map(function(task) {
                task.json = task.getFields();
                return task;
            });
        });

    }]);


})();
