const filePeople ={
    "records":[
        {
            "Name":"Danny",
            "Age":"26",
            "Gender":"Male"
        },
        {
            "Name":"Allen",
            "Age":"16",
            "Gender":"Male"
        },
        {
            "Name":"Jan",
            "Age":"22",
            "Gender":"Female"
        },
        {
            "Name":"Kone",
            "Age":"36",
            "Gender":"Male"
        },
        {
            "Name":"Linda",
            "Age":"14",
            "Gender":"Female"
        },
        {
            "Name":"Bella",
            "Age":"16",
            "Gender":"Female"
        },
    ]
}

const app = angular.module('myAngularJS',[]);

/* $http GET方法
app.controller('people', function($scope, $http){
    $http({
        method: 'GET',
        url: '/database.json'
     }).then(function (response){
        $scope.persons = $scope.records;
     },function (error){

     });
}); */

app.controller('people', function($scope, $http){
    $scope.persons = filePeople.records;    
});