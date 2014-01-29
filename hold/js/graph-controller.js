.controller("ExhibitorDetailCtrl", ['$scope', '$routeParams', 'ExhibitorService', 'ContactsService', function($scope, $routeParams, ExhibitorService, ContactsService) {
      //$scope.exhibitor = Exhibitor.data;
      $scope.contacts = ContactsService.get({exhibitorId: $routeParams.exhibitorId}, function(contacts){
            var PrimaryContact = _.filter(contacts, function(contact){return contact.primary == 1});
            $scope.primary = PrimaryContact[0];
            $scope.AllContacts = contacts;
      });
      $scope.exhibitor = ExhibitorService.get({exhibitorId: $routeParams.exhibitorId}, function(exhibitor) {
            $scope.title = exhibitor.company;
            var frev = eval(exhibitor.forcast_revenue);
            var apaid = eval(exhibitor.amount_paid);
            var tdue = eval(exhibitor.total_due);
            
            
            $scope.chart = {
              "type": "PieChart",
              "displayed": true,
              "cssStyle": "height:600px; width:100%; fill: rgba(0,0,0,0);",
              "data": {
                "cols": [
                  {
                    "id": "forcast_revenue",
                    "label": "Forcast Revenue",
                    "type": "string",
                    "p": {}
                  },{
                    "id": "amount_paid",
                    "label": "Amount paid",
                    "type": "number",
                    "p": {}
                  },{
                    "id": "total_due",
                    "label": "Total due",
                    "type": "number",
                    "p": {}
                  }
                ],
                "rows": [
                  {
                    "c": [
                      {
                        "v": "Forcast Revenue"
                      },
                      {
                        "v": frev,
                        "f": exhibitor.forcast_revenue,
                      }
                    ]
                  },{
                    "c": [
                      {
                        "v": "Amount paid"
                      },
                      {
                        "v": apaid,
                        "f": exhibitor.amount_paid
                      }
                    ]
                  },{
                    "c": [
                      {
                        "v": "Total due"
                      },
                      {
                        "v": tdue,
                        "f": exhibitor.total_due
                      }
                    ]
                  }
                ]
              },
              "options": {
                "title": "Financial Summary",
                "isStacked": "true",
                "fill": 20,
                "displayExactValues": true,
                "vAxis": {
                  "title": "Sales unit",
                  "gridlines": {
                    "count": 10
                  }
                },
                "hAxis": {
                  "title": "Finances"
                }
              },
              "formatters": {}
            }
      });
}])
