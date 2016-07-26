/**
 * Created by bartosz on 26/07/16.
 */

module.exports = function(mongoose) {

  var User = mongoose.model('User', {
    id : String,
    accessToken : String,
    refreshToken : String
  });

  return User;

};
