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
            },
            truck_orders_temp: function(id, title, truck, position, dtype, number)
            {
                var temp = ['<li id="' + id + '" class="external-order label ui-draggable visible-lg" data-dtype="' + dtype + '" style="position: relative;">',
                '<i class="fa fa-tags" style=""></i> ' + title + ' </li><li id="' + id + '" class="external-order label ui-draggable hidden-lg" data-dtype="' + dtype + '" style="position: relative;">',
                '<i class="fa fa-tags" style=""></i> ' + number + ' </li>'].join('');
                return temp;
            },
            get_notifies_temp: function(label, title, subject, body)
            {
                var temp = [
                    '<blockquote class=" alert goonote note-' + label + '"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><h2 class="block">',
                    title,
                    '<small style="font-size:12px;">',
                    subject,
                    '</small></h2><p>',
                    body,
                    '</p></blockquote>'
                ].join('');
                return temp;
            },
            get_entries_temp: function(id, sku, status, color, url)
            {
                var temp = [
                '<li>',
                    '<div class="col-md-3 col-sm-3">',
                            '<p>' + sku + '</p>',
                    '</div>',
                    '<div class="col-md-8 col-sm-8">',        
                        '<div class="progress progress-striped">',
                            '<div style="width: ' + status + '%;" class="progress-bar progress-bar-' + color + '" aria-valuenow="' + status + '" aria-valuemin="0" aria-valuemax="100">',
                                '<span class="sr-only">' + status + '%% Complete</span>',
                            '</div>',
                        '</div>',
                    '</div>',
                    '<div class="col-md-1 col-sm-1">',
                        '<span class="percent pull-right">' + status + '%</span>',
                    '</div>',
                '</li>'
                ].join("");
                return temp;
            },
            entry_content_temp: function(id)
            {
                var temp = '<div class="item"><ul id="entry_content_' + id + '" class="feeds entry_feed"></ul></div>';
                return temp;
            },
            initCalendar: function (eventsUrl) {
                if (!jQuery().fullCalendar) {
                    return;
                }

                var date = new Date();
                var d = date.getDate();
                var m = date.getMonth();
                var y = date.getFullYear();

                var h = {};

                if ($('#calendar').width() <= 400) {
                    $('#calendar').addClass("mobile");
                    h = {
                        left: 'title, prev, next',
                        center: '',
                        right: 'today,month,agendaWeek,agendaDay'
                    };
                } else {
                    $('#calendar').removeClass("mobile");
                    if (App.isRTL()) {
                        h = {
                            right: 'title',
                            center: '',
                            left: 'prev,next,today,month,agendaWeek,agendaDay'
                        };
                    } else {
                        h = {
                            left: 'title',
                            center: '',
                            right: 'prev,next,today,month,agendaWeek,agendaDay'
                        };
                    }               
                }

                $('#calendar').fullCalendar('destroy'); // destroy the calendar
                $('#calendar').fullCalendar({ //re-initialize the calendar
                    disableDragging: false,
                    defaultView: 'agendaWeek',
                    header: h,
                    editable: true,
                    eventSources: [
                                    eventsUrl
                                ],
                });
            }
            
        }
    );