$().ready(() => {

  isValidTeamName()
  isValidEmail()
  isUpload()
  isValid('team_member_1')
  isValid('team_member_2')
  isValid('team_member_3')
  const team_member_4 = $('input[name=team_member_4]')
	if(team_member_4.val().length !== 0) isValid('team_member_4')

  $('button#registrationButton').on('click', () => {
    if(!$('input[name=agree]')[0].checked)
      $('#warnAgree').html('Please Check This')
    else {
      if(
        len('input[name=team_name]') &&
        len('input[name=email]') &&
        len('input[name=team_member_1]') &&
        len('input[name=team_member_2]') &&
        len('input[name=team_member_3]') &&
        isUploadTrue()
      )
      {
        $('#warnAgree').html('');
        const team_name = $('input[name=team_name]'),
              email = $('input[name=email]'),
              team_member_1 = $('input[name=team_member_1]'),
              team_member_2 = $('input[name=team_member_2]'),
              team_member_3 = $('input[name=team_member_3]'),
              studentProof = $('input[name=active_student_proof]')[0].files[0],
              team_member_4 = ($('input[name=team_member_4]').length === 0) ? null : $('input[name=team_member_4]').val()
        const data = new FormData()
        data.append('team_name', team_name.val())
        data.append('email', email.val())
        data.append('team_member_1', team_member_1.val())
        data.append('team_member_2', team_member_2.val())
        data.append('team_member_3', team_member_3.val())
        data.append('team_member_4', team_member_4.val())
        data.append('active_student_proof', studentProof)
        // axios post
        axios.post('https://tritontelkom.id/api/auth/register', data, {
				headers: {
									'Content-Type': 'multipart/form-data',
									'Accept': 'Application/json'
								}})
					.then((res) => {
            window.location.replace('https://tritontelkom.id/thankyou')
          })
					.catch((err) => alert('Error\n Please Contact hi@tritontelkom.id'));
      }
    } // checkbox
  })

})

const isAvailable = async (param1, data) => {
  let valid = (param1 === 'team') ? 'isTeamNameAvailable' : ('email') ? 'isEmailAvailable' : 'wrong parameter',
      url = 'https://tritontelkom.id/api/'+valid+'/'+data;
  return await fetch(url)
}

const isValid = param => {
  const input = $(`input[name=${param}]`)
  input.on('input', () => {
    (input.val().length > 0)
      ? input.removeClass("is-danger").addClass("is-success")
      : input.removeClass("is-success").addClass("is-danger")
    ;
  })
}

const isValidTeamName = () => {
  const input = $('input[name=team_name]')
  input.on('input', () => {
    isAvailable('team',input.val())
      .then(res => res.json())
      .then(
        res => {
          (
            input.val().length > 0 &&
            input.val().length <= 50 &&
            res.data.Availibility
          )
            ? (
              input.removeClass("is-danger").addClass("is-success"),
              $('#teamNameWarn').html('')
            )
            : (
              input.removeClass("is-success").addClass("is-danger"),
              $('#teamNameWarn').html('This team name has been already taken')
            )
        }
      )
      .catch(err => alert('Error\n Please Contact hi@tritontelkom.id'))
  })
}

const isValidEmail = () => {
  const input = $('input[name=email]'),
        re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  input.on('input', () => {
    isAvailable('email', input.val())
      .then(res => res.json())
      .then(
        res => {
          (
            re.test(input.val()) &&
            input.val().length > 0
          )
           ? (res.data.Availibility)
                ? (
                  input.removeClass("is-danger").addClass("is-success"),
                  $('#emailWarn').html('')
                )
                : (
                  input.removeClass("is-success").addClass("is-danger"),
                  $('#emailWarn').html('This email has been already taken')
                )
           : input.removeClass("is-success").addClass("is-danger")
        }
      )			return (fileExtension.test(fileName) && fileSize < 307200);

      .catch(err => alert('Error\n Please Contact hi@tritontelkom.id'))
  })
}

const isUpload = () => {
  const input = $('input[name=active_student_proof]')
  input.on('change', () => {
    const studentProof = $('input[name=active_student_proof]')[0].files[0],
          fileName = studentProof.name,
          fileSize = studentProof.size,
          // extension validation
          fileExtension = /\.(zip|rar)$/i
    if(!fileExtension.test(fileName) || fileSize > 3072000) {
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
  })
}

const len = (param) => {
  return $(param).val().length > 0;
}

const isUploadTrue = () => {
  const studentProof = $('input[name=active_student_proof]')[0].files[0],
        fileName = studentProof.name,
        fileSize = studentProof.size,
        fileExtension = /\.(rar|zip)$/i
  return (fileExtension.test(fileName) && fileSize < 307200)
}
