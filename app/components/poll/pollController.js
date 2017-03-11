
app.controller("pollCtrl", ['$scope', '$routeParams', 'dataService',
    function($scope, $routeParams, dataService) {
        var topic = $routeParams.topic;
        dataService.getPoll(topic).then(function(response) {
            $scope.poll = response.data;
            drawChart($scope.poll);
        });

        $scope.modify = function(index) {
            dataService.modify(topic, index).then(function(response) {
                $scope.poll = response.data;
                drawChart($scope.poll);
            });
        };
    }
]);

// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      //google.charts.setOnLoadCallback(drawChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
function drawChart(obj) {
        // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Choice');
    data.addColumn('number', 'Votes');
    var arr = []
    for (var i = 0; i < obj.answers.length; i++) {
        arr.push([obj.answers[i].choice, obj.answers[i].count]);
    }
    data.addRows(arr);
        //data.addRows([
        //  ['Mushrooms', 3],
        //  ['Onions', 1],
        //  ['Olives', 1],
        //  ['Zucchini', 1],
        //  [obj.answers[0].choice, obj.answers[0].count]
        //]);

        // Set chart options
    var options = {'title':obj.question,
                   'width':500,
                   'height':300};

        // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
    }