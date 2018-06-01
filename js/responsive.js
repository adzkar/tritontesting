$().ready(() => {
      if ($(window).width() <= 1024) {
        $('#hidden-desc').addClass('hidden')
        $('.bg3').addClass('hidden');
        $('.timeline').addClass('hidden');
        $('.timel').addClass('hidden');
      }
    });

    $(window).resize(() => {
      if ($(window).width() > 1024) {
        console.log('big')
        $('.navbar-item').removeClass('has-text-black');
        $('.fab').removeClass('has-text-black');
        $('.fa').removeClass('has-text-black');
        $('#hidden-desc').removeClass('hidden');
        $('.bg3').removeClass('hidden');
        $('.timeline').removeClass('hidden');
        $('.timel').removeClass('hidden');
      } else {
        if ($('.navbar-burger').hasClass('is-active')) {
          $('.navbar-item').toggleClass('has-text-black');
          $('.fab').toggleClass('has-text-black');
          $('.fa').toggleClass('has-text-black');
        }
        $('#hidden-desc').addClass('hidden');
        $('.bg3').addClass('hidden');
        $('.timeline').addClass('hidden');
        $('.timel').addClass('hidden');

      }
    })

    $('.navbar-burger').click(() => {
      console.log('small')
      $('.navbar-item').toggleClass('has-text-black');
      $('.fab').toggleClass('has-text-black');
      $('.fa').toggleClass('has-text-black');
      $('#nav-menu').toggleClass('is-active');
      $('.navbar-burger').toggleClass('is-active');


    });
