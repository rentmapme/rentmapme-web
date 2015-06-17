angular.module('rentmapmeNodeApp').controller('AddRentCtrl', function ($scope, Rent) {

  $scope.rate = 3;
  $scope.max = 5;
  $scope.isReadOnly = true;
  $scope.gPlace;
  $scope.rentModel = {
    rent: {}
  }

  $scope.status = {
    isopen: true
  };



  $scope.toggleDropdown = function($event) {
    //console.log('')
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };

  $scope.hoveringOver = function(value) {
    console.log('hoveringOver ' + value);
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };

  $scope.ratingStates = [
    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    {stateOn: 'glyphicon-heart'},
    {stateOff: 'glyphicon-off'}
  ];


  $scope.onStartEndTime = function(netTime, oldTime) {
    console.log('leaseStartTime')
    //console.log(oldTime, newTime);
    //console.log(oldTime)
    //console.log(new Date(newTime).getTime());
  }

  $scope.onLeaseEndTime = function(oldTime, newTime) {
    console.log('leaseEndTime')
    console.log(oldTime, newTime);
  }

  //$scope.addRent = function(form) {
  //  console.log('addRent');
  //}

  $scope.rent = {
    rentAmount: '',
    review: '',
    rate: '3'
  }

  $scope.addRent = function(form) {
    console.log('addRent');
    console.log(Rent);
    console.log($scope.rentModel);
    if($scope.form.$valid) {
      console.log('valid');
      //console.log($scope.);
      Rent.addRent($scope.rentModel).then(function(data){
        console.log(data);
        console.log('rent posted');
        $scope.rents.push(data);
        $scope.toggleRentForm();
      })
    } else {
      console.log('invalid');

    }
  }

  $scope.parsePlaceObject = function() {
    console.log($scope.gPlace);
      console.log($scope.gPlace.getPlace());
    console.log($scope.gPlace.getPlace().getLocation().getLat());
    $scope.gPlace.getPlace().each(function (component){

      if (component.types[0]==="neighborhood"){
        console.log("neighorbood is " + component.long_name);
        $scope.neighborhood= component.long_name;
      }
      if (component.types[0]==="street_number"){
        console.log("street_number is " + component.long_name);
        $scope.streetNumber = component.long_name;
      }
      if (component.types[0]==="locality"){
        console.log("street_name is " + component.long_name);
        $scope.city = component.long_name;
      }
      if (component.types[0]==="administrative_area_level_2"){
        console.log("county_name is " + component.long_name);
        $scope.county = component.long_name;
      }
      if (component.types[0]==="administrative_area_level_1"){
        console.log("state name is " + component.short_name);
        $scope.state = component.short_name;
      }
      if (component.types[0]==="postal_code"){
        console.log("zip_code is " + component.long_name);
        $scope.zipCode = component.long_name;
      }

      if (component.types[0]==="route"){
        console.log("streetname  is " + component.long_name);
        $scope.streetName = component.long_name;

      }

    })
  }
})
