var setEqualHeights = function() {
	// set all the main element to same height
	$('#sidebar-left, #sidebar-right, #main').equalHeights();
};

$(document).ready( function() {

	setEqualHeights();

	$(window).resize( function() {
		setEqualHeights();
	});

	$('#sidebar-left-toggle').click( function() {

		if ($(this).hasClass('in')) {
			$('#sidebar-left').animate({
				left: -90
			}, 100);

			$('#main').animate({
				marginLeft: 0
			}, 100);

			$('#sidebar-right').animate({
				marginLeft: 0
			}, 100);

			$(this).removeClass('in');
		}
		else {
			$('#sidebar-left').animate({
				left: 0
			}, 100);

			$('#main').animate({
				marginLeft: 90
			}, 100);

			$('#sidebar-right').animate({
				marginLeft: 90
			}, 100);

			$(this).addClass('in');
		}

		return false;
		
	});

	// re-styling select elements
	// $('select').selectpicker({
	// 	style: '',
	// 	size: 4
	// });

	// re-styling file elements
	$(':file').filestyle({
		icon: 'fa fa-folder-open',
		classButton: 'btn btn-default'
	});
	
	
	// var date = new Date();
	// var d = date.getDate();
	// var m = date.getMonth();
	// var y = date.getFullYear();
	// $('.calendar-default').fullCalendar({
	// 	editable: true,
	// 	events: [
	// 		{
	// 			title: 'All Day Event',
	// 			start: new Date(y, m, 1)
	// 		},
	// 		{
	// 			title: 'Long Event',
	// 			start: new Date(y, m, d-5),
	// 			end: new Date(y, m, d-2)
	// 		},
	// 		{
	// 			id: 999,
	// 			title: 'Repeating Event',
	// 			start: new Date(y, m, d-3, 16, 0),
	// 			allDay: false
	// 		},
	// 		{
	// 			id: 999,
	// 			title: 'Repeating Event',
	// 			start: new Date(y, m, d+4, 16, 0),
	// 			allDay: false
	// 		},
	// 		{
	// 			title: 'Meeting',
	// 			start: new Date(y, m, d, 10, 30),
	// 			allDay: false
	// 		},
	// 		{
	// 			title: 'Lunch',
	// 			start: new Date(y, m, d, 12, 0),
	// 			end: new Date(y, m, d, 14, 0),
	// 			allDay: false
	// 		},
	// 		{
	// 			title: 'Birthday Party',
	// 			start: new Date(y, m, d+1, 19, 0),
	// 			end: new Date(y, m, d+1, 22, 30),
	// 			allDay: false
	// 		},
	// 		{
	// 			title: 'Click for Google',
	// 			start: new Date(y, m, 28),
	// 			end: new Date(y, m, 29),
	// 			url: 'http://google.com/'
	// 		}
	// 	]
	// });
	// $('.calendar-agenda').fullCalendar({
	// 	header: {
	// 		left: 'prev,next today',
	// 		center: 'title',
	// 		right: 'month,agendaWeek,agendaDay'
	// 	},
	// 	editable: true,
	// 	events: [
	// 		{
	// 			title: 'All Day Event',
	// 			start: new Date(y, m, 1)
	// 		},
	// 		{
	// 			title: 'Long Event',
	// 			start: new Date(y, m, d-5),
	// 			end: new Date(y, m, d-2)
	// 		},
	// 		{
	// 			id: 999,
	// 			title: 'Repeating Event',
	// 			start: new Date(y, m, d-3, 16, 0),
	// 			allDay: false
	// 		},
	// 		{
	// 			id: 999,
	// 			title: 'Repeating Event',
	// 			start: new Date(y, m, d+4, 16, 0),
	// 			allDay: false
	// 		},
	// 		{
	// 			title: 'Meeting',
	// 			start: new Date(y, m, d, 10, 30),
	// 			allDay: false
	// 		},
	// 		{
	// 			title: 'Lunch',
	// 			start: new Date(y, m, d, 12, 0),
	// 			end: new Date(y, m, d, 14, 0),
	// 			allDay: false
	// 		},
	// 		{
	// 			title: 'Birthday Party',
	// 			start: new Date(y, m, d+1, 19, 0),
	// 			end: new Date(y, m, d+1, 22, 30),
	// 			allDay: false
	// 		},
	// 		{
	// 			title: 'Click for Google',
	// 			start: new Date(y, m, 28),
	// 			end: new Date(y, m, 29),
	// 			url: 'http://google.com/'
	// 		}
	// 	]
	// });

	
		
		
		
		
		
		
		
		
		
	
	
});