 app.service('dataService', function($http) {
   this.getAll = function() {
      return $http({
          method: 'GET',
          url: '/api/all'
      });
   };
   
   this.getPoll = function(topic) {
       return $http({
           method: 'GET',
           url: '/api/poll/' + topic
       });
   };
   
   this.modify = function(topic, index) {
       return $http({
           method: 'GET',
           url: '/api/mod/' + topic + '/' + index
       });
   };
   
   this.delete = function(topic) {
       return $http({
           method: 'delete',
           url: '/api/poll/' + topic
       });
   };
 });

