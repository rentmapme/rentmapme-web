angular.module('rentmapmeNodeApp')


.controller('MapCtrl', ['$scope', '$routeParams', '$location', 'Map','uiGmapIsReady',
                    function ($scope, $routeParams, $location, Map, IsReady) {
                      $scope.apartments = [];
                      $scope.limit = 8;
                      $scope.noOfPages;
                      $scope.totalItems;
                      $scope.currentPage = 0;

                      $scope.customIcon = "../../assets/images/map_icon_normal.png"

                      //$scope.previous = function($event){
                      //  console.log('previous');
                      //  $event.preventDefault();
                      //  $event.stopPropagation();
                      //  if ($scope.currentPage>1) {
                      //    $scope.currentPage = $scope.currentPage - 1;
                      //    //$scope.getSlicedData();
                      //  }
                      //
                      //
                      //};
                      //
                      //$scope.next  = function($event) {
                      //  console.log('next');
                      //  $event.preventDefault();
                      //  $event.stopPropagation();
                      //  if ($scope.currentPage<($scope.totalItems/$scope.limit){
                      //    $scope.currentPage = $scope.currentPage+1;
                      //    //$scope.getSlicedData();
                      //  }
                      //
                      //}

                      $scope.pageChanged = function (value) {
                        console.log('pageChanged' + $scope.currentPage);
                        $scope.offset = $scope.limit * ($scope.currentPage - 1);
                        $scope.getData($scope.limit, $scope.offset);
                      }

                      $scope.isCollapsed = false;
                      $scope.toggleCollapsed = function () {
                        console.log('toggle collapse');
                        $scope.isCollapsed = !$scope.isCollapsed;
                        console.log($scope.apartments);
                      }

                      $scope.map = {
                        center: {
                          latitude: $routeParams.lat,
                          longitude: $routeParams.lon
                        },

                        zoom: 5,
                        bounds: {},
                        events: {
                          tilesloaded: function (map) {
                            //console.log('tiles loaded');
                            $scope.$apply(function () {
                              //$scope.mapInstance = map;
                              console.log(map.getBounds().getNorthEast());

                              $scope.searchbox.options.bounds = new google.maps.LatLngBounds(map.getBounds().getNorthEast(),
                                map.getBounds().getSouthWest());

                            });
                          },
                          idle: function (map) {
                            console.log('idle')
                            $scope.map.refresh = false;
                            ////console.log(map);
                            //$scope.map.control.getGMap()
                          },
                          resize: function (map) {
                            console.log('resize');
                          },
                          zoom_changed : function(map) {
                            console.log('zoom changed');
                          },
                          //click: function() {
                          //
                          //},
                          dragend: function () {

                          }
                        },
                        markersEvents: {
                          click: function (marker, eventName, model, args) {
                            console.log('markerEvent click');
                            $scope.map.window.model = model;
                            $scope.map.window.show = true;
                          }
                        },

                        window: {
                          marker: {},
                          show: false,
                          closeClick: function () {
                            this.show = false;
                          },
                          options: {} // define when map is ready
                        },

                        control: {},
                        refresh: function () {
                          //$scope.map.control.refresh();
                        }
                      }
                      $scope.control = {}

                      $scope.markers = [];

                      //$scope.click = function(marker) {
                      //  console.log(marker.model);
                      //  $scope.map.window.model = marker.model;
                      //  $scope.map.window.show = true;
                      //}

                      IsReady.promise().then(function (instances) {
                        console.log('isready????');
                        //console.log(instances);
                        console.log($scope.map.control);
                        //$scope.mapInstance = instances[0]
                        //console.log($scope.control);
                        //instances.forEach(function(inst) {
                        //console.log('here?');
                        //console.log(inst)
                        //console.log($scope.map.control);
                        //console.log($scope.control);


                        $scope.mapInstance = $scope.map.control.getGMap();
                        //console.log($scope.map.control);
                        //console.log($scope.control);
                        //var uuid = $scope.mapInstance.uiGmap_id;
                        //var mapInstanceNumber = inst.instance; // Starts at 1.
                        //$scope.searchbox.options.bounds = new google.maps.LatLngBounds($scope.mapInstance.getBounds().getNorthEast(),
                        //  $scope.mapInstance.getBounds().getSouthWest());
                        $scope.getData($scope.limit, 0, instances);
                        //});
                      });

                      //  uiGmapGoogleMapApi.then(function (map) {
                      //    console.log('map loaded');
                      //    //console.log(map);
                      //    //console.log(maps.getBounds());
                      //    $scope.getData(10, 0, map);
                      //
                      //    map.visualRefresh = true;
                      //    //$scope.mapInstance = map;
                      //
                      //
                      //})

                      $scope.getData = function (limit, offset, map) {
                        Map.getApartments($routeParams.lat, $routeParams.lon, limit, offset).then(function (data) {
                          //$scope.markers = [];
                          //$scope.$apply(function(){
                          $scope.apartments = data.apartments;
                          $scope.totalItems = data.totalRecords;
                          $scope.numOfPage = $scope.totalItems / $scope.limit;
                          console.log($scope.apartments);
                          //console.log($scope.control);
                          //console.log('force refresh');

                          ////console.log(apartment);
                          //setTimeout(function () {
                          //  console.log('setTimeout');
                          //  console.log($scope.map.control);
                          //  //clearTimeout();
                          //  if ($scope.control.refresh !== undefined) {
                          //    console.log('refresh');
                          //    $scope.control.refresh();
                          //
                          //  }
                          //  //$scope.mapInstance.event.trigger($scope.mapInstance, 'resize');
                          //  //$scope.map.refresh = true;
                          //  //
                          //  //$scope.mapInstance;
                          //  //$scope.map.refresh();
                          //
                          //}, 100)
                          //
                          ////})

                          //_.each($scope.apartments, function (apartment) {
                          //})
                          //console.log(apartments);


                          //console.log(map);
                        });

                      }

                      $scope.searchbox = {
                        template: 'searchbox.tpl.html',
                        //position:'top-right',
                        position: 'top-left',
                        options: {
                          autocomplete: true,
                          types: ['(cities)'],
                          componentRestrictions: {country: 'us'},
                          bounds: {}
                        },


                        events: {
                          places_changed: function (searchBox) {

                            var places = searchBox.getPlaces()

                            if (places.length == 0) {
                              return;
                            }

                            //todo update the results based on the search parameters...
                            // // For each place, get the icon, place name, and location.
                            // newMarkers = [];
                            // var bounds = new google.maps.LatLngBounds();
                            // for (var i = 0, place; place = places[i]; i++) {
                            //   // Create a marker for each place.
                            //   var marker = {
                            //     id:i,
                            //     place_id: place.place_id,
                            //     name: place.name,
                            //     latitude: place.geometry.location.lat(),
                            //     longitude: place.geometry.location.lng(),
                            //     options: {
                            //       visible:false
                            //     },
                            //     templateurl:'window.tpl.html',
                            //     templateparameter: place
                            //   };
                            //   newMarkers.push(marker);

                            //   bounds.extend(place.geometry.location);
                            // }

                            // $scope.map.bounds = {
                            //   northeast: {
                            //     latitude: bounds.getNorthEast().lat(),
                            //     longitude: bounds.getNorthEast().lng()
                            //   },
                            //   southwest: {
                            //     latitude: bounds.getSouthWest().lat(),
                            //     longitude: bounds.getSouthWest().lng()
                            //   }
                            // }

                            // _.each(newMarkers, function(marker) {
                            //   marker.closeClick = function() {
                            //     $scope.selected.options.visible = false;
                            //     marker.options.visble = false;
                            //     return $scope.$apply();
                            //   };
                            //   marker.onClicked = function() {
                            //     $scope.selected.options.visible = false;
                            //     $scope.selected = marker;
                            //     $scope.selected.options.visible = true;
                            //   };
                            // });

                            // $scope.map.markers = newMarkers;
                          }
                        }
                      },

                        //$scope.collapseState = function () {
                        //  console.log("collapseState")
                        //  if ($scope.isCollapsed) {
                        //    return "glyphicon-list";
                        //  } else {
                        //    return "glyphicon-remove"
                        //  }
                        //}


                      //$scope.$watch('apartments', function(){
                      //  console.log('apartments changed');
                      //  //$scope.map.refresh = true;
                      //  //$scope.mapInstance.control.refresh();
                      //  //google.maps.event.trigger($scope.mapInstance, 'resize');
                      //}),

                      $scope.go = function (event, apartment) {
                        //event.preventDefault();
                        //console.log(event);
                        //console.log("go " + apartment._id);
                        //console.log(event);
                        //console.log('go to /devices/' + this.device._id);v
                        var url = '/apartment?id=' + apartment._id;
                        //console.log(url)
                        //console.log(event);
                        event.preventDefault();
                        event.stopPropagation();
                        console.log(url);
                        $scope.$evalAsync(function() {

                          event.preventDefault();
                          $location.path(url);
                        })
                        //$location.path('www.google.com');

                        //event.preventDefault();

                        //console.log($location.path());
                        //$location.replace();
                      },

                      $scope.collapseState = function () {
                        console.log("collapseState")
                        if ($scope.isCollapsed) {
                          return "glyphicon-list";
                        } else {
                          return "glyphicon-remove"
                        }
                      }


                      $scope.$on('$viewContentLoaded', function () {
                        console.log('$viewContentLoaded');
                        var mapHeight = 800; // or any other calculated value
                        console.log($(document).height())
                        //$("#left").height(mapHeight);
                        //$("#right").height(mapHeight);
                        $("#left").height(Math.min(mapHeight,$(document).height()));
                        $("#right").height(Math.min(mapHeight,$(document).height()));
                      });


        }])
  //.controller('controlCtrl', function ($scope) {
  //  $scope.controlText = 'I\'m a custom control';
  //  $scope.danger = false;
  //  $scope.controlClick = function () {
  //    $scope.danger = !$scope.danger;
  //    alert('custom control clicked!');
  //  };
  //});
  .controller('controlController', function ($scope) {
    //$scope.controlText = 'I\'m a custom control';
    //$scope.danger = false;
    //$scope.controlClick = function () {
    //  $scope.danger = !$scope.danger;
    //  alert('custom control clicked!')
    //};
    //$scope.collapseState = function () {
    //  console.log("collapseState")
    //  if ($scope.isCollapsed) {
    //    return "glyphicon-list";
    //  } else {
    //    return "glyphicon-remove"
    //  }
    //}
  })
  .controller('infoWindowController', function($scope, $location) {
    $scope.go = function() {
      console.log('go');
    }
  })



  .run(['$templateCache', function ($templateCache) {
    $templateCache.put('searchbox.tpl.html', '<input id="pac-input" class="pac-controls" type="text" placeholder="Search">');
    $templateCache.put('window.tpl.html', '<div ng-controller="WindowCtrl" ng-init="showPlaceDetails(parameter)">{{place.name}}</div>');
  }])

  .controller('WindowCtrl', function ($scope) {
    $scope.place = {};
    $scope.showPlaceDetails = function(param) {
      $scope.place = param;
    }
  })

  .controller("MapCtrl",['$scope', '$timeout', 'uiGmapLogger', '$http', '$routeParams', 'uiGmapGoogleMapApi','Map'
    , function ($scope, $timeout, $log, $http, $routeParams, GoogleMapApi, Map) {
      $log.doLog = true

      $scope.apartments = [];
      $scope.limit = 8;
      $scope.noOfPages;
      $scope.totalItems;
      $scope.currentPage = 0;

      $scope.customIcon = "../../assets/images/map_icon_normal.png"

      GoogleMapApi.then(function(maps) {
        maps.visualRefresh = true;
        $scope.defaultBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(40.82148, -73.66450),
          new google.maps.LatLng(40.66541, -74.31715));


        $scope.map.bounds = {
          northeast: {
            latitude:$scope.defaultBounds.getNorthEast().lat(),
            longitude:$scope.defaultBounds.getNorthEast().lng()
          },
          southwest: {
            latitude:$scope.defaultBounds.getSouthWest().lat(),
            longitude:-$scope.defaultBounds.getSouthWest().lng()

          }
        }
        $scope.searchbox.options.bounds = new google.maps.LatLngBounds($scope.defaultBounds.getNorthEast(), $scope.defaultBounds.getSouthWest());
        console.log('getData');
        $scope.getData($scope.limit, 0);
      });



      $scope.getData = function (limit, offset, map) {
        Map.getApartments($routeParams.lat, $routeParams.lon, limit, offset).then(function (data) {
          //$scope.markers = [];
          //$scope.$apply(function(){
          $scope.apartments = data.apartments;
          $scope.totalItems = data.totalRecords;
          $scope.numOfPage = $scope.totalItems / $scope.limit;
        });

      }


      $scope.pageChanged = function (value) {
        console.log('pageChanged' + $scope.currentPage);
        $scope.offset = $scope.limit * ($scope.currentPage - 1);
        $scope.getData($scope.limit, $scope.offset);
      }

      $scope.isCollapsed = false;
      $scope.toggleCollapsed = function () {
        console.log('toggle collapse');
        $scope.isCollapsed = !$scope.isCollapsed;
        console.log($scope.apartments);
      }


      $scope.collapseState = function () {
        console.log("collapseState")
        if ($scope.isCollapsed) {
          return "glyphicon-list";
        } else {
          return "glyphicon-remove"
        }
      }


      $scope.$on('$viewContentLoaded', function () {
        console.log('$viewContentLoaded');
        var mapHeight = 800; // or any other calculated value
        console.log($(document).height())
        //$("#left").height(mapHeight);
        //$("#right").height(mapHeight);
        $("#left").height(Math.min(mapHeight,$(document).height()));
        $("#right").height(Math.min(mapHeight,$(document).height()));
      });


      angular.extend($scope, {
        // selected: {
        //   options: {
        //     visible:false

        //   },
        //   templateurl:'window.tpl.html',
        //   templateparameter: {}
        // },
        map: {
          control: {},
          center: {
            latitude: $routeParams.lat,
            longitude: $routeParams.lon
          },
          zoom: 5,
          dragging: false,
          bounds: {},
          markers: [],
          idkey: 'place_id',
          events: {
            idle: function (map) {
              console.log('idle')
            },
            dragend: function(map) {
              //update the search box bounds after dragging the map
              console.log('dragend');
              // var bounds = map.getBounds();
              // var ne = bounds.getNorthEast();
              // var sw = bounds.getSouthWest();
              // $scope.searchbox.options.bounds = new google.maps.LatLngBounds(sw, ne);
              //$scope.searchbox.options.visible = true;
            }
          }
        },
        searchbox: {
          template:'searchbox.tpl.html',
          //position:'top-right',
          position:'top-left',
          options: {
            bounds: {}
          },
          //parentdiv:'searchBoxParent',
          events: {
            places_changed: function (searchBox) {

              console.log('places_changed');

              // places = searchBox.getPlaces()

              // if (places.length == 0) {
              //   return;
              // }
              // // For each place, get the icon, place name, and location.
              // newMarkers = [];
              // var bounds = new google.maps.LatLngBounds();
              // for (var i = 0, place; place = places[i]; i++) {
              //   // Create a marker for each place.
              //   var marker = {
              //     id:i,
              //     place_id: place.place_id,
              //     name: place.name,
              //     latitude: place.geometry.location.lat(),
              //     longitude: place.geometry.location.lng(),
              //     options: {
              //       visible:false
              //     },
              //     templateurl:'window.tpl.html',
              //     templateparameter: place
              //   };
              //   newMarkers.push(marker);

              //   bounds.extend(place.geometry.location);
              // }

              // $scope.map.bounds = {
              //   northeast: {
              //     latitude: bounds.getNorthEast().lat(),
              //     longitude: bounds.getNorthEast().lng()
              //   },
              //   southwest: {
              //     latitude: bounds.getSouthWest().lat(),
              //     longitude: bounds.getSouthWest().lng()
              //   }
              // }

              // _.each(newMarkers, function(marker) {
              //   marker.closeClick = function() {
              //     $scope.selected.options.visible = false;
              //     marker.options.visble = false;
              //     return $scope.$apply();
              //   };
              //   marker.onClicked = function() {
              //     $scope.selected.options.visible = false;
              //     $scope.selected = marker;
              //     $scope.selected.options.visible = true;
              //   };
              // });

              // $scope.map.markers = newMarkers;
            }
          }
        }
      });
    }])
  .controller('infoWindowController', function($scope, $location) {
    $scope.go = function() {
      console.log('go');
    }})
