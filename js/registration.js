$(document).ready(() => {

	var data, listTeamName = [], listEmail = [], getData;

	// GET Data
	$.ajax({
		type: 'GET',
		dataType: 'json',
		crossOrigin: true,
		url: 'https://cors.io/?https://tritontelkomuniversity.dougleclass.com/public/api/users',
		data: data,
		async: false,
		headers: {"Accept": "application/json"},
		success: function(data) {
			getData = data;
		},
		error: function() {
			console.log('failed to connect API');
		}
	});

	// Total Data
	var totalData = getData.data.length;

	// Assign the Team Name & Email
	for(var i = 0;i < totalData;i++) {
    listTeamName[i] = getData.data[i]["Team Name"].toLowerCase();
    listEmail[i] = getData.data[i]["Email"].toLowerCase();
  }

	// General Validation
	function isValid(param) {
		$(`input[name=${param}]`).on('input', () => {
			var input = $(`input[name=${param}]`);
			var is_param = input.val();
			if(is_param) {
				input.removeClass("is-danger").addClass("is-success");
				$institution 	   = $(`input[name=${param}]`);
			}
				else input.removeClass("is-success").addClass("is-danger");
		});
		var input = $(`input[name=${param}]`);
		var is_param = input.val();
		return (is_param.length > 0);
	}

	// ValidName Validation
	function isValidTeamName() {
		$('input[name=team_name]').on('input', () => {
			var input = $('input[name=team_name]');
			var is_teamName = input.val();
			if(is_teamName.length > 0 && is_teamName.length <= 50 && !listTeamName.includes(input.val().toLowerCase())) {
				input.removeClass("is-danger").addClass("is-success");
				$teamName 	   = $('input[name=team_name]');
				status = true;
			}
				else input.removeClass("is-success").addClass("is-danger");
			});
		var input = $('input[name=team_name]');
		var is_teamName = input.val();
		return (is_teamName.length > 0) && (is_teamName.length <= 50);
	}

	// Valid Email Validation
	function isValidEmail() {
		var status = false;
		$('input[name=email]').on('input', () => {
			var input = $('input[name=email]');
			var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
			var is_Email = re.test(input.val());
			if(is_Email && !listEmail.includes(input.val().toLowerCase())) {
				input.removeClass("is-danger").addClass("is-success");
				$teamName 	   = $('input[name=email]');
				status = true;
			}
				else input.removeClass("is-success").addClass("is-danger");
			});
		return status;
	}

	// Valid upload
	function isUpload() {

	}

	isValidTeamName();
	isValidEmail();
	isValid('institution');
	isValid('team_member_1');
	isValid('team_member_2');
	isValid('team_member_3');
	isValid('team_member_4');



	$('button[type=button]').on('click', () => {



	});
});
