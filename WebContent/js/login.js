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
            $('#theme-list .hr').show();
            $('#theme-list .project-manager').hide();
            $('#set-column').modal('show');
            localStorage.setItem('user','hr');
            break;
        case 'pm':
            $('#theme-list .hr').hide();
            $('#theme-list .project-manager').show();
            $('#set-column').modal('show');
            localStorage.setItem('user','pm');
            break;
        case 'eng':
            loadCreateThemesDialog();
            $('#new-column-layout').modal('show');
            localStorage.setItem('user','eng');
            break;
    }
});

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
    setCookie('theme', 0);
    var myWindow = window.open("index.html?theme=0", "_self");
});

