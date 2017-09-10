$(function () {

    $(window).stellar({
        horizontalScrolling: false
    });

    var nice = $("html").niceScroll({
        cursorwidth: 8,
        cursorborder: "0px solid #fff",
        cursorborderradius: '0'
    });

    $('.main-nav a:not(.dropdown-toggle)').bind('click', function(event) {
        var $anchor = $(this);

        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');

        event.preventDefault();
    });

    $('.st-ff-count').appear();
    $(document.body).on('appear', '.st-ff-count', function(e, $affected) {
        $affected.each(function(i) {
            if (parseInt($(this).data('runit'))) {
                $(this).countTo({
                    speed: 3000,
                    refreshInterval: 50
                });
                $(this).data('runit', "0");
            };

        });
    });

    $('[data-toggle="tooltip"]').tooltip();




    function home_height () {
        var element = $('.st-home-unit'),
            elemHeight = element.height(),
            winHeight = $(window).height()
        padding = (winHeight - elemHeight - 200) /2;

        if (padding < 1 ) {
            padding = 0;
        };
        element.css('padding', padding+'px 0');
    }
    home_height ();

    $(window).resize(function () {
        home_height ();
    });


    var fadeStart=$(window).height()/3 // 100px scroll or less will equiv to 1 opacity
        ,fadeUntil=$(window).height() // 200px scroll or more will equiv to 0 opacity
        ,fading = $('.st-home-unit')
        ,fading2 = $('.hero-overlayer')
    ;

    $(window).bind('scroll', function(){
        var offset = $(document).scrollTop()
            ,opacity=0
            ,opacity2=1
        ;
        if( offset<=fadeStart ){
            opacity=1;
            opacity2=0;
        }else if( offset<=fadeUntil ){
            opacity=1-offset/fadeUntil;
            opacity2=offset/fadeUntil;
        }
        fading.css({'opacity': opacity});

        if (offset >= 120) {
            $('.st-navbar').addClass("st-navbar-mini");
        } else if (offset <= 119) {
            $('.st-navbar').removeClass("st-navbar-mini");
        }
    });





    $(".testimonials-carousel ul").owlCarousel({
        items: 1,
        navigation: false,
        pagination: true,
        singleItem:true,
        autoPlay: true,
        navigationText: ['<i class="ct-etp etp-arrow-left7"></i>', '<i class="ct-etp etp-arrow-right8"></i>'],
        transitionStyle: "backSlide"
    });

    $('.clients-carousel').owlCarousel({
        items: 5,
        autoPlay: true,
        pagination: false
    });

    ////// mailchimp //////
    $(".subscribe-form").ajaxChimp({
        callback: mcCallback,
        url: "http://cantothemes.us8.list-manage2.com/subscribe/post?u=37a0cb83e98c8633253ad0acd&id=03d8ef0996" // Replace your mailchimp post url inside double quote "".
    });

    function mcCallback (res) {
        if(res.result === 'success') {
            $('.subscribe-result').html('<i class="pe-7s-check"></i>' + res.msg).delay(500).slideDown(1000).delay(10000).slideUp(1000);
        }else if(res.result === 'error'){
            $('.subscribe-result').html('<i class="pe-7s-close-circle"></i>' + res.msg).delay(500).slideDown(1000).delay(10000).slideUp(1000);
        }
    }


    function checkEmpty(selector) {
        if (selector.val()=="" || selector.val()==selector.prop("placeholder")) {
            selector.addClass('formFieldError',500);
            return false;
        } else {
            selector.removeClass('formFieldError',500);
            return true;
        }
    }
    function validateEmail(email) {
        var regex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;
        if (!regex.test(email.val())) {
            email.addClass('formFieldError',500);
            return false;
        } else {
            email.removeClass('formFieldError',500);
            return true;
        }
    }

    $('.contact-form').submit(function () {
        var $this = $(this),
            result = true;

        if(!checkEmpty($this.find('#fname'))){
            result=false;
        }
        if(!validateEmail($this.find('#email'))) {
            result=false;
        }
        if(!checkEmpty($this.find('#mssg'))) {
            result=false;
        }

        if(result==false) {
            return false;
        }

        var $btn = $("#send").button('loading');

        var data = $this.serialize();

        $.ajax({
            url: "sender.php",
            type: "POST",
            data: data,
            cache: false,
            success: function (html) {
                console.log(html);
                if (html==1) {
                    $('#result-message').addClass('alert alert-success').html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Success!</strong> Message Send. We will contact with you soon.').delay(500).slideDown(500).delay(10000).slideUp('slow');

                    $btn.button('reset');

                } else {
                    $('#result-message').addClass('alert alert-danger').html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Error!</strong> Message Sending Error! Please try again').delay(500).slideDown(500).delay(10000).slideUp('slow');
                    $btn.button('reset');
                }
            },
            error: function (a, b) {
                if (b == 'error') {
                    $('#result-message').addClass('alert alert-danger').html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Error!</strong> Message Sending Error! Please try again').delay(500).slideDown(500).delay(10000).slideUp('slow');
                };
                $btn.button('reset');
            }
        });

        return false;
    });

    // $('#name').input(function () {
    //     console.log("keyup");
    //     var name = $('#name').val();
    //     var reg = /^[\u4E00-\u9FA5A-Za-z0-9_]{1,16}$/;
    //     if (reg.test(name)) {
    //         $('#nameHint').load("hint.html #nameHinty");
    //     } else {
    //         $('#nameHint').load("hint.html #nameHintn");
    //     }
    // });


});


$(window).load(function () {
    var $grid = $('.grid'),
        $sizer = $grid.find('.shuffle__sizer'),
        $filterType = $('#filter input[name="filter"]');

    $grid.shuffle({
        itemSelector: '.portfolio-item',
        sizer: $sizer
    });

    $filterType.change(function(e) {
        var group = $('#filter input[name="filter"]:checked').val();

        $grid.shuffle('shuffle', group);

        $('label.btn-main').removeClass('btn-main');
        $('input[name="filter"]:checked').parent().addClass('btn-main');
    });
});

function checkName(str) {
    var reg = /^[\u4E00-\u9FA5A-Za-z0-9_]{1,16}$/;
    var name = document.getElementById("nameHint");
    if(str === "") {
        name.innerHTML = "";
    } else if (!reg.test(str)) {
        if(str.length > 16) {
            name.innerHTML = "您的昵称过长！";
        } else {
            name.innerHTML = "您的昵称含有非法字符！";
        }
    } else {
        name.innerHTML = "";
    }
}

function checkPsw(str) {
    var reg = /^[a-zA-Z0-9]{6,16}$/;
    var psw = document.getElementById("passwordHint");
    if(str === "") {
        psw.innerHTML = "";
    } else if (!reg.test(str)) {
        if(str.length < 6) {
            psw.innerHTML = "您的密码位数过短！";
        } else if (str.length > 16) {
            psw.innerHTML = "您的密码位数过长！";
        } else {
            psw.innerHTML = "您的密码含有非法字符！";
        }

    } else {
        psw.innerHTML = "";
    }
}

function checkEmail(str) {
    var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    var email = document.getElementById("emailHint");
    if(str === "") {
        email.innerHTML = "";
    } else if (!reg.test(str)) {
        email.innerHTML = "您的邮箱不符合规范！";
    } else {
        email.innerHTML = "";
    }
}