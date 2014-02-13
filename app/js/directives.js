'use strict';

/* Directives */


angular.module('myApp.directives', [])



 .directive('ngEnter', function() {
         return function(scope, element, attrs) {
             element.bind("keydown keypress", function(event) {
                 if(event.which === 13) {
                     scope.$apply(function(){
                         scope.$eval(attrs.ngEnter, {'event': event});
                     });

                     event.preventDefault(); 
                 }
            });
         };
})

.directive('appVersion', ['version', function(version) {
return function(scope, elm, attrs) {
  elm.text(version);
};
}])
// TODO BLUR
.directive('todoBlur', function () {
	return function (scope, elem, attrs) {
		elem.bind('blur', function () {
			scope.$apply(attrs.todoBlur);
		});
	};
})

// TODO ESCAPE BLUR
.directive('todoBlur', function () {
	var ESCAPE_KEY = 27;
	return function (scope, elem, attrs) {
		elem.bind('keydown', function (event) {
			if (event.keyCode === ESCAPE_KEY) {
				scope.$apply(attrs.todoEscape);
			}
		});
	};
})

// TODO FOCUS
.directive('todoFocus', function todoFocus($timeout) {
	return function (scope, elem, attrs) {
		scope.$watch(attrs.todoFocus, function (newVal) {
			if (newVal) {
				$timeout(function () {
					elem[0].focus();
				}, 0, false);
			}
		});
	};
})

// NG-BLUR
.directive('ngBlur', function () {
  return function (scope, elem, attrs) {
    elem.bind('blur', function () {
      scope.$apply(attrs.ngBlur);
    });
  };
})

.directive('contenteditable', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      // view -> model
      elm.on('blur', function() {
        scope.$apply(function() {
          ctrl.$setViewValue(elm.html());
        });
      });
 
      // model -> view
      ctrl.$render = function() {
        elm.html(ctrl.$viewValue);
      };
 
      // load init value from DOM
      
    }
  };
});

