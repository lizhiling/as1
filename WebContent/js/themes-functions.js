/**
 * Created by li_zhil on 10/28/2016.
 */

function welfareList(q1, q2){
    var emp_list_tbody = $('#emp-list tbody');
    var emp_list_header = $('#emp-list thead tr');
    var cols = DB.getColumnsByThemeId(1);
    emp_list_header.empty().append('<th></th><th class="number">Number</th><th class="name">Name</th>');
    for (var j = 0; j < cols.length; j++) {
        emp_list_header.append('<th class="'+cols[j].cname+'">' + cols[j].alias + '</th>');
    }
    emp_list_tbody.empty();
    var emps = DB.selectEmpsInfo(cols, q1, q2);

    for(var id in emps){
        var values = emps[id];
        var tr = $('<tr></tr>');
        tr.appendTo(emp_list_tbody);

        var value = values[0];
        $('<td class=""><img height=40 class="img-circle" src="img/' + id + '.jpg"></td>').appendTo(tr);
        $('<td class="number"><a href="emp.html?id=' + id + '">' + value.number + '</a></td>').appendTo(tr);
        tr.append('<td class="name">' + value.name + '</td>');
        for(var j = 0; j < cols.length; j++){
            var column = cols[j].cname;
            var td = $("<td></td>");
            td.attr('class',column);
            tr.append(td);

            if (column == 'sex' || column=='citizenship' || column=='position'||column=='house'||column=='fsex') {
                td.text(DB.choice(value[column]));
            } else {
                var temp = value[column];
                if (typeof  temp == 'number') {
                    temp = +temp.toFixed(2);
                }
                td.text(temp);
            }
        }
    }
    saveTableContent($("#emp-list"),false);
    WelfareForm();
}

function trainingList(){

}

function partyList(q1, q2){
    var emp_list_tbody = $('#emp-list tbody');
    var emp_list_header = $('#emp-list thead tr');
    var cols = DB.getColumnsByThemeId(3);;
    emp_list_header.empty().append('<th></th><th class="number">Number</th><th class="name">Name</th>');
    for (var j = 0; j < cols.length; j++) {
        emp_list_header.append('<th class="'+cols[j].cname+'">' + cols[j].alias + '</th>');
    }
    emp_list_header.append('<th></th>');
    emp_list_tbody.empty();
    var emps = DB.selectEmpsInfo(cols,q1, q2);
    for(var id in emps){
        var values = emps[id];
        var tr = $('<tr></tr>');

        var value = values[0];
        $('<td class=""><img height=40 class="img-circle" src="img/' + id + '.jpg"></td>').appendTo(tr);
        $('<td class="number"><a href="emp.html?id=' + id + '">' + value.number + '</a></td>').appendTo(tr);
        tr.append('<td class="name">' + value.name + '</td>');
        for(var j = 0; j < cols.length; j++){
            var column = cols[j].cname;
            var td = $("<td></td>");
            td.attr('class',column);
            tr.append(td);

            if (column == 'sex' || column=='citizenship' || column=='position'||column=='house'||column=='fsex') {
                td.text(DB.choice(value[column]));
            } else {
                var temp = value[column];
                if (typeof  temp == 'number') {
                    temp = +temp.toFixed(2);
                }
                td.text(temp);
            }
        }
        tr.append($('<td><input type="checkbox"></td>'));
        if ($(tr).find('.position').text()!='Worker'){
            tr.addClass('active');
            tr.find('input[type="checkbox"]').prop("checked", true);
        }
        tr.appendTo(emp_list_tbody);
    }
    $('td input[type="checkbox"]').on('click', function() {
        $(this).parent().parent().toggleClass('active');
        saveTableContent($("#emp-list"),true);
        PartySummary();
    });

    saveTableContent($("#emp-list"),true);
    PartySummary();
}

function workerListForWP(q1, q2){
    var emp_list_tbody = $('#emp-list-wp tbody');
    var emp_list_header = $('#emp-list-wp thead tr');
    var cols = DB.getColumnsByThemeId(5);
    emp_list_header.empty().append('<th class="number">Number</th><th class="name">Name</th>');
    for (var j = 0; j < cols.length; j++) {
        emp_list_header.append('<th class='+cols[j].cname+'>' + cols[j].alias + '</th>');
    }
    emp_list_tbody.empty();
    var emps = DB.selectEmpsInfoWP(cols,q1, q2);
    for(var id in emps){
        var values = emps[id];
        var tr = $('<tr></tr>');

        var value = values[0];
        $('<td class="number"><a href="emp.html?id=' + id + '">' + value.number + '</a></td>').appendTo(tr);
        tr.append('<td class="name">' + value.name + '</td>');
        for(var j = 0; j < cols.length; j++){
            var column = cols[j].cname;
            var td = $("<td></td>");
            td.attr('class',column);
            tr.append(td);

            if (column == 'sex' || column=='citizenship' || column=='position'||column=='house'||column=='fsex') {
                td.text(DB.choice(value[column]));
            } else {
                var temp = value[column];
                if (typeof  temp == 'number') {
                    temp = +temp.toFixed(2);
                }
                td.text(temp);
            }
        }
        if($(tr).find('.position').text()=='Worker' && $(tr).find('.citizenship').text()=='Foreigner'){
            $(tr).addClass('active');
            $(tr).tooltip({title:'Foreign worker'}).tooltip('show');
        }
        tr.appendTo(emp_list_tbody);
    }
    saveTableContent($("#emp-list-wp"),true);
}

function workerListForDormitory(q1, q2){
    var emp_list_tbody = $('#emp-list tbody');
    var emp_list_header = $('#emp-list thead tr');
    var cols = [{type: 'emp', cname: 'sex', alias: 'Gender'},
        {type: 'emp', cname: 'position', alias: 'Position'},
        {type: 'addr', cname: 'zip', alias: 'Has Dormitory'}];
    emp_list_header.empty().append('<th class="number">Number</th><th class="name">Name</th>');
    for (var j = 0; j < cols.length; j++) {
        emp_list_header.append('<th class='+cols[j].cname+'>' + cols[j].alias + '</th>');
    }
    emp_list_header.append('<th></th>');
    emp_list_tbody.empty();
    var emps = DB.getDormitoryColumns(q1, q2);
    for(var id in emps){
        var value= emps[id];
        var tr = $('<tr></tr>');
        $('<td class="number"><a href="emp.html?id=' + id + '">' + value.number + '</a></td>').appendTo(tr);
        tr.append('<td class="name">' + value.name + '</td>');
        for(var j = 0; j < cols.length; j++){
            var column = cols[j].cname;
            var td = $("<td></td>");
            td.attr('class',column);
            tr.append(td);

            if (column == 'sex' || column=='citizenship' || column=='position'||column=='house'||column=='fsex') {
                td.text(DB.choice(value[column]));
            } else if(cols[j].cname=='zip'){
                if(value[column] ==null){
                    td.text('No');
                }else {
                    td.text('Yes');
                }
            }else {
                var temp = value[column];
                if (typeof  temp == 'number') {
                    temp = +temp.toFixed(2);
                }
                td.text(temp);
            }
        }
        tr.append('<td><input type="checkbox"></td>');
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


function employeeList(themeId, q1, q2, q1_wp, q2_wp){
    $('.summary-btn').hide();
    $('#prevtab').show();
    $('#nexttab').show();
    $(".decide-party,.arrange-worker,.travel-allowance").hide();
    switch (themeId){
        case 1:
            $(".nav-tabs .decide-party").removeClass('available');
            $(".nav-tabs .arrange-worker").removeClass('available');
            $(".nav-tabs .travel-allowance").addClass('available');
            $(".travel-allowance").show();
            welfareList(q1, q2); break;
        case 2: trainingList(q1, q2); break;
        case 3:
            $(".nav-tabs .travel-allowance").removeClass('available');
            $(".nav-tabs .arrange-worker").removeClass('available');
            $(".nav-tabs .decide-party").addClass('available');
            $(".decide-party").show();
            partyList(q1, q2); break;
        case 4:
            $("#emp-list-wp").addClass('active');
            $("#emp-list").removeClass('active');
            $(".nav-tabs .decide-party").removeClass('available');
            $(".nav-tabs .travel-allowance").removeClass('available');
            $(".nav-tabs .arrange-worker").addClass('available');
            $(".arrange-worker").show();
            workerListForWP(q1_wp, q2_wp);
            workerListForDormitory(q1, q2);
            break;
        default:
            $("a .common").show();
            $('#prevtab').hide();
            $('#nexttab').hide();
            customizedList(q1, q2); break;
    }
}
var multiAllowedInfo = ['fname','fsex','fbirthday','relation','cohabit','care'];
function customizedList(q1, q2) {
    if (getCookie('customized_columns') == null) {
        var customized_columns = [{type: 'emp', cname: 'sex', alias: 'Gender'},
            {type: 'emp', cname: 'birthday', alias: 'Birthday'},
            {type: 'emp', cname: 'tel', alias: 'Telephone'}];
        setCookie('customized_columns', JSON.stringify(customized_columns));
    }
    var cols = JSON.parse(getCookie('customized_columns'));
    var emp_list_tbody = $('#emp-list tbody');
    var emp_list_header = $('#emp-list thead tr');

    emp_list_header.empty().append('<th></th><th>Number</th>');
    for (var j = 0; j < cols.length; j++) {
        emp_list_header.append('<th class="'+cols[j].cname+'">' + cols[j]['alias'] + '</th>');
    }

    emp_list_tbody.empty();
    var emps = DB.selectEmpsInfo(cols,q1, q2);
    for(var id in emps){
        var values = emps[id];
        for(var i=0; i<values.length; i++){
            var tr = $('<tr></tr>');
            tr.appendTo(emp_list_tbody);

            var value = values[i];
            if(i==0){
                $('<td class=""><img height=40 class="img-circle" src="img/' + id + '.jpg"></td>').attr('rowspan',values.length).appendTo(tr);
                $('<td class="number"><a href="emp.html?id=' + id + '">' + value.number + '</a></td>').attr('rowspan',values.length).appendTo(tr);
            }

            for(var j = 0; j < cols.length; j++){
                var column = cols[j].cname;
                var td = $("<td></td>");

                if((multiAllowedInfo.indexOf(column) > -1) && values.length>1){
                    td.attr('rowspan',1);
                    tr.append(td);
                }else if(i == 0){
                    td.attr('rowspan',values.length);
                    tr.append(td);
                }
                if (column == 'sex' || column=='citizenship' || column=='position'||column=='house'||column=='fsex') {
                    td.text(DB.choice(value[column]));
                } else {
                    var temp = value[column];
                    if (typeof  temp == 'number') {
                        temp = +temp.toFixed(2);
                    }
                    td.text(temp);
                }
            }

        }
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
            case 'eduLatest':
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
            $('#selected-columns span:contains("' + $(this).text() + '")').remove();
        }
    });
}