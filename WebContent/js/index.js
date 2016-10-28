var theme = getParam('theme');
employeeList(parseInt(theme));
saveTableContent($('#theme-list .active'), $("#emp-list tbody"));


//------------------------------------------functions-----------------------------------------------//


function saveTableContent(activeTheme, table) {
	localStorage.setItem('themeId', activeTheme.attr('value'));
	localStorage.setItem('date', new Date().toLocaleDateString());
	localStorage.setItem('purpose', activeTheme.text());

	var rows = $(table).find('tr');
	var emps = [];
	for (var i = 0; i < rows.length; i++) {
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