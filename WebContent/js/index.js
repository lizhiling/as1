var theme = getParam('theme');
employeeList(parseInt(theme));
$('#print').on('click',function () {
	window.print();
});

//------------------------------------------functions-----------------------------------------------//


function saveTableContent(table, onlySelectActiveRow) {
	localStorage.setItem('date', new Date().toLocaleDateString());

	var rows = $(table).find('tr');
	var emps = [];
	for (var i = 0; i < rows.length; i++) {
		if(onlySelectActiveRow && !$(rows[i]).hasClass('active')){
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
	localStorage.setItem('emps', JSON.stringify(emps));
}