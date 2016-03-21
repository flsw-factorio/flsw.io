'use strict';

angular.module('flswIoApp.auth', [
  'flswIoApp.constants',
  'flswIoApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
