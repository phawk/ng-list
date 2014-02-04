App.factory('dropbox', function() {

    /*global Dropbox */
    var client = new Dropbox.Client({key: '7yzur77x3tc2cy2'});

    client.authenticate({ interactive: false }, function (error) {
        if (error) {
            return console.error('Authentication error: ' + error);
        }
    });

    return client;

});
