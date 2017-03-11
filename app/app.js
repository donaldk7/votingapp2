var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "app/components/home/homeView.html",
            controller: "homeCtrl"
        })
        .when("/poll/:topic", {
            templateUrl: "app/components/poll/pollView.html",
            controller: "pollCtrl"
        })
        .when("/new", {
            templateUrl: "app/components/new/newView.html",
            controller: "newCtrl"
        });

    // use the HTML5 History API, to avoid the # routing
    $locationProvider.html5Mode(true);
});