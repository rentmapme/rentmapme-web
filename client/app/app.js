'use strict';

angular.module('rentmapmeNodeApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'uiGmapgoogle-maps',
  'ui.bootstrap.datetimepicker'
])
  .run(['$templateCache', function ($templateCache) {
    $templateCache.put('searchbox.tpl.html', '<input id="pac-input" class="pac-controls" type="text" placeholder="Search">');
    $templateCache.put('window.tpl.html', '<div ng-controller="WindowCtrl" ng-init="showPlaceDetails(parameter)">{{place.name}}</div>');
    //$templateCache.put('control.tpl.html', '<button class="btn btn-sm btn-primary" ng-class="{\'btn-warning\': danger}" ng-click="controlClick()">{{controlText}}</button>');
    $templateCache.put('control.tpl.html', '<div id="resultPane">' +
    '<button class="btn btn-lg  col-lg-12" ng-click="toggleCollapsed()" id="collapseBtn"><span class="glyphicon pull-right" ng-class="collapseState()"""></span> Search Results</button>' +
    //+'<a href="#" ng-click="isCollapsed = !isCollapsed" class="btn btn-lg btn-default pull-right">Search Results<span class="glyphicon glyphicon-list pull-right"></span></a><hr>'
    //'<div id="resultswrapper" collapse="isCollapsed">' +

    '<div id="resultList">' +

    '<ul collapse="isCollapsed">' +
    '<li ng-repeat=" apartment in apartments">{{apartment.streetAddress}}</li>' +
    '</ul></div>'+
    ' <pagination id="pages" items-per-page="limit" num-pages="noOfPages" total-items="totalItems" ng-model="currentPage" ng-change="pageChanged()" max-size="3" ng-show="!isCollapsed" ></pagination>'+
    '</div>');
    //$templateCache.put('list.tpl.html', '<ul class="well" collapse="isCollapsed"><li>1</li><li>2</li></li></ul>');




  }])


  .config(function ($routeProvider, $locationProvider, $httpProvider, uiGmapGoogleMapApiProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push('authInterceptor');


    uiGmapGoogleMapApiProvider.configure({
      libraries:'places',
      v: '3.17'
    })
    //console.log(uiGmapGoogleMapApiProvider);


  })
  //.config(function(GoogleMapApiProviders){
  //  console.log('configuring angular maps ')
  //})

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  })

  //.run(['$templateCache', function ($templateCache) {
  //  $templateCache.put('searchbox.tpl.html', '<input id="pac-input" class="pac-controls" type="text" placeholder="Search">');
  //  $templateCache.put('window.tpl.html', '<div ng-controller="WindowCtrl" ng-init="showPlaceDetails(parameter)">{{place.name}}</div>');
  //}]);


