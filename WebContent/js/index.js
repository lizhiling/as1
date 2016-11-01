var user = localStorage.getItem('user');
$('.option').hide();
$('.'+user).show();
$('.eng').show();
if (user=='pm')
	$('#user-group').text('Project Manager');
if (user=='hr')
	$('#user-group').text('HR Manager');
if (user=='eng')
	$('#user-group').text('Engineer');

var theme = getParam('theme');
employeeList(parseInt(theme));
loadCreateThemesDialog();

$("#apply").on('click', function () {
	var customized_columns = [];
	$(".btn-danger").each(function () {
		customized_columns.push({
			'type': $(this).attr('type'),
			'cname': $(this).attr('cname'),
			'alias': $(this).attr('alias')
		});
	});
	setCookie('customized_columns', JSON.stringify(customized_columns));
	var myWindow = window.open("index.html?theme=0", "_self");
});


function newLayout() {
	event.stopPropagation();
	event.preventDefault();
	$('#new-column-layout').modal('show');
}


$('a[data-toggle="tab"][href="#funds-apply-form"]').on('click', function (e) {
	// if($(this).hasClass('apply-funds')){
		//check required class
		$('div[table-class="'+$(this).attr('for')+'"] input[required]').each(function () {
			$('this').tooltip('destroy');
			if($(this).val()==''){
				$(this).tooltip({
					position: "center right",
					offset: [0, 0],
					effect: "fade",
					opacity: 0.7,
					title: 'This field is required!'
				});
				$(this).tooltip('show');

				e.stopPropagation();
				// e.preventDefault();
			}
		});
	// }
});

$('#emp-list th').on('click', function(){
	$(this).toggleClass('highlighted');
	var column = $(this).attr('data-column');
	$('#emp-list td[data-column='+column+']').toggleClass('highlighted');

});

$('#print').on('click',function () {
	window.print();
});

//------------------------------------------functions-----------------------------------------------//


function saveTableContent(table, onlySelectedRow) {
	localStorage.setItem('date', new Date().toLocaleDateString());

	var rows = $(table).find('tbody tr');
	var emps = [];
	for (var i = 0; i < rows.length; i++) {
		if(onlySelectedRow && !$(rows[i]).hasClass('active')){
			continue;
		}
		var emp = {};
		var tds = $(rows[i]).find('td');
		for (var j = 0; j < tds.length; j++) {
			var tdName = $(tds[j]).attr('class');
			var tdValue = $(tds[j]).text();
			emp[tdName] = tdValue;
		}
		emps.push(emp);
	}
	localStorage.setItem(table.attr('id'), JSON.stringify(emps));
}