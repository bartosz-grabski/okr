/**
 * Created by bartosz on 26/07/16.
 */


var google = require('googleapis');
var googleAuth = require('google-auth-library')

module.exports = function(config) {

  console.log(config);

  var script = google.script(config.appsScript.version);
  var auth = new googleAuth();

  var oauth2Client = new auth.OAuth2(
    "1065784269880-bh19km3ms01ldplp7gisst8hgc5drfov.apps.googleusercontent.com",
    "VxUgs--ownKIYbNyqfYaoyp9",
    "http://127.0.0.1:8080/auth/google/callback"
  );


  var scriptModule = {

    scopes : config.appsScript.scopes,

    getOkrs : function(accessToken, callback) {

      var getOkrsCallback = function(err, resp) {
        var error = err || resp.error;
        console.log(error, resp);
        if (error) {
          callback(error, null);
        } else {
          callback(null,resp.response.result);
        }
      };

      var auth = oauth2Client;
      auth.credentials = { access_token :  accessToken};

      console.log(auth);

      script.scripts.run({
        auth: auth,
        resource: {
          function : 'getOKRs'
        },
        scriptId: config.appsScript.scriptId
      }, getOkrsCallback)
    },

    setOkr : function(accessToken, okr, callback) {

    }

  };


  return scriptModule;

};
