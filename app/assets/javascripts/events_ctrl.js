(function () {
  "use strict";

  angular.module("app").controller("EventsCtrl", function($scope, $http) {

    $scope.setup = function() {
      $http({method: 'JSONP',
        url:'http://localhost:3000/api/v1/users/events/?user_id=5&callback=$scope.jsonpCallback'});
    }

    $scope.jsonpCallback = function(json){
      console.log(json);
      var networks=[json];
      $scope.events = [];
      for (var i=0;i<networks.length;i++){
        var network = networks[i];
        var networkTitle = network.title;
        for (var j=0;j<network.events.length;j++){
          network.events[j]["network_title"]=networkTitle;
          $scope.events.push(network.events[j]);
        }

      }
      $scope.events = convertEventsDates($scope.events);
      $scope.setupColors();
      $scope.selectEvent(findSoonestEvent($scope.events));
    }

    $scope.setupColors = function(){ 
      $scope.events.bgRgbaHeadDefault = hexToRgba("#00b6aa");
      $scope.events.bgRgbaBodyDefault = hexToRgba("#fafafa");

      $scope.events.bgRgbaHeadMouseover=replaceAlpha($scope.events.bgRgbaHeadDefault,".7");
      $scope.events.bgRgbaBodyMouseover=replaceAlpha($scope.events.bgRgbaBodyDefault,".3");

      for (var i=0;i<$scope.events.length;i++){   
        $scope.events[i].bgRgbaHead=$scope.events.bgRgbaHeadDefault;
        $scope.events[i].headOpacity=1;
        $scope.events[i].bodyOpacity=1;
        $scope.events[i].bgRgbaBody=$scope.events.bgRgbaBodyDefault;
      }
    }

    $scope.selectEvent = function(event) {
      $scope.events.selected_id=event.id;
      $scope.events.selected_title=event.title;
      $scope.events.selected_subscribe_count=event.subscribe_count;
      $scope.setupColors();
    }


    $scope.mouseoverEvent = function(event){
      event.bgRgbaHead=$scope.events.bgRgbaHeadMouseover;
      event.bgRgbaBody=$scope.events.bgRgbaBodyMouseover;
    }

    $scope.mouseleaveEvent = function(event){
      event.bgRgbaHead=$scope.events.bgRgbaHeadDefault;
      event.bgRgbaBody=$scope.events.bgRgbaBodyDefault;
    }

    // $scope.events = [
    //     { 
    //       id: 1,
    //       title: "Women Who Code - Medellín",
    //       event_date: "2015-12-23 18:00:00 UTC",
    //       time_zone: 'US/Pacific',
    //       location: "Hack Reactor",
    //       network: {
    //         title:"San Francisco"
    //       },
    //       subscribe_count: 1
    //     },
    //     { 
    //       id: 4,
    //       title: "Algorhitms and Interview Prep - TBD",
    //       event_date: "2016-01-01 18:45:00 UTC",
    //       location: "Hack Reactor",
    //       time_zone: 'US/Pacific',
    //       network: {
    //         title:"East Bay"
    //       },
    //       subscribe_count: 11
    //     },
    //     { 
    //       id: 3,
    //       title: "JavaScript Study Group (Hack Reactor)",
    //       event_date: "2016-01-23 24:00:00 UTC",
    //       location: "Hack Reactor",
    //       time_zone: 'US/Eastern',
    //       network: {
    //         title:"New York City"
    //       },
    //       subscribe_count: 0
    //     }
    // ];

    window.$scope = $scope;
  
  });
}());

