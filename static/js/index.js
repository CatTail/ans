var app = angular.module('app', ['ngResource', 'toastr', 'mgcrea.ngStrap']);

angular.module('app').factory('Rule', ['$resource', function ($resource) {
    return $resource('/api/rule/:ruleId', {
        ruleId: '@id'
    }, {
        /*
        update: {
            method: 'PUT'
        },
       */
    });
}]);

angular.module('app').controller('MainController', ['$scope', 'Rule', 'toastr', function($scope, Rule, toastr) {
    Rule.query(function(rules) {
        $scope.rules = rules;
    });

    $scope.deleteRule = function(rule) {
        Rule.delete({id: rule.host}, function() {
            toastr.success('Rule deleted', 'Success');
        }, function(res) {
            toastr.error(res.data, 'Error');
        });
    };

    $scope.createRule = function() {
        console.log(arguments);
        console.log($scope);
    };
}]);
