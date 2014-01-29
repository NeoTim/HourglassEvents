/** 
   * @ToDo:
   * Monatsansicht
   * 
   */
  var calendarDirective = angular.module('directive.calendar', []);
        
  var timeout = function(scope, fn) { return function() { 
    console.log('timeouting...', scope.$$phase)
    scope.$apply(fn);
  }; };

  var getStartOfWeek = function startOfWeek(day) {
    // check if we have the monday-sunday problem
    if(day.clone().day(1).diff(date)>0)
      day.add('days', -7);
    return day.day(1);
  };
  
  var hoverSelektor = function(element, selektor, klass) {
    element.hover( function() { angular.element(selektor).addClass(klass); }
                 , function() { angular.element(selektor).removeClass(klass); }
    );
  };
  
  var SECONDS_OF_A_DAY  = 24*60*60
    , SLOT_WIDTH        = 10
    , PLUNKER           = true;

  var dateParser = function dateParser(event) {
    
  };
  
  var updateChain = function updateChain() {
    var handler = [], length = 0;
    var update = function Update(fn) {
      handler[length] = fn;
      length ++;
      fn.apply(this, []);
    };
    update.trigger = function() {
      var self = this, args = arguments;
      angular.forEach(handler, function(fn) { fn.apply(self, args); });
    };
    return update;
  };
 
  /**
   * sortEventByStartAndDuration(a, b)
   * Simple Sorting function, which sort the values a and b by start time, 
   */
  var sortEventByStartAndDuration = function sortEventByStartAndDuration(a, b) {  
    return a.start.diff(b.start) || b.end.diff(b.start) - a.end.diff(a.start);
  };
  
  /**
   * filterEventDuringEventFactory(event)
   * The filter addresses four different case:
   * - event starts after item but item ends after event starts
   * - item starts after event but also item start after event ends
   * - item starts before event ends and also item ends after event start
   * - the item-event does not take place during the event-event
   */
  var filterEventDuringDateRangeFactory = function(start, end) {
    return function(event) {    
      if(event.start.diff(start) < 0 && event.end.diff(start) > 0) 
        return true;   
      if(event.start.diff(start) > 0 && event.end.diff(start) < 0) 
        return true;    
      if(event.end.diff(start) > 0 && event.start.diff(end) < 0) 
        return true;
      return false;
    };
  };
  
  /**
   * 
   */
  var filterWholeDayEventDateRangeFactory = function(start, end) {
    return function(event) {
      if(start.diff(event.start) >= 0 && event.end.diff(start) >= 0)
        return true;
      if(end.diff(event.start) >= 0 && event.end.diff(end) >= 0)
        return true;
      return false;
    };
  };
  
  /**
   * slotFactory()
   * Slotfactory creates different slots for events. That is necessary as they may overlapp
   * regarding start and end time. Before using slotFactory it is necessary to order the 
   * list of events regarding time and length.
   */
  var slotFactory = (function() {
    var factory = function(assigner, modifier) {
      return function slotify(item, index, list) {
        var slots = list.slice(0, index)
              .map(modifier)
              .filter(filterEventDuringDateRangeFactory(item.start, item.end))
              .map(function(event) {
                return event.slot;
              }).sort().filter(function(item, index, list) {
                return list.indexOf(item) >= index;
              })
          , slot = slots
              .reduce(function(result, item, index) {
                if(result) return result;
                if(item !== index + 1) return index + 1;
              }, undefined);
        return assigner(item, slot || slots.length + 1);
      };
    };
    var slotter = function(assigner, modifier) {
      return factory(typeof assigner === 'function' ? assigner : function(item, slot) {
        item.slot = slot;
        return item;
      }, typeof modifier === 'function' ? modifier : function(item) {
        return angular.copy(item);
      });
    };
    return slotter;
  })();

  /**
   * buildArray(size)
   * Helper method for array creation. Needs to be checked regarding
   * functionality in IE.
   */
  var buildArray = function(size) {
    var array = [];
    for(var index = 0; index < size; index ++) {
      array.push(index);
    }
    return array;
  };

  calendarDirective.directive('wholeDayEvent', [function() {
    return {
      restrict: 'E',
      replace: true,
      template: '<div name="bs-calendar-event-id-{{event.id}}" class="bs-calendar-whole-day-event-container evt-{{event.id}}">' +
                  '<div class="bs-calendar-whole-day-event-container-inner color-{{event.colorId}}">' +
                    '<div class="bs-calendar-whole-day-event-content">{{event.summary}}</div>' +
                  '</div>' +
                '</div>',
      scope: {
        event: '='
      }    
    , link: function(scope, iElement, iAttr) {
        if(scope.event.id) hoverSelektor(iElement, '[name=bs-calendar-event-id-' + scope.event.id + ']', 'hovered');
      }
    };
  }]);
  
  calendarDirective.directive('hourViewNow', ['$compile', function($compile) {
    return {
      restrict: 'E'
    , replace: true
    , template: '<div>' +
                  '<div class="bs-tg-now"></div>' +
                '</div>'
    , link: function(scope, iElement, iAttribute) {
        var day           = scope.$parent.day
          , display       = 'none'
          , now           = moment()
          , start_seconds = Math.max(now.diff(day.clone().sod(), 'seconds'), 0)
        
        scope.$on('calendar-update', timeout(scope, function() { 
          var height        = scope.height / SECONDS_OF_A_DAY
          if (day.sod().diff(now.sod()) == 0)
            display = 'block';
                    
          var nowDiv = angular.element(iElement.children("div.bs-tg-now"));       
          nowDiv.css(x = {
              display : display
            , position: 'absolute'          
            , top     : start_seconds * height     
          });
        }));

        
      }
    };
  }]);
  
  /**
   * 
   */
  calendarDirective.directive('hourViewEvent', [function() {
    var eventcounter = 0;
    return {
      restrict: 'E'
    , replace: true
    , template: '<div name="bs-calendar-event-id-{{event.id}}" class="bs-calendar-event-container">' +
                  '<div class="bs-calendar-event-content color-{{event.colorId}}">' + 
                    '<div class="bs-calendar-event-header">{{event.summary}}</div>' +
                    '<div class="bs-calendar-event-body">{{event.description}}</div>' +
                  '</div>' +
                '</div>'
    , link: function(scope, iElement, iAttr) {
        var day           = scope.$parent.$parent.day
          , start_seconds = Math.max(scope.event.start.diff(day.clone().sod(), 'seconds'), 0)
          , end_seconds   = (Math.min(scope.event.end.diff(day.clone().sod(), 'seconds'), SECONDS_OF_A_DAY) - start_seconds)
        ;
        
        scope.$on('calendar-update', timeout(scope, function() { 
          var height        = scope.$parent.height / SECONDS_OF_A_DAY
          iElement.css({
            left    : ((scope.event.slot - 1) * SLOT_WIDTH) + '%'
          , top     : start_seconds * height
          , height  : end_seconds   * height
          });
          if(scope.event.id)
            hoverSelektor(iElement, '[name=bs-calendar-event-id-' + scope.event.id + ']', 'hovered');
        }));
      }
    };
  }]);

  /**
   * dayViewCalendarDay is responsible for the creation of the basic table layout. It allows
   * to create dynamic day-ranges to create calendars with ranges between 1 and 7 days.
   */
  calendarDirective.directive('hourViewEventContainer', ['$compile', function($compile) {
    return {
      restrict: 'E'
    , replace: true
    , template: '<div class="bs-calendar-tg-day">' +
                  '<hour-view-now></hour-view-now>' +                    
                  '<hour-view-event ng-repeat="event in events"></hour-view-event>' +
                '</div>'
    , scope: {
      events: '='
    }
    , link: function(scope, iElement, iAttr) {
        scope.height    = 0; // just some default value, should be changed before use
        scope.$on('calendar-update', function() {
          scope.height = angular.element(iElement).innerHeight();
        });
      }
    }; 
  }]);
  
  calendarDirective.directive('wholeDayView', [function() {
    return {
      require: '^calendar'
    , restrict: 'A'
    , template:
      '<tr class="bs-calendar-header">' + 
        '<td class="bs-calendar-weeknumber">' +
          '<div>{{days[0].format($parent.labelFormat)}}</div>' +
        '</td>' +
        '<td ng-repeat="day in days" ng-class="{today: ((day.sod().diff($parent.now.sod())!=0) + ($parent.numberOfDays > 1) == 1)}">' +
          '<div class="bs-calendar-daylabel">{{day.format($parent.$parent.dayLabelFormat)}}</div>' +
        '</td>' +
      '</tr>' +
      '<tr class="bs-calendar-whole-day-event-list" ng-repeat="wholeDayEvent in getEventsOfWeek()">' +
        '<td>&nbsp;</td>' + 
        '<td ng-repeat="event in wholeDayEvent.list" colspan="{{event.colspan}}">' +        
          '<whole-day-event event="event"></whole-day-event>' +
        '</td>' +
      '</tr>' 
    , scope: {
        days: '=wholeDayView'
      }
    , link: function(scope, iElement, iAttr, calendarController) {
        scope.eventCache = [];
        scope.getEventsOfWeek = function() {
          return scope.eventCache = scope.eventCache.length
            ? scope.eventCache
            : calendarController.getWholeDayEvents(scope.days);
        };
        // emit the update
        scope.$on('calendar-update', function() {
          scope.eventCache = [];
        });
      }
    };
  }]);

  /**
   * 
   */
  calendarDirective.directive('hourView', [function() {
    return {
      require: '^calendar'
    , restrict: 'A'
    , template: 
      '<tr>' +
        '<td colspan="{{days.length + 1}}" class="bs-calendar-colwrapper">' +
          '<div class="bs-calendar-spanningwrapper">' + 
            '<div class="bs-calendar-tg-hourmarkers">' +
              '<div class="bs-calendar-tg-markercell" ng-repeat="hour in hours">' +
                '<div class="bs-calendar-tg-dualmarker"></div>' +
              '</div>' +
            '</div>' +
          '</div>' + 
        '</td>' + 
      '</tr>' + 
      '<tr>' +
        '<td class="bs-calendar-tg-hours">' +
          '<div class="bs-calendar-tg-hour-inner" ng-repeat="hour in hours">' + 
            '<div class="bs-calendar-tg-hour-clock">' +
              '{{hour.format(timeFormat)}}' +
            '</div>' +
          '</div>' +
        '</td>' +
        '<td ng-repeat="day in days" class="bs-calendar-tg-day-container" ng-class="{today: ((day.sod().diff(now.sod())!=0) + (numberOfDays > 1)  == 1)}">' +
           '{{day.format("DD.MM.YYYY")}}<hour-view-event-container events="getEventsOfDay(day)"></hour-view-event-container>' +
        '</td>' +
      '</tr>'
    , link: function(scope, iElement, iAttr, calendarController) {
        scope.eventCache = {}
        scope.getEventsOfDay = function(day) {
          var sod = day.clone().sod();
          if(sod in scope.eventCache)
            return scope.eventCache[sod];
          return scope.eventCache[sod] = calendarController.getEvents(sod, day.clone().eod());
        }
        // emit the update
        scope.$on('calendar-update', function() {
          scope.eventCache = {};
        })
      }
    };
  }]);
 
  /**
   * dayViewCalendar is responsible for the creation of the basic table layout. It allows
   * to create dynamic day-ranges to create calendars with ranges between 1 and 7 days.
   */
  calendarDirective.directive('calendar', [function() {
    return {
      restrict: 'E'
    , replace: true
    , template:
        '<div class="table-container">' +
          '<table ng-switch="weeks.length" id="{{calendarId}}" class="table table-bordered table-striped bs-calendar" ng-switch="numberOfWeeks">' +
            '<tbody whole-day-view="week" ng-repeat="week in weeks"></tbody>' +
            '<tbody hour-view="daysEventList" ng-switch-when="1" days="weeks[0]"></tbody>' +
          '</table>' +       
       '</div>'
    , scope: {
        events            : '=eventsource'
      , controlDate       : '=date'
      // config elements that will have default values
      , calendarId        : '@calendarId'
      , confstartOfWeek   : '@startOfWeek'
      , confTimeFormat    : '@timeFormat'
      , confNumberOfDays  : '@numberOfDays'
      , confNumberOfWeeks : '@numberOfWeeks'
      , confDayLabelFormat: '@dayLabelFormat'
      }
    , controller: ['$scope', function(scope, $element) {
        this.getEvents = function getEvents(start, end) {
          var wholeDayEventFilter = filterWholeDayEventDateRangeFactory(start, end);
          var events = angular.copy(scope.events)
            .sort(sortEventByStartAndDuration)
            .filter(filterEventDuringDateRangeFactory(start, end))
            .filter(function(event) {
              return !wholeDayEventFilter(event);
            })
            .map(slotFactory());
          return events;
        };
        
        this.getWholeDayEvents = function getWholeDayEvents(days) {
          var numberOfDays      = days.length
            , date              = days[0]
            // prepare everything to create the td-tr listing from the slots
            , wholeDayEventList = []
            , slots             = []
            // add-item-to-slot adds a colspan to an item
            , addItemToSlot     = function addItemToSlot(slot, start, event) {
                event         = event || {};
                event.colspan = start - slots[slot] + 1;
                slots[slot]   = start + 1;
                wholeDayEventList[slot].list[wholeDayEventList[slot].list.length] = event;
              }
            , fillWithEmpty = function fillWithEmpty(slot, number) {
                for(var current = slots[slot]; current < number; current ++) {
                  // add empty item
                  addItemToSlot(slot, current);
                }
              }
            // add-events-to-slot will add an event to a slot, and checking for
            // holes in the colspan list. it will add an empty item there
            , addEventsToSlot = function addEventsToSlot(event) {
                // slot to work with and start/end in numbers of the event
                var slot  = event.slot - 1
                  , start = Math.min(numberOfDays - 1
                            , Math.max(0
                              , event.start.clone().sod().diff(date.clone().sod(), 'days')
                            ))
                  , end   = Math.min(numberOfDays - 1
                            , Math.max(0
                              , event.end.clone().sod().diff(date.clone().sod(), 'days')
                            ));
                // if slot was not used, fill it with empty data
                if(!(slot in slots)) {
                  wholeDayEventList[slot] = { slot: slot, list: [] };
                  slots[slot]                   = 0;
                }
                // fill until we reach the start of this event
                // this works because the events are sorted
                fillWithEmpty(slot, start);
                // add event itself
                addItemToSlot(slot, end, event);
              };
          angular.copy(scope.events)
            // first sort them by start and duration
            .sort(sortEventByStartAndDuration)
            // then filter any event that is not longer then any
            // day we are looking at
            .filter(function(event) {
              return days.reduce(function(current, day) {
                return current
                || filterWholeDayEventDateRangeFactory(day.clone().sod(), day.clone().eod())(event);
              }, false);
            // then slot them, by creating a slotter which will modify 
            // the dates so we are looking only at sod and eod dates
            }).map(slotFactory(null, function(item) {
              var result = angular.copy(item);
              result.start  = result.start.clone().sod();
              result.end    = result.end.clone().eod();
              return result;
            // add all whole day events to their slots
            })).map(addEventsToSlot);
          // check each slot and fill them up
          slots.map(function(_, slot) { fillWithEmpty(slot, numberOfDays); });
          // finally return the list
          return wholeDayEventList;
        }
      }]
    , link: function(scope, iElement, iAttrs) {
        scope.numberOfWeeks = Math.max(1, parseInt(iAttrs.numberOfWeeks, 10) || 1);
        scope.numberOfDays  = Math.max(1, parseInt(iAttrs.numberOfDays, 10) || 7);
        scope.startOfWeek   = scope.$parent.$eval(iAttrs.startOfWeek); // @ check
        scope.timeFormat    = iAttrs.timeFormat                   || 'H a';
        scope.dayLabelFormat= iAttrs.dayLabelFormat               || (scope.startOfWeek ? 'dddd' : 'dddd, t\\he Do of MMMM');
        scope.labelFormat   = iAttrs.labelFormat                  || 'wo';
        scope.offset        = parseInt(iAttrs.offset, 10)         || 0;
        scope.now           = moment();

        scope.showHours     = scope.numberOfWeeks === 1;

        scope.date          = moment(scope.controlDate);
        scope.weeks         = [];
        
        // watch for changes in the control-date
        scope.$watch(function() {
          return scope.controlDate && scope.date.diff(moment(scope.controlDate));
        }, function() {
          // if we have some changes, change the internal date and update the calendar with the new data
          scope.date = moment(scope.controlDate).add('days', scope.offset);
          update();
        });
        scope.$watch(scope.events, update);
        scope.$on('update', function() {
          scope.$broadcast('calendar-update');
        });

        var update = function() {
          // get us a copy of the date to work with
          var date = scope.date.clone();
          // if the calendar should start at the start of the week:
          if(scope.startOfWeek) {
            scope.date = getStartOfWeek(scope.date);
          }
          
          if(scope.numberOfWeeks === 1) {
            scope.weeks = buildArray(scope.numberOfWeeks).map(function(week) {
              return buildArray(scope.numberOfDays).map(function(day) {
                return scope.date.clone().add('weeks', week).add('days', day + scope.offset);
              })
            })
          } else {
            scope.weeks = buildArray(scope.numberOfWeeks).map(function(week) {
              return buildArray(scope.numberOfDays).map(function(day) {
                return scope.date.clone().add('weeks', week + scope.offset).add('days', day);
              })
            })
          }
          
          // create the list of days that will be shown
          scope.days          = buildArray(scope.numberOfDays).map(function(index) {
            return scope.date.clone().add('days', index);
          });
          var end   = scope.days[scope.numberOfDays - 1].clone().eod();
          
          // create a element for each hour of the day
          scope.hours         = buildArray(24).map(function(index) {
            return scope.days[0].clone().sod().add('hours', index);
          });
          
          scope.$broadcast('calendar-update');
        };
      }         
    };
  }]);