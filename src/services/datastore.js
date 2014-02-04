App.factory('datastore', ['$q', 'dropbox', function($q, dropbox) {

    var dropbox_datastore = $q.defer(),
        dsm;

    if ( ! dropbox.isAuthenticated()) {
        dropbox_datastore.reject('Not authenticated!');
    }
    else {
        dsm = dropbox.getDatastoreManager();

        dsm.openDefaultDatastore(function (err, datastore) {
            if (err) {
                return dropbox_datastore.reject('Error opening default datastore: ' + err);
            }

            dropbox_datastore.resolve(datastore);
        });
    }

    return dropbox_datastore.promise;

}]);
