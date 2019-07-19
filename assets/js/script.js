'use strict';

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Shared = function Shared() {
  _classCallCheck(this, Shared);
};

if ($('.js-currStatePrice').length > 0) {
  var Calculator = function () {
    function Calculator() {
      _classCallCheck(this, Calculator);

      this.currStatePriceEl = document.querySelector('.js-currStatePrice');
      this.currEmployeeEl = document.querySelector('.js-currEmployee');
      this.currHrsWeekEl = document.querySelector('.js-currTime');
      this.stateFinalPrice = document.querySelector('.js-stateFinalPrice');
      this.stateOfferPrice = document.querySelector('.js-statePrice');
      this.ourFinalPrice = document.querySelector('.js-ourFinalPrice');
      this.ourOfferPrice = document.querySelector('.js-ourPrice');
      this.defaultStatePrice = document.querySelector('[data-type="price"]');
      this.ourPrice = Number(this.currStatePriceEl.getAttribute('data-ourPrice'));
      this.statePrice = 0;
      this.getAndSetCurrentPrice(this.defaultStatePrice);
    }

    /**
     * calculate price for 1hr in current state
     *
     * @param el
     * @returns {number}
     */


    _createClass(Calculator, [{
      key: 'priceHrCalc',
      value: function priceHrCalc(el) {
        var tax = 0;
        var price = el.getAttribute('data-basePrice');
        var taxArr = el.getAttribute('data-tax').split('+');

        for (var i = 0; i < taxArr.length; i++) {
          tax += Number(taxArr[i]);
        }
        return Math.round(Number(price) * (1 + tax / 100) * 100) / 100;
      }

      /**
       * calculate final price
       *
       * @param type - type state price or beacons
       * @param employee
       * @param hrs
       * @returns {number}
       */

    }, {
      key: 'priceCalc',
      value: function priceCalc(type, employee, hrs) {
        if (type === 'state') {
          return Math.round(Number(this.currStatePriceEl.getAttribute('data-currPrice')) * hrs * employee * 100) / 100;
        } else if (type === 'our') {
          return Math.round(this.ourPrice * hrs * employee * 100) / 100;
        }
      }
    }, {
      key: 'getHrs',
      value: function getHrs() {
        return Number(this.currHrsWeekEl.getAttribute('data-currTime'));
      }
    }, {
      key: 'getEmployees',
      value: function getEmployees() {
        return Number(this.currEmployeeEl.getAttribute('data-currEmployee'));
      }

      /**
       * get element attribute
       *
       * @param el - element on click
       */

    }, {
      key: 'getAttribute',
      value: function getAttribute(el) {
        var dataType = el.getAttribute('data-type');

        if (dataType === 'price') {
          var price = this.priceHrCalc(el);
          this.statePrice = price;
          this.currStatePriceEl.setAttribute('data-currPrice', price);
        }

        if (dataType === 'time') {
          var time = el.getAttribute('data-time');
          this.currHrsWeekEl.setAttribute('data-currTime', time);
        }

        if (dataType === 'employee') {
          var employee = el.getAttribute('data-employee');
          this.currEmployeeEl.setAttribute('data-currEmployee', employee);
        }
      }

      /**
       * calculate price and write it to fields
       *
       * @param el - element on click
       */

    }, {
      key: 'getAndSetCurrentPrice',
      value: function getAndSetCurrentPrice(el) {
        this.getAttribute(el);
        var hrs = this.getHrs();
        var employees = this.getEmployees();
        this.stateOfferPrice.innerHTML = '$' + this.statePrice;
        this.stateFinalPrice.innerHTML = '$' + this.priceCalc('state', hrs, employees);
        this.ourOfferPrice.innerHTML = '$' + this.ourPrice;
        this.ourFinalPrice.innerHTML = '$' + this.priceCalc('our', hrs, employees);
      }
    }]);

    return Calculator;
  }();


  document.addEventListener('DOMContentLoaded', function () {
    var calc = new Calculator();
    var selects = document.querySelectorAll('.select-wrap');
    var options = document.querySelectorAll('.select-option');

    for (var i = 0; i < selects.length; i++) {
      selects[i].addEventListener('click', function () {
        $(this.querySelector('.select-options')).slideToggle(200);
      });
    }

    var _loop = function _loop(j) {
      options[j].addEventListener('click', function () {
        var text = this.innerHTML;
        var parent = this.closest('.select-wrap');
        parent.querySelector('.select span').innerHTML = text;
        parent.querySelector('.input-hidden').value = text;

        calc.getAndSetCurrentPrice(options[j]);
      });
    };

    for (var j = 0; j < options.length; j++) {
      _loop(j);
    }
  });
}
$(document).ready(function () {
  $('.header__menu-btn').click(function () {
    $('.header__menu').toggleClass('header__menu_show');
  });
  $('.menu-link').click(function () {
    $('.header__menu').toggleClass('header__menu_show');
  });

  if (document.querySelector('.header__menu')) {
    var items = document.querySelectorAll('.header__menu li a');
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (document.body.clientWidth >= 1200) {
        if (item.clientWidth > 140) {
          item.style.width = '140px';
          item.setAttribute('title', item.innerHTML);
        }
      } else if (document.body.clientWidth >= 992) {
        if (item.clientWidth > 120) {
          item.style.width = '120px';
          item.setAttribute('title', item.innerHTML);
        }
      }
    }
  }

  if ($('.jsClientSlider').length > 0) {
    $('.jsClientSlider').slick({
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      prevArrow: '<button type="button" class="prevSlick"><img src="assets/images/icons/right-arrow.svg"></button>',
      nextArrow: '<button type="button" class="nextSlick"><img src="assets/images/icons/right-arrow.svg"></button>'
    });
  }

  if ($('.jsVideo').length > 0) {
    $('.jsVideo').slick({
      arrows: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: true,
      prevArrow: '<button type="button" class="prevSlickVideo"><img src="assets/images/icons/right-arrow.svg"></button>',
      nextArrow: '<button type="button" class="nextSlickVideo"><img src="assets/images/icons/right-arrow.svg"></button>',
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }

  if ($('.jsSVideo').length > 0) {
    $('.jsSVideo').slick({
      arrows: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: true,
      prevArrow: '<button type="button" class="prevSlickSVideo"><img src="assets/images/svideo_arrow.svg" alt=""></button>',
      nextArrow: '<button type="button" class="nextSlickSVideo"><img src="assets/images/svideo_arrow.svg" alt=""></button>',
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }

  new WOW().init();
  if ($('.stag').length > 0) {
    var word_list = [
      {text: "bookkeping services", link: {href: "#", target: "_blank"}, html: {"class": "tag tag17"}},
      {text: "hr outsourcing", link: {href: "#", target: "_blank"}, html: {"class": "tag tag4"}},
      {text: "virtual team", link: {href: "#", target: "_blank"}, html: {"class": "tag tag6"}},
      {text: "support small business", link: {href: "#", target: "_blank"}, html: {"class": "tag tag7"}},
      {text: "contact center", link: {href: "#", target: "_blank"}, html: {"class": "tag tag8"}},
      {text: "it support specialist", link: {href: "#", target: "_blank"}, html: {"class": "tag tag10"}},
      {text: "it outsourcing", link: {href: "#", target: "_blank"}, html: {"class": "tag tag11"}},
      {text: "remote bookkeeping", link: {href: "#", target: "_blank"}, html: {"class": "tag tag1"}},
      {text: "сall center software", link: {href: "#", target: "_blank"}, html: {"class": "tag tag12"}},
      {text: "dispatcher", link: {href: "#", target: "_blank"}, html: {"class": "tag tag29"}},
      {text: "answering service", link: {href: "#", target: "_blank"}, html: {"class": "tag tag18"}},
      {text: "helpdesk", link: {href: "#", target: "_blank"}, html: {"class": "tag tag25"}},
      {text: "inbound call center", link: {href: "#", target: "_blank"}, html: {"class": "tag tag3"}},
      {text: "it support", link: {href: "#", target: "_blank"}, html: {"class": "tag tag13"}},
      {text: "remote assistant", link: {href: "#", target: "_blank"}, html: {"class": "tag tag9"}},
      {text: "business services", link: {href: "#", target: "_blank"}, html: {"class": "tag tag14"}},
      {text: "office assistant", link: {href: "#", target: "_blank"}, html: {"class": "tag tag15"}},
      {text: "customer support", link: {href: "#", target: "_blank"}, html: {"class": "tag tag16"}},
      {text: "bookkeeping", link: {href: "#", target: "_blank"}, html: {"class": "tag tag28"}},
      {text: "backoffice", link: {href: "#", target: "_blank"}, html: {"class": "tag tag20"}},
      {text: "telesales", link: {href: "#", target: "_blank"}, html: {"class": "tag tag2"}},
      {text: "starting your business", link: {href: "#", target: "_blank"}, html: {"class": "tag tag21"}},
      {text: "telemarketing", link: {href: "#", target: "_blank"}, html: {"class": "tag tag22"}},
      {text: "24 hour customer service", link: {href: "#", target: "_blank"}, html: {"class": "tag tag5"}},
      {text: "tech support", link: {href: "#", target: "_blank"}, html: {"class": "tag tag23"}},
      {text: "front desk", link: {href: "#", target: "_blank"}, html: {"class": "tag tag19"}},
      {text: "bpo", link: {href: "#", target: "_blank"}, html: {"class": "tag tag24"}},
      {text: "virtual assistant", link: {href: "#", target: "_blank"}, html: {"class": "tag tag26"}},
      {text: "outsourcing", link: {href: "#", target: "_blank"}, html: {"class": "tag tag27"}},
    ];
    $(function () {
      $(".stag").jQCloud(word_list);
    });
  }

  $('.jsOpenCall').click(function () {
    $('.jsModalCall').fadeIn().css('display', 'flex');
    $('.jsModalCallInfo').fadeIn().css('display', 'flex');
  });

  $('.jsShowModalCallForm').click(function () {
    $('.jsModalCallForm').fadeIn().css('display', 'flex');
    $('.jsModalCallInfo').fadeOut(0);
  });

  $('.jsCloseModalCall').click(function () {
    $('.jsModalCall').fadeOut();
    $('.jsModalCallForm').fadeOut();
    $('.jsModalCallInfo').fadeOut();
  });

  $('.slast__block').hover(function () {
    $('.slast__item').removeClass('animated')
  });

});

$(document).ready(function () {
  if (window.innerWidth < 480 && $('.steps-main').length > 0) {
    $('.steps-main').slick({
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false
    });
  }
  if ($('.jsQuotes').length > 0) {
    $('.jsQuotes').slick({
      arrows: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      infinite: true,
      prevArrow: '<button type="button" class="prevSlickQuotes"><img src="assets/images/icons/right-arrow.svg"></button>',
      nextArrow: '<button type="button" class="nextSlickQuotes"><img src="assets/images/icons/right-arrow.svg"></button>',
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ]
    });
  }
  if ($('.owl-carousel').length > 0) {
    $('.owl-carousel').owlCarousel({
      center: true,
      loop:true,
      nav:true,
      navText: ['<i class="fa fa-angle-right"></i>', '<i class="fa fa-angle-right"></i>'],
      responsive : {
        0 : {
          items:1,
          margin:0,
        },
        993 : {
          items:3,
          margin:55,
        },
        1200 : {
          items:3,
          margin:130,
        }
      }
    });
  }

  if (window.innerWidth < 768) {
    let slideWidth =  $('.lsay-about__slider').width();
    $('.owl-item').css('max-width', slideWidth);
  }  else {
    $('.owl-item').css('max-width', 'none');
  }
  $( window ).resize(function() {
    if (window.innerWidth < 768) {
      let slideWidth =  $('.lsay-about__slider').width();
      $('.owl-item').css('max-width', slideWidth);
    } else {
      $('.owl-item').css('max-width', 'none');
    }
  });

  $('.btn_services-mob').next().hide();
  $('.btn_services-mob').click(function () {
    if ($(this).hasClass("open-services-mob")) {
      $('.btn_services-mob').removeClass('open-services-mob').next().slideUp();
    } else {
      $('.btn_services-mob.open-services-mob').not(this).removeClass('open-services-mob').next().slideUp();
      $(this).addClass('open-services-mob').next().slideToggle();
    }
  });
});

$(document).ready(function () {
  $('.video-btn-js').click(function () {
    $('.modal-video').addClass('modal-video-show');
  });
  $('.modal-video').click(function (e) {
    var block = $('.modal-video__content-js');
    if (!block.is(e.target) && block.has(e.target).length === 0 || $('.modal-video__btn-close-js').is(e.target)) {
      $('.modal-video').removeClass('modal-video-show');
      $('.modal-video__video');
      $('.modal-video__video').each(function () {
        this.pause();
      });
    }
  });

  $('.video-btn-js1').click(function () {
    $('.modal-video1').addClass('modal-video-show');
  });
  $('.modal-video1').click(function (e) {
    var block = $('.modal-video1__content-js');
    if (!block.is(e.target) && block.has(e.target).length === 0 || $('.modal-video1__btn-close-js').is(e.target)) {
      $('.modal-video1').removeClass('modal-video-show');
      $('.modal-video1__video');
      $('.modal-video1__video').each(function () {
        this.pause();
      });
    }
  });

  $('.video-btn-js2').click(function () {
    $('.modal-video2').addClass('modal-video-show');
  });
  $('.modal-video2').click(function (e) {
    var block = $('.modal-video2__content-js');
    if (!block.is(e.target) && block.has(e.target).length === 0 || $('.modal-video2__btn-close-js').is(e.target)) {
      $('.modal-video2').removeClass('modal-video-show');
      $('.modal-video2__video');
      $('.modal-video2__video').each(function () {
        this.pause();
      });
    }
  });

  $('.jsMobileMenu').click(function () {
    $('.jsMenu').toggleClass('menu-show');
  });
});
//# sourceMappingURL=script.js.map
