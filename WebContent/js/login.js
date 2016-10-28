/**
 * Created by li_zhil on 10/27/2016.
 */

$('#login-form').modal('show');
$('#theme-list .btn-default').on('click', function () {
    var chosenThemeId = parseInt($(this).attr('value'));
    // var columns;
    var url = 'index.html';
    switch (chosenThemeId){
        case 0: // none of above
            $("#new-column-layout").modal('show');
            break;
        case 1: //show welfare
            url += '?theme=1';
            break;
        case 2: //training
            url += '?theme=2';
            break;
        case 3: //party
            url += '?theme=3';
            break;
        case 4: //foreign workers
            url += '?theme=4';
            break;
        default:
            break;
    }
    var myWindow = window.open(url, "_self");
});

$("#login-form .btn-default").on('click',function () {
    var group = $(this).attr('value');
    switch (group){
        case 'hr': //choose arrange workers\ welfare
            $('#theme-list .btn-default[value="1"]').show();
            $('#theme-list .btn-default[value="2"]').hide();
            $('#theme-list .btn-default[value="3"]').hide();
            $('#theme-list .btn-default[value="4"]').show();
            $('#set-column').modal('show');
            break;
        case 'pm':
            $('#theme-list .btn-default[value="1"]').hide();
            $('#theme-list .btn-default[value="2"]').show();
            $('#theme-list .btn-default[value="3"]').show();
            $('#theme-list .btn-default[value="4"]').hide();
            $('#set-column').modal('show');
            break;
        case 'eng':
            loadCreateThemesDialog();
            $('#new-column-layout').modal('show');
            break;
    }
});



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