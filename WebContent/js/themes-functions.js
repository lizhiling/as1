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
    saveTableContent($("#emp-list"),false);
    WelfareForm();
}

function trainingList(){

}

function partyList(){
    var emp_list_tbody = $('#emp-list tbody');
    var emp_list_header = $('#emp-list thead tr');
    var cols = DB.getColumnsByThemeId(3);
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
            if (cols[j].cname == 'sex') {
                td.text(DB.choice(emp.sex));
            } else if (cols[j].cname == 'position') {
                td.text(DB.choice(emp.position));
            }else {
                td.text(temp);
            }
            td.addClass(cols[j].alias);
            tr.append(td);
        }
        if ($(tr).find('.Position').text()!='Worker'){
            tr.addClass('active');
        }
        tr.appendTo(emp_list_tbody);
    }

    saveTableContent($("#emp-list"),true);
    PartySummary();
}

function workerListForWP(){
    var emp_list_tbody = $('#emp-list-wp tbody');
    var emp_list_header = $('#emp-list-wp thead tr');
    var cols = DB.getColumnsByThemeId(5);
    emp_list_header.empty().append('<th>Number</th><th>Name</th>');
    for (var j = 0; j < cols.length; j++) {
        emp_list_header.append('<th data-column='+j+'>' + cols[j].alias + '</th>');
    }
    emp_list_tbody.empty();
    var emps = DB.selectEmpsInfo(cols);
    for (var i = 0; i < emps.length; i++) {
        var emp = emps[i];
        var tr = $('<tr></tr>');
        tr.append('<td class="Number"><a href="emp.html?id=' + emp.id + '">' + emp.number + '</a></td>');
        tr.append('<td class="Name">' + emp.name + '</td>');
        for (var j = 0; j < cols.length; j++) {
            var td = $("<td></td>");
            var temp = emp[cols[j].cname];
            if (cols[j].cname == 'sex') {
                td.text(DB.choice(emp.sex));
            } else if (cols[j].cname == 'position') {
                td.text(DB.choice(emp.position));
            } else if(cols[j].cname == 'citizenship'){
                td.text(DB.choice(emp.citizenship));
            } else if(cols[j].cname=='house'){
                td.text(DB.choice(emp.house));
            }
            else {
                td.text(temp);
            }
            td.attr('data-column', j);
            td.addClass(cols[j].cname);
            tr.append(td);
        }
        if($(tr).find('.position').text()=='Worker' && $(tr).find('.citizenship').text()=='Foreigner'){
            $(tr).addClass('active');
            $(tr).tooltip({title:'Foreign worker'}).tooltip('show');
        }
        tr.appendTo(emp_list_tbody);
    }
    saveTableContent($("#emp-list-wp"),true);
}

function workerListForDormitory(){
    var emp_list_tbody = $('#emp-list tbody');
    var emp_list_header = $('#emp-list thead tr');
    var cols = [{type: 'emp', cname: 'sex', alias: 'Gender'},
        {type: 'emp', cname: 'position', alias: 'Position'},
        {type: 'addr', cname: 'zip', alias: 'Has Dormitory'}];
    emp_list_header.empty().append('<th></th><th>Number</th><th>Name</th>');
    for (var j = 0; j < cols.length; j++) {
        emp_list_header.append('<th data-column='+j+'>' + cols[j].alias + '</th>');
    }
    emp_list_tbody.empty();
    var emps = DB.getDormitoryColumns();
    for (var i = 0; i < emps.length; i++) {
        var emp = emps[i];
        var tr = $('<tr></tr>');
        tr.append('<td><input type="checkbox"></td>');
        tr.append('<td class="Number"><a href="emp.html?id=' + emp.id + '">' + emp.number + '</a></td>');
        tr.append('<td class="Name">' + emp.name + '</td>');
        for (var j = 0; j < cols.length; j++) {
            var td = $("<td></td>");
            var temp = emp[cols[j].cname];
            if (cols[j].cname == 'sex') {
                td.text(DB.choice(emp.sex));
            } else if (cols[j].cname == 'position') {
                td.text(DB.choice(emp.position));
            } else if(cols[j].cname=='zip'){
                if(emp.zip ==null){
                    td.text('No');
                }else {
                    td.text('Yes');
                }
            }
            else {
                td.text(temp);
            }
            td.attr('data-column', j);
            td.addClass(cols[j].cname);
            tr.append(td);
        }
        if ($(tr).find('.position').text()=='Worker' && $(tr).find('.zip').text()=='No'){
            $(tr).addClass('active');
            tr.find('input[type="checkbox"]').prop("checked", true);
        }
        tr.appendTo(emp_list_tbody);
    }

    $("td input").on('click', function() {
        $(this).parent().parent().toggleClass('active');
        saveTableContent($("#emp-list"),true);
        DormitorySummary();
    });
    saveTableContent($("#emp-list"),true);
    DormitorySummary();
}


function employeeList(themeId){
    $('.summary-btn').hide();
    switch (themeId){
        case 1:
            $(".decide-party,.arrange-worker").hide();
            $(".travel-allowance").show();
            welfareList(); break;
        case 2: trainingList(); break;
        case 3:
            $(".travel-allowance,.arrange-worker").hide();
            $(".decide-party").show();
            partyList(); break;
        case 4:
            $(".travel-allowance,.decide-party").hide();
            $(".arrange-worker").show();
            $("#emp-list-wp").addClass('active');
            $("#emp-list").removeClass('active');
            workerListForWP();
            workerListForDormitory();
            break;
        default:
            $(".travel-allowance,.decide-party,.arrange-worker").hide();
            $("a .common").show();
            customizedList(); break;
    }
}

function customizedList() {
    var cols = JSON.parse(getCookie('customized_columns'));
    var emp_list_tbody = $('#emp-list tbody');
    var emp_list_header = $('#emp-list thead tr');

    emp_list_header.empty().append('<th></th><th>Number</th><th>Name</th>');
    for (var j = 0; j < cols.length; j++) {
        emp_list_header.append('<th>' + cols[j]['alias'] + '</th>');
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
            } else if (cols[j].cname == 'house') {
                td.text(DB.choice(emp.house));
            }else {
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

function loadCreateThemesDialog() {
    $('#select-column div').empty();
    $('#selected-columns .panel-body').empty();
    var emp_columns = $('#emp-columns');
    var addr_columns = $('#addr-columns');
    var edu_columns = $('#edu-columns');
    var calc_columns = $('#calc-columns');
    var family_columns = $('#family-columns');
    emp_columns.empty();
    addr_columns.empty();
    edu_columns.empty();
    calc_columns.empty();
    family_columns.empty();

    var columns = alasql('SELECT * FROM COLS');
    for (var i = 0; i < columns.length; i++) {
        var column = columns[i];
        var column_label = $('<button class="btn btn-xs btn-info" value="' + column.id + '">' + column.alias + '</button>');
        column_label.attr({'alias': column.alias, 'type': column.type, 'cname': column.cname});
        column_label.css('margin', 2);
        switch (column.type) {
            case 'emp':
                emp_columns.append(column_label);
                break;
            case 'addr':
                addr_columns.append(column_label);
                break;
            case 'edu':
                edu_columns.append(column_label);
                break;
            case 'calculate':
                calc_columns.append(column_label);
                break;
            case 'family':
                family_columns.append(column_label);
                break;
            default:
                break;
        }
    }

    $("#select-column").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
    $("#select-column li").removeClass("ui-corner-top").addClass("ui-corner-left");

    $("#new-column-layout .btn-info").on('click', function () {
        $(this).toggleClass('btn-danger');
        if ($(this).hasClass('btn-danger')) {
            $("#selected-columns .panel-body").append("<span class='btn btn-primary btn-xs'>" + $(this).text() + "</span>");
        } else {
            $("#selected-columns .panel-body span:contains('" + $(this).text() + "')").remove();
        }
    });
}