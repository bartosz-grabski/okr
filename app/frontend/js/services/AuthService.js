'use strict';

angular.module('okrs').service('authService', function ($window,$cookies, $http) {

  var loginGoogle = function() {
    $window.location.href = "/auth/google";
  };

  var userCookie = $cookies.get("userInfo");

  var service = {

    userInfo : null,

    providers: {
      'google': loginGoogle
    },

    login: function (provider) {
      console.log(provider, this);
      var p = this.providers[provider];
      if (p) p();
    },

    getUserInfo : function() {
      return this.userInfo;
    },

    setUserInfo : function(userInfo) {
      $cookies.putObject('userInfo',userInfo);
      this.userInfo = userInfo;
    },

    logout: function() {
      service.setUserInfo(null);
      $http.get("/logout");
    },

    isSignedIn : function() {
      return this.userInfo;
    }

  };


  if (userCookie) {
    service.setUserInfo(userCookie);
  }



return service;
});
