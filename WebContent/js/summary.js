var data = generateSummary();
$("#print").on('click', function () {
    window.print();
});

$("#summary form").on('submit', function () {
    generateForm(data);
    event.preventDefault();
});


$("#new-training form").on('submit', function () {
    var name = $("#new-training-name").val();
    var description = $("#new-training-description").val();
    var amount = $("#new-training-amount").val();
    DB.saveTraining(name, description, amount);
    location.reload(false);
});

