$(document).ready(() => {

	var data, listTeamName = [], listEmail = [], getData;

	// GET Data
	$.ajax({
		type: 'GET',
		dataType: 'json',
		crossOrigin: true,
		url: '/api/users',
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
			var input = $(`input[name=${param}]`),
					is_param = input.val();
			if(is_param) {
				input.removeClass("is-danger").addClass("is-success");
				$institution 	   = $(`input[name=${param}]`);
			}
				else input.removeClass("is-success").addClass("is-danger");
		});
		var input = $(`input[name=${param}]`),
				is_param = input.val();
		return (is_param.length > 0);
	}

	// ValidName Validation
	function isValidTeamName() {
		$('input[name=team_name]').on('input', () => {
			var input = $('input[name=team_name]'),
					is_teamName = input.val();
			if(is_teamName.length > 0 && is_teamName.length <= 50 && !listTeamName.includes(input.val().toLowerCase())) {
				input.removeClass("is-danger").addClass("is-success");
				$teamName 	   = $('input[name=team_name]');
				status = true;
			}
				else input.removeClass("is-success").addClass("is-danger");
			});
		var input = $('input[name=team_name]'),
				is_teamName = input.val();
		return (is_teamName.length > 0) && (is_teamName.length <= 50);
	}

	// Valid Email Validation
	function isValidEmail() {
		var status = false;
		$('input[name=email]').on('input', () => {
			var input = $('input[name=email]'),
			    re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
					is_Email = re.test(input.val());
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
		var input = $('input[name=active_student_proof]');
		input.on('change', () => {
			var studentProof = $('input[name=active_student_proof]')[0].files[0],
					fileName = studentProof.name,
					fileSize = studentProof.size,
			// extension validation
					fileExtension = /\.(zip|rar)$/i;
			if(!fileExtension.test(fileName) || fileSize > 307200) {
				var error = "";
				if(!fileExtension.test(fileName)) error += " | Your File Extension isn't ZIP / RAR \n";
				if(fileSize > 307200) error += " | Your File Size is bigger than 3MB";
				input.removeClass("is-success").addClass("is-danger");
				$('#warn').html(error);
			}
			else {
				$('#warn').html("");
				input.removeClass("is-danger").addClass("is-success");
			}
			return !fileExtension.test(fileName) || fileSize > 307200;
		});
	}

	function len(param) {
		return $(param).val().length > 0;
	}

	function isUploadTrue() {
			var studentProof = $('input[name=active_student_proof]')[0].files[0],
					fileName = studentProof.name,
			    fileSize = studentProof.size,
					fileExtension = /\.(rar|zip)$/i;
			return (fileExtension.test(fileName) && fileSize < 307200);
	}

	isValidTeamName();
	isValidEmail();
	isValid('institution');
	isValid('team_member_1');
	isValid('team_member_2');
	isValid('team_member_3');
	isUpload();

	var team_member_4 = $('input[name=team_member_4]');
	if(team_member_4.val().length !== 0) isValid('team_member_4');


	$('button#registrationButton').on('click', () => {

		// cek checkbox
		if($('input[name=agree]')[0].checked) {

			// cek length form input jika true baru diinput
			if(len('input[name=team_name]') && len('input[name=institution]') && len('input[name=email]') && len('input[name=team_member_1]') && len('input[name=team_member_2]') && len('input[name=team_member_3]') && isUploadTrue()) {


				$('#warnAgree').html('');

				var team_name = $('input[name=team_name]');
				var institution = $('input[name=institution]');
				var email = $('input[name=email]');
				var team_member_1 = $('input[name=team_member_1]');
				var team_member_2 = $('input[name=team_member_2]');
				var team_member_3 = $('input[name=team_member_3]');
				var studentProof = $('input[name=active_student_proof]')[0].files[0];

				// validating for team_member_4 beacause it nullable
				var team_member_4 = $('input[name=team_member_4]');
				team_member_4 = team_member_4.val();
				if(team_member_4.length === 0) team_member_4 = null;

				var data = new FormData();
				data.append('team_name', team_name.val());
				data.append('email', email.val());
				data.append('institution', institution.val());
				data.append('team_member_1', team_member_1.val());
				data.append('team_member_2', team_member_2.val());
				data.append('team_member_3', team_member_3.val());
				data.append('team_member_4', team_member_4);
				data.append('active_student_proof', studentProof);

				// Axios Post
				axios.post('/api/auth/register', data, {
				headers: {
									'Content-Type': 'multipart/form-data',
									'Accept': 'Application/json'
								}})
									.then((res) => console.log(res))
									.then(() => {
										window.location.replace('http://tritontelkom.id/thankyou')
									})
									.catch((err) => console.log(err));


			} else {
				// Failed
				isValidTeamName();
				isValidEmail();
				isValid('institution');
				isValid('team_member_1');
				isValid('team_member_2');
				isValid('team_member_3');
				isUpload();
			}


		} else {
			$('#warnAgree').html('Please Check This');
		} // Agar Checkbox di centang


	}); // event on click
});
