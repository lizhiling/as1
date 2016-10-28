/**
 * Created by li_zhil on 10/28/2016.
 */

function welfareList(){
    var emp_list_tbody = $('#emp-list tbody');
    var emp_list_header = $('#emp-list thead tr');
    var cols = DB.getColumnsByThemeId(1);
    emp_list_header.empty().append('<th></th><th>Number</th><th>Name</th>');
    for (var j = 0; j < cols.length; j++) {
        emp_list_header.append('<th>' + cols[j].alias + '</th>');
    }
    emp_list_tbody.empty();
    var emps = DB.selectEmpsInfo(cols);
    for (var i = 0; i < emps.length; i++) {
        var emp = emps[i];
        var tr = $('<tr></tr>');
        tr.append('<td class=""><img height=40 class="img-circle" src="img/' + emp.id + '.jpg"></td>');
        tr.append('<td class="Number"><a href="emp.html?id=' + emp.id + '">' + emp.number + '</a></td>');
        tr.append('<td class="Name">' + emp.name + '</td>');
        for (var j = 0; j < cols.length; j++) {
            var td = $("<td></td>");
            var temp = emp[cols[j].cname];
            if (typeof  temp == 'number') {
                temp = +temp.toFixed(2);
            }
            td.addClass(cols[j].alias).text(temp);
            tr.append(td);
        }

        tr.appendTo(emp_list_tbody);
    }

    $('.summary-btn').hide();
    $('#travel-allowance').show().on('click', function () {

    });
}

function trainingList(){

}

function partyList(){
    
}

function workerList() {
    
}

function chooseProject() {
    
}


function employeeList(themeId){
    switch (themeId){
        case 1: welfareList(); break;
        case 2: trainingList(); break;
        case 3: partyList(); break;
        case 4: workerList(); break;
        default: customizedList(); break;
    }
}

function customizedList() {
    var cols = getCookie('customized_columns');
    var emp_list_tbody = $('#emp-list tbody');
    var emp_list_header = $('#emp-list thead tr');

    emp_list_header.empty().append('<th></th><th>Number</th><th>Name</th>');
    for (var j = 0; j < cols.length; j++) {
        emp_list_header.append('<th>' + cols[j].alias + '</th>');
    }

    emp_list_tbody.empty();
    var emps = DB.selectEmpsInfo(cols);
    for (var i = 0; i < emps.length; i++) {
        var emp = emps[i];
        var tr = $('<tr></tr>');
        tr.append('<td class=""><img height=40 class="img-circle" src="img/' + emp.id + '.jpg"></td>');
        tr.append('<td class="Number"><a href="emp.html?id=' + emp.id + '">' + emp.number + '</a></td>');
        tr.append('<td class="Name">' + emp.name + '</td>');
        for (var j = 0; j < cols.length; j++) {
            var td = $("<td></td>");
            if (cols[j].cname == 'sex') {
                td.text(DB.choice(emp.sex));
            } else if (cols[j].cname == 'citizenship') {
                td.text(DB.choice(emp.citizenship));
            } else if (cols[j].cname == 'position') {
                td.text(DB.choice(emp.position));
            } else {
                var temp = emp[cols[j].cname];
                if (typeof  temp == 'number') {
                    temp = +temp.toFixed(2);
                }
                td.text(temp);
            }
            td.addClass(cols[j].alias);
            tr.append(td);
        }
        tr.appendTo(emp_list_tbody);
    }
}

function loadEmpsInfo(cols) {
    var emp_list_tbody = $('#emp-list tbody');
    var emp_list_header = $('#emp-list thead tr');

    emp_list_header.empty().append('<th></th><th>Number</th><th>Name</th>');
    for (var j = 0; j < cols.length; j++) {
        emp_list_header.append('<th>' + cols[j].alias + '</th>');
    }

    emp_list_tbody.empty();
    var theme_id = parseInt(getCookie("chosen_theme"));
    var emps = selectEmpsInfo(cols);
    var preEmp = {grad: '0000-00-00', id: ''};
    for (var i = 0; i < emps.length; i++) {
        var emp = emps[i];
        var tr = $('<tr></tr>');
        tr.append('<td class=""><img height=40 class="img-circle" src="img/' + emp.id + '.jpg"></td>');
        tr.append('<td class="Number"><a href="emp.html?id=' + emp.id + '">' + emp.number + '</a></td>');
        tr.append('<td class="Name">' + emp.name + '</td>');
        for (var j = 0; j < cols.length; j++) {
            var td = $("<td></td>");
            if (cols[j].cname == 'sex') {
                td.text(DB.choice(emp.sex));
            } else if (cols[j].cname == 'citizenship') {
                td.text(DB.choice(emp.citizenship));
            } else if (cols[j].cname == 'position') {
                td.text(DB.choice(emp.position));
            } else {
                var temp = emp[cols[j].cname];
                if (typeof  temp == 'number') {
                    temp = +temp.toFixed(2);
                }
                td.text(temp);
            }
            td.addClass(cols[j].alias);
            tr.append(td);
        }

        //filter some unnecessary rows
        switch (theme_id) {
            case 2://Training: filter education info which is not the latest.
                if (preEmp.id == emp.id) {
                    if (preEmp.grad < emp.grad) {
                        var preTr = emp_list_tbody.children(':last-child');
                        preTr.remove();
                        tr.appendTo(emp_list_tbody);
                    }
                } else {
                    tr.appendTo(emp_list_tbody);
                }
                preEmp = emp;
                break;
            case 3://Hold Party: filter position!=worker
                if (DB.choice(emp.position) != 'Worker')
                    tr.appendTo(emp_list_tbody);
                break;
            case 4://arrange dormitory: filter position==worker && dormitory does not exist.
                if (DB.choice(emp.position) == 'Worker')
                    tr.appendTo(emp_list_tbody);
                break;
            case 5://apply WP: filter position==worker && citizen=Foreigner
                console.log(DB.choice(emp.citizenship));
                if (DB.choice(emp.position) == 'Worker' && DB.choice(emp.citizenship) == 'Foreigner')
                    tr.appendTo(emp_list_tbody);
                break;
            default:
                tr.appendTo(emp_list_tbody);
                break;
        }
    }

    //filter unnecessary columns
    switch (theme_id) {
        case 1://Welfare: no filter
            break;
        case 2:
            $("th:last-child,td:last-child").remove();
            break;
        case 3://Hold Party: hide position
            $("th:last-child,td:last-child").remove();
            break;
        case 4://arrange dormitory: hide position==worker && dormitory
            $("th:last-child,td:last-child").remove();
            break;
        case 5://apply WP: hide position && citizenship
            $("th:nth-last-child(2),td:nth-last-child(2)").remove();
            $("th:last-child,td:last-child").remove();
            break;
        default:
            break;
    }
}