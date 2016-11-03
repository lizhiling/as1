var DB = {};

DB.init = function() {
	if (window.confirm('are you sure to initialize database?')) {
		DB.load();
	}
};

DB.load = function() {
	// personal info
	alasql('DROP TABLE IF EXISTS emp;');
	alasql('CREATE TABLE emp(id INT IDENTITY, number STRING, name STRING, sex INT, birthday DATE, tel STRING, ctct_name STRING, ctct_addr STRING, ctct_tel STRING,' +
		' pspt_no STRING, pspt_date STRING, pspt_name STRING, citizenship STRING, position STRING, salary INT, constr_site_zip STRING);');
	var pemp = alasql.promise('SELECT MATRIX * FROM CSV("data/EMP-EMP.csv", {headers: true})').then(function(emps) {
		for (var i = 0; i < emps.length; i++) {
			alasql('INSERT INTO emp VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);', emps[i]);
		}
	});

	// address
	alasql('DROP TABLE IF EXISTS addr;');
	alasql('CREATE TABLE addr(id INT IDENTITY, emp INT, zip STRING, state STRING, city STRING, street STRING, bldg STRING, house INT);');
	var paddr = alasql.promise('SELECT MATRIX * FROM CSV("data/ADDR-ADDR.csv", {headers: true})').then(
		function(addresses) {
			for (var i = 0; i < addresses.length; i++) {
				alasql('INSERT INTO addr VALUES(?,?,?,?,?,?,?,?);', addresses[i]);
			}
		});

	// family
	alasql('DROP TABLE IF EXISTS family;');
	alasql('CREATE TABLE family(id INT IDENTITY, emp INT, fname STRING, fsex INT, fbirthday STRING, relation STRING, cohabit INT, care INT);');
	var pfamily = alasql.promise('SELECT MATRIX * FROM CSV("data/FAMILY-FAMILY.csv", {headers: true})').then(
		function(families) {
			for (var i = 0; i < families.length; i++) {
				alasql('INSERT INTO family VALUES(?,?,?,?,?,?,?,?);', families[i]);
			}
		});

	// education
	alasql('DROP TABLE IF EXISTS edu;');
	alasql('CREATE TABLE edu(id INT IDENTITY, emp INT, school STRING, major STRING, grad STRING);');
	var pedu = alasql.promise('SELECT MATRIX * FROM CSV("data/EDU-EDU.csv", {headers: true})').then(function(edus) {
		for (var i = 0; i < edus.length; i++) {
			alasql('INSERT INTO edu VALUES(?,?,?,?,?);', edus[i]);
		}
	});



	// choice
	alasql('DROP TABLE IF EXISTS choice;');
	alasql('CREATE TABLE choice(id INT IDENTITY, name STRING, text STRING);');
	var pchoice = alasql.promise('SELECT MATRIX * FROM CSV("data/CHOICE-CHOICE.csv", {headers: true})').then(
		function(choices) {
			for (var i = 0; i < choices.length; i++) {
				alasql('INSERT INTO choice VALUES(?,?,?);', choices[i]);
			}
		});

	// theme
	console.log("create theme");
	alasql('DROP TABLE IF EXISTS theme;');
	alasql('CREATE TABLE theme(id INT IDENTITY, name STRING, gid INT);');
	var ptheme = alasql.promise('SELECT MATRIX * FROM CSV("data/THEME-THEME.csv", {headers: true})').then(
		function (themes) {
			for (var i = 0; i < themes.length; i++) {
				alasql('INSERT INTO theme VALUES(?,?,?);', themes[i]);
			}
		});

	// columnTheme
	alasql('DROP TABLE IF EXISTS clmntheme;');
	alasql('CREATE TABLE clmntheme(id INT IDENTITY, tId INT, cid INT);');
	var pColumnTheme = alasql.promise('SELECT MATRIX * FROM CSV("data/CLMNTHEME-CLMNTHEME.csv", {headers: true})').then(
		function (columnTheme) {
			for (var i = 0; i < columnTheme.length; i++) {
				alasql('INSERT INTO clmntheme VALUES(?,?,?);', columnTheme[i]);
			}
		}
	);

	// column
	alasql('DROP TABLE IF EXISTS COLS;');
	alasql('CREATE TABLE COLS(id INT IDENTITY, type STRING, cname STRING, alias STRING);');
	var pcolumn = alasql.promise('SELECT MATRIX * FROM CSV("data/COLS-COLS.csv", {headers: true})').then(
		function (columns) {
			for (var i = 0; i < columns.length; i++) {
				alasql('INSERT INTO COLS VALUES(?,?,?,?);', columns[i]);
			}
		}
	);

	//calculate
	alasql('DROP TABLE IF EXISTS calculate;');
	alasql('CREATE TABLE calculate(emp INT IDENTITY primary key, age INT, tax FLOAT, pension FLOAT, insurance FLOAT, travel_allowance FLOAT);');

	// eduLatest
	alasql('DROP TABLE IF EXISTS eduLatest;');
	alasql('CREATE TABLE eduLatest(id INT IDENTITY, emp INT, school STRING, major STRING, grad STRING);');

	// training
	alasql('DROP TABLE IF EXISTS training;');
	alasql('CREATE TABLE training(id INT IDENTITY, name STRING, description STRING, amount INT);');
	var ptraining = alasql.promise('SELECT MATRIX * FROM CSV("data/TRAINING-TRAINING.csv", {headers: true})').then(
		function (columns) {
			for (var i = 0; i < columns.length; i++) {
				alasql('INSERT INTO training VALUES(?,?,?,?);', columns[i]);
			}
		}
	);
	// reload html
	Promise.all([pemp, paddr, pfamily, pedu, pchoice, ptheme, pColumnTheme, pcolumn, ptraining]).then(function () {
		window.location.reload(true);
		generateCalculateData();
	});
};

DB.remove = function() {
	if (window.confirm('are you sure do delete dababase?')) {
		alasql('DROP localStorage DATABASE EMP')
	}
};

DB.choice = function(id) {
	var choices = alasql('SELECT text FROM choice WHERE id = ?', [ id ]);
	if (choices.length) {
		return choices[0].text;
	} else {
		return '';
	}
};

DB.choices = function(name) {
	return alasql('SELECT id, text FROM choice WHERE name = ?', [ name ]);
};

// connect to database
try {
	alasql('ATTACH localStorage DATABASE EMP');
	alasql('USE EMP');
} catch (e) {
	alasql('CREATE localStorage DATABASE EMP');
	alasql('ATTACH localStorage DATABASE EMP');
	alasql('USE EMP');
	DB.load();
}


DB.getColumnsByThemeId = function (chosenThemeId) {
	return alasql('SELECT c.type, c.cname, c.alias FROM clmntheme as ct, COLS as c WHERE ct.cid=c.id AND tId = ? ;', [chosenThemeId]);
};

DB.getDormitoryColumns = function (q1, q2) {
	$('#q1').val(q1);
	$('#q2').val(q2);
	var WHERE;
	if (q1) {
		WHERE = ' WHERE emp.number LIKE ' + '"%' + q1 + '%"';
	} else if (q2) {
		WHERE = ' WHERE emp.name LIKE ' + '"%' + q2 + '%"';
	} else {
		WHERE = '';
	}
	var sql = 'SELECT emp.id,emp.number, emp.name, emp.sex, emp.position, addr.zip  FROM emp LEFT JOIN addr ON emp.id=addr.emp AND addr.house=17 '+WHERE;
	return alasql(sql);
};

DB.deleteTheme = function (themeid) {
	alasql('DELETE FROM theme WHERE id=' + themeid);
	alasql('DELETE FROM clmntheme WHERE tId=' + themeid);
};

function generateAge(birth) {
	var ageDifMs = Date.now() - Date.parse(birth);
	var ageDate = new Date(ageDifMs);
	return ageDate.getFullYear() - 1970;
}

function generateTax(salary, zip) {
	var salaryInt, zipInt;
	salaryInt = parseInt(salary);
	zipInt = parseInt(zip);

	return salaryInt > 30000 ? (salaryInt - 30000) * 0.07 : 0;
}

function generateInsurance(age, sex, salary) {
	return 600;
}

function generatePension(age, sex, salary) {
	var constant = sex == "1" ? 1 : 1.15;
	return (70 - age) * parseInt(salary) * 0.3 * constant;
}

function generateTravelAllowance(zip, constr_site_zip) {
	var zipInt;
	zipInt = parseInt(zip);
	return zipInt < 700000 && zipInt > 600000 ? 21 * 4 : 21 * 3.5;
}

function generateCalculateData() {
	var idBirths = alasql('select emp.id, emp.birthday, addr.zip, emp.sex, emp.salary, emp.constr_site_zip from emp left join addr on emp.id=addr.emp;');
	for (var i = 0; i < idBirths.length; i++) {
		var idBirth = idBirths[i];
		var birth = idBirth.birthday;
		var zip = idBirth.zip;
		var sex = idBirth.sex;
		var salary = idBirth.salary;
		var constr_site = idBirth.constr_site_zip;

		var age = generateAge(birth);
		var tax = generateTax(salary, zip);
		var ins = generateInsurance(age, sex, salary);
		var pension = generatePension(age, sex, salary);
		var tAllowance = generateTravelAllowance(zip, constr_site);

		var temp = [idBirth.id, age, tax, ins, pension, tAllowance];
		alasql('insert into calculate values(?,?,?,?,?,?);', temp);
	}
	var notLatest = alasql("SELECT t1.id FROM edu t1, edu t2 WHERE t1.grad< t2.grad AND t2.emp= t1.emp");
	alasql('INSERT INTO eduLatest SELECT * FROM edu');

	for(var i = 0; i<notLatest.length;i++){
		alasql('DELETE FROM eduLatest WHERE id='+notLatest[i]['id']);
	}
	console.log(alasql('SELECT * FROM eduLatest'));
}

DB.trainings = function () {
	return alasql("SELECT * FROM training;");
};

DB.saveTraining = function (name, description, amount) {
	var id = alasql("SELECT max(id)+1 as newId FROM training")[0].newId;
	var newTraining = [id, name, description, amount];
	alasql("INSERT INTO training VALUES(?,?,?,?)", newTraining);

	return newTraining;
};

DB.deleteTraining = function (id) {
	return alasql("DELETE FROM training WHERE id=" + id);
};

DB.selectEmpsInfoWP = function(cols,q1_wp,q2_wp){
	$('#q1-wp').val(q1_wp);
	$('#q2-wp').val(q2_wp);
	// read data from database
	var FROM = ' FROM emp LEFT JOIN calculate ON calculate.emp=emp.id  LEFT JOIN addr ON emp.id=addr.emp ';
	var GROUPBY = ['emp.id', 'emp.number', 'emp.name'];
	var FIRST = [];
	var hasAddr = false;
	for (var i = 0; i < cols.length; i++) {
		if (cols[i].type == 'addr') {
			FIRST.push(' first('+cols[i].type + '.' + cols[i].cname+') as '+cols[i].cname);
		} else{
			GROUPBY.push(cols[i].type + '.' + cols[i].cname);
		}
	}
	var SORT = ' ORDER BY emp.id ASC';
	var WHERE;
	if (q1_wp) {
		WHERE = ' WHERE emp.number LIKE ' + '"%' + q1_wp + '%"';
	} else if (q2_wp) {
		WHERE = ' WHERE emp.name LIKE ' + '"%' + q2_wp + '%"';
	} else {
		WHERE = '';
	}
	FIRST = ','+FIRST.join(',');
	var query = 'SELECT '+GROUPBY.join(',') + FIRST + FROM + WHERE + ' GROUP BY '+GROUPBY.join(',') +SORT;
	console.log(query);
	var result = alasql(query, []);
	var jsonResult = {};
	for(var i = 0; i<result.length; i++){
		var row = result[i];var jsonRowArray; var jsonRow={};
		// if(jsonResult[row['id']] == null){
			jsonResult[row['id']] = [];
		// }
		jsonRowArray = jsonResult[row['id']];
		for (var key in row){
			if(key!='id'){
				var value = row[key];
				jsonRow[key] = value;
			}
		}
		jsonRowArray.push(jsonRow);
	}
	return jsonResult;
};

DB.selectEmpsInfo = function (cols, q1, q2) {
	// parse request params
	$('#q1').val(q1);
	$('#q2').val(q2);

	// read data from database
	var FROM = ' FROM emp LEFT JOIN calculate ON calculate.emp=emp.id ';
    var GROUPBY = ['emp.id', 'emp.number', 'emp.name'];
	var FIRST = [];
	var hasFamily = false;
	var hasAddr = false;
	var hasEdu = false;
	for (var i = 0; i < cols.length; i++) {
		if (cols[i].type == 'family') {
			GROUPBY.push(cols[i].type + '.' + cols[i].cname);
			hasFamily = true;
		} else if (cols[i].type == 'addr') {
			FIRST.push(' first('+cols[i].type + '.' + cols[i].cname+') as '+cols[i].cname);
			hasAddr = true;
		} else if (cols[i].type == 'eduLatest') {
			GROUPBY.push(cols[i].type + '.' + cols[i].cname);
			hasEdu = true;
		} else{
			GROUPBY.push(cols[i].type + '.' + cols[i].cname);
		}
	}
	var SORT = ' ORDER BY emp.id ASC';
	var WHERE;
	if (q1) {
		WHERE = ' WHERE emp.number LIKE ' + '"%' + q1 + '%"';
	} else if (q2) {
		WHERE = ' WHERE emp.name LIKE ' + '"%' + q2 + '%"';
	} else {
		WHERE = '';
	}
	if (hasFamily) {
		FROM += ' LEFT JOIN family ON emp.id=family.emp ';}
	if (hasAddr) {
		FROM += ' LEFT JOIN addr ON emp.id=addr.emp ';}
	if (hasEdu) {
		FROM += ' LEFT JOIN eduLatest ON emp.id=eduLatest.emp ';
	}
	FIRST = FIRST.length==0?' ':','+FIRST.join(',');
	var query = 'SELECT '+GROUPBY.join(',') + FIRST + FROM + WHERE + ' GROUP BY '+GROUPBY.join(',') +SORT;
	console.log(query);
	var result = alasql(query, []);
	var jsonResult = {};
	for(var i = 0; i<result.length; i++){
		var row = result[i];var jsonRowArray; var jsonRow={};
		if(jsonResult[row['id']] == null){
			jsonResult[row['id']] = [];
		}
		jsonRowArray = jsonResult[row['id']];
		for (var key in row){
			if(key!='id'){
				var value = row[key];
				jsonRow[key] = value;
			}
		}
		jsonRowArray.push(jsonRow);
	}
	return jsonResult;
};