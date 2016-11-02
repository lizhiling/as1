$(document).ready(function () {
	var trigger = $('.hamburger');
	var	isClosed = false;

	trigger.click(function () {
		if (isClosed == true) {
			trigger.removeClass('is-open');
			trigger.addClass('is-closed');
			isClosed = false;
		} else {
			trigger.removeClass('is-closed');
			trigger.addClass('is-open');
			isClosed = true;
		}
	});

	$('[data-toggle="offcanvas"]').click(function () {
		$('#wrapper').toggleClass('toggled');
	});

	//start logic
	var user = localStorage.getItem('user');
	$('.option').parent().hide();
	$('.'+user).parent().show();
	$('.eng').parent().show();
	if (user=='pm')
		$('#user-group').text('Project Manager');
	if (user=='hr')
		$('#user-group').text('HR Manager');
	if (user=='eng')
		$('#user-group').text('Engineer');

	var theme = getParam('theme');
	employeeList(parseInt(theme));
	loadCreateThemesDialog();

	progressBar();
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
		window.open("index.html?theme=0", "_self");
	});

	// $('#emp-list th, #emp-list-wp th').on('click', function(){
	// 	$(this).toggleClass('highlighted');
	// 	// var column = $(this).attr('class');
	// 	// alert(column);
	// 	$('#emp-list td[class*='+column+']').toggleClass('highlighted');
    //
	// });

	$('#print').on('click',function () {
		window.print();
	});

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

function newLayout() {
	event.stopPropagation();
	event.preventDefault();
	$('#new-column-layout').modal('show');
}

function progressBar() {
	var tabs = $('.nav-tabs .available');
	$('.bs-wizard-stepnum').hide();
	$('.bs-wizard-step.active:visible .bs-wizard-stepnum').show();

	$('#prevtab,#nexttab').on('click', function() {
		var now = $('.bs-wizard-step:visible a[href="'+$(tabs).filter('.active').find('a[data-toggle="tab"]').attr('href')+'"]');
		var prev  = $(tabs).filter('.active').prevAll('.available')[0];
		var next  = $(tabs).filter('.active').nextAll('.available')[0];
		var preva = $(prev).find('a[data-toggle="tab"]');
		var nexta = $(next).find('a[data-toggle="tab"]');
		var newStep;

		if($(this).attr('id')=='prevtab'){
			newStep = $('.bs-wizard-step:visible a[href="'+preva.attr('href')+'"]');
			if(!checkForm(newStep)){
				return 0;
			}
			$(newStep).parent().toggleClass('complete').toggleClass('active');
			$(now).parent().toggleClass('active').toggleClass('disabled');
			preva.tab('show');
		}else{
			newStep = $('.bs-wizard-step:visible a[href="'+nexta.attr('href')+'"]');
			if(!checkForm(newStep)){
				return 0;
			}
			$(newStep).parent().toggleClass('disabled').toggleClass('active');
			$(now).parent().toggleClass('active').toggleClass('complete');
			nexta.tab('show');
		}
		$(now).prevAll('.bs-wizard-stepnum').hide();
		$(newStep).prevAll('.bs-wizard-stepnum').show();
		if(newStep.parent().hasClass('first-step')){
			$('#prevtab').prop('disabled', true);
		}
		if(!newStep.parent().hasClass('last-step')){
			$('#nexttab').prop('disabled', false);
		}
		if(newStep.parent().hasClass('last-step')){
			$('#nexttab').prop('disabled', true);
		}
		if(!newStep.parent().hasClass('first-step')){
			$('#prevtab').prop('disabled', false);
		}
		$('html, body').animate({ scrollTop: 0 }, 'fast');
	});

	function checkForm(newStep){
		var result = true;
		if($(newStep).attr('href')=="#funds-apply-form"){
			// if($(this).hasClass('apply-funds')){
			//check required class
			$('div.active input[required]').each(function () {
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
					result = false;
				}
			});
		};
		return result;
	}
}
