/**
 * Created by li_zhil on 10/28/2016.
 */
// function generateSummary() {
//     var themeId = parseInt(getParam('theme'));
//     var data;
//     if (themeId == 1) {
//         generateForm(data);
//         $("#funds-apply-form").modal('show');
//     } else if (themeId == 2) {
//         data = TrainingSummary();
//     } else if (themeId == 3) {
//         data = PartySummary();
//     } else if (themeId == 4) {
//         data = DormitorySummary();
//     } else if (themeId == 5) {
//         data = generateForm(data);
//         $("#funds-apply-form").modal('show');
//     }
//     return data;
// }

function DormitorySummary() {
    var emps = JSON.parse(localStorage.getItem('emp-list'));
    console.log(emps);

    var maleCount = 0, femaleCount = 0;
    var maleEmps = [], femaleEmps = [];
    for (var i = 0; i < emps.length; i++) {
        var emp = emps[i];
        var gender = emp['sex'];
        if (gender == 'Male') {
            maleCount++;
            maleEmps.push(emp['Number']);
        } else if (gender == 'Female') {
            femaleCount++;
            femaleEmps.push(emp['Number']);
        } else {
            alert(" = = ");
        }
    }
    $("#male").text(maleCount);
    $("#female").text(femaleCount);

    $('a[data-toggle="tab"][href="#funds-apply-form"]').on('shown.bs.tab',function (event) {
        //todo: update address of selected workers
        DormitoryForm({'maleCount': maleCount, 'femaleCount': femaleCount, 'maleEmps': maleEmps, 'femaleEmps': femaleEmps});
    });
}

function PartySummary() {
    var emps = JSON.parse(localStorage.getItem('emp-list'));
    var length = emps.length;
    var m20 = 0, m40 = 0, m60 = 0, f20 = 0, f40 = 0, f60 = 0;
    for (var i = 0; i < emps.length; i++) {
        var emp = emps[i];
        var gender = emp['Gender'];
        var age = parseInt(emp["Age"]);
        if (gender == 'Male' && age >= 20 && age < 40) {
            m20++;
        } else if (gender == 'Female' && age >= 20 && age < 40) {
            f20++;
        } else if (gender == 'Male' && age >= 40 && age < 60) {
            m40++;
        } else if (gender == 'Female' && age >= 40 && age < 60) {
            f40++;
        } else if (gender == 'Male' && age >= 60) {
            m60++;
        } else if (gender == 'Female' && age >= 60) {
            f60++;
        } else {
            alert(" = = ");
        }
    }
    $("#m20").text(m20);
    $("#m40").text(m40);
    $("#m60").text(m60);
    $("#f20").text(f20);
    $("#f40").text(f40);
    $("#f60").text(f60);

    $("#m20p").text(Math.floor(m20 / length * 100) + "%");
    $("#m40p").text(Math.floor(m40 / length * 100) + "%");
    $("#m60p").text(Math.floor(m60 / length * 100) + "%");
    $("#f20p").text(Math.floor(f20 / length * 100) + "%");
    $("#f40p").text(Math.floor(f40 / length * 100) + "%");
    $("#f60p").text(Math.floor(f60 / length * 100) + "%");

    $('a[data-toggle="tab"][href="#funds-apply-form"]').on('shown.bs.tab',function (event) {
        PartyForm({'m20':m20,'m40':m40,'m60':m60,'f20':f20,'f40':f40,'f60':f60});
    });
}

// function TrainingSummary() {
//     //User have to fill in which training to conduct and the price in summary.html.
//
//     // load available trainings
//     var trainings = DB.trainings();
//     var trainingsElement = $("#trainings-list");
//     for (var i = 0; i < trainings.length; i++) {
//         var training = trainings[i];
//         var label = $('<div class="label label-info" data-toggle="tooltip" data-placement="top" ></div>');
//         label.attr({'price': training.amount, title: training.description, value: training.id}).text(training.name);
//         label.append($('<span class="glyphicon glyphicon-remove" style="margin-left: 10px;color: darkred"></span>').hide());
//         trainingsElement.append(label);
//     }
//
//     var emps = JSON.parse(localStorage.getItem('emps'));
//     var data = {};
//     for (var i = 0; i < emps.length; i++) {
//         var emp = emps[i];
//         var position = emp['Position'];
//         var major = emp["Dep/Div/Major"];
//         var number = emp["Number"];
//
//         if (typeof data[position + ',' + major] != 'undefined') {
//             if (typeof data[position + ',' + major].count != 'undefined') {
//                 data[position + ',' + major].numbers += ', ' + number;
//                 data[position + ',' + major].count++;
//             }
//         } else {
//             data[position + ',' + major] = {};
//             data[position + ',' + major].numbers = number;
//             data[position + ',' + major].count = 1;
//         }
//
//     }
//     for (var key in data) {
//         var tr = $("<tr></tr>");
//         $("<td>" + key.split(',')[0] + "</td>").appendTo(tr);
//         $("<td>" + key.split(',')[1] + "</td>").appendTo(tr);
//         $("<td>" + data[key].count + "</td>").appendTo(tr);
//         $('<td class="selected-training"></td>').appendTo(tr);
//         tr.appendTo($("#training table"));
//     }
//     $("#training").show();
//     $(function () {
//         $('[data-toggle="tooltip"]').tooltip();
//
//         $(".selected-training").parent().droppable({
//             accept: "#trainings-list div",
//             drop: function (event, ui) {
//                 $(this).find(".selected-training").append(ui.draggable.clone());
//             }
//         });
//
//         $("#trainings-list div").hover(function () {
//             $(this).find(".glyphicon-remove").show();
//         }, function () {
//             $(this).find(".glyphicon-remove").hide();
//         });
//
//
//         $("#trainings-list div .glyphicon-remove").on('click', function () {
//             var training = $(this).parent();
//             var trainingId = training.attr('value');
//             var trainingName = training.text();
//             if (confirm("Are you sure to delete training " + trainingName + "?")) {
//                 training.remove();
//                 DB.deleteTraining(trainingId);
//             }
//             event.stopPropagation();
//         });
//
//         $("#trainings-list div").draggable({
//             helper: "clone",
//             revert: "invalid",
//             stop: function (event, ui) {
//                 var tname = $(this).text();
//                 $(".selected-training").each(function () {
//                     var count = 0;
//                     $(this).children().each(function () {
//                         if ($(this).text() == tname) {
//                             count++;
//                             if (count > 1) {
//                                 $(this).remove();
//                                 console.log("has this element");
//                             }
//                         }
//                         $(this).draggable({
//                             revert: "invalid",
//                             revertDuration: 0,
//                             stop: function (event, ui) {
//                                 var box = $(this).parent();
//                                 if (outOfBox(ui.position.top, ui.position.left, $(this), $(box))) {
//                                     $(this).remove();
//                                 }
//                             }
//                         });
//                     });
//                 });
//             }
//         });
//     });
//     return data;
// }

function WelfareForm() {
    emptyForm();
    var emps = JSON.parse(localStorage.getItem('emp-list'));
    var totalAmount = 0;
    for (var i = 0; i < emps.length; i++) {
        var emp = emps[i];
        var empId = emp['Number'];
        var amount = parseInt(emp['Travel Allowance']);
        totalAmount += amount;
        appendEmpAmount(empId, amount,'');
    }
    $("#tamount").text(totalAmount);
    $("#date").text(localStorage.getItem('date'));
    $("#purpose").text("Travel Allowance");
}

// function TrainingForm(data) {
//     emptyForm();
//     var summaryTrs = $("#training table tr");
//     var totalAmount = 0;
//     for (var i = 1; i < summaryTrs.length; i++) {
//         var summaryTr = summaryTrs[i];
//         var key = $(summaryTr).find('td').eq(0).text() + "," + $(summaryTr).find('td').eq(1).text();
//         var count = data[key].count;
//         var numbers = data[key].numbers;
//         $(summaryTr).find('td').eq(3).children().each(function () {
//             var amount = parseInt($(this).attr('price'));
//             totalAmount += (amount * count);
//             appendEmpAmount(numbers, amount * count);
//         });
//     }
//
//     $("#tamount").text(totalAmount);
//     $("#date").text(localStorage.getItem('date'));
//     $("#purpose").text("Training");
// }

function PartyForm(data) {
    //Ask for party content, price
    emptyForm();
    var amount = parseInt($("#party-amount").val());
    var emps = JSON.parse(localStorage.getItem('emp-list'));
    var totalAmount = amount * emps.length;
    for (var i = 0; i < emps.length; i++) {
        var emp = emps[i];
        var empId = emp['Number'];
        appendEmpAmount(empId, amount,'');
    }
    $("#tamount").text(totalAmount);
    $("#date").text(localStorage.getItem('date'));
    $("#purpose").text("Staff Party - " + $("#party-content").val());
}

function DormitoryForm(data) {
    emptyForm();
    //fill form for dormitory part
    var amount = parseInt($("#rental").val());
    var maleCount = data.maleCount;
    var femaleCount = data.femaleCount;
    var pplPerRoom = parseInt($('#room-size').val());
    var totalAmount = amount * (Math.ceil(maleCount / pplPerRoom) + Math.ceil(femaleCount / pplPerRoom));
    $("#date").text(localStorage.getItem('date'));
    $("#purpose").text("Arrange Worker");
    var temp = '';
    for (var i = 0; i < data.maleEmps.length; i++) {
        var maleEmp = data.maleEmps[i];
        temp += maleEmp + ", ";
        if ((i + 1) % pplPerRoom == 0 || i == data.maleEmps.length - 1) {
            appendEmpAmount(temp.substr(0, temp.length - 2), amount, 'Rent dormitory');
            temp = '';
        }
    }
    for (var i = 0; i < data.femaleEmps.length; i++) {
        var femaleEmp = data.femaleEmps[i];
        temp += femaleEmp + ", ";
        if ((i + 1) % pplPerRoom == 0 || i == data.femaleEmps.length - 1) {
            appendEmpAmount(temp.substr(0, temp.length - 2), amount, 'Rent dormitory');
            temp = '';
        }
    }

    //fill form for apply WP
    var emps = JSON.parse(localStorage.getItem('emp-list-wp'));
    var amount = 30;
    for (var i = 0; i < emps.length; i++) {
        var emp = emps[i];
        var empId = emp['Number'];
        totalAmount += amount;
        appendEmpAmount(empId, amount,'Work pass application fees');
    }
    $("#tamount").text(totalAmount);
}

function appendEmpAmount(empId, amount, note) {
    //append each emp id and amount pairs to table.
    var reportTable = $("#funds-apply-form table");
    var row = $("<tr class='active emp-amount'><td>" + empId + "</td> <td>" + amount + "</td> <td>" + note + "</td></tr>")
    reportTable.append(row);
}

function emptyForm() {
    $(".emp-amount").remove();
}

function outOfBox(eTop, eLeft, element, box) {
    var bWidth = box.width();
    var bHeight = box.height();

    var eWidth = element.width();
    var eHeight = element.height();

    return !!(eTop > bHeight || eTop + eHeight < 0 || eLeft + eWidth < 0 || eLeft > bWidth);
}