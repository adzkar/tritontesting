$(document).ready(() => {

	var data;
	// GET Data
	$.ajax({
		type: 'GET',
		dataType: 'jsonp',
		url: 'http://tritontelkomuniversity.dougleclass.com/api/users/',
		data: data,
		success: function(data) {
			console.log(data);
		},
		error: function() {
			console.log('failed to connect API');
		}
	});


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
			if(is_teamName.length > 0 && is_teamName.length <= 50) {
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
			if(is_Email) {
				input.removeClass("is-danger").addClass("is-success");
				$teamName 	   = $('input[name=email]');
				status = true;
			}
				else input.removeClass("is-success").addClass("is-danger");
			});
		return status;
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
