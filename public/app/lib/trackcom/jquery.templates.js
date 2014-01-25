jQuery.extend
    (
        {
            
            trucks_temp: function(id, number, driver, method_name) 
            {
                
                var temp = [
                        '<div id="truck_panel_"' + id + ' class="col-md-12 truck_panel">',
                            '<div class="panel panel-primary">',
                                '<div class="panel-heading" style="text-align:center;"><h1 class="panel-title" style="">' + number + ' <i class="fa fa-truck fa-flip-horizontal"></i></h1></div>',
                                '<div class="panel-body">',
                                    '<ul id="drop_truck_' + id + '" class="connectedSortable drop_orders unstyled-list" data-id="' + id + '" style="min-height:10px;"></ul></div>',
                                '<div class="panel-footer">',
                                    '<p style="display:inline;">Driver: <strong id="truck_driver_' + id + '">' + driver + '</strong></p><br />',
                                    '<p style="display:inline;">Location: <strong id="truck_driver_' + id + '">' + method_name + '</strong></p>',
                                '</div></div></div>'
                        ].join('');
               return temp;
            }
            
        }
    );