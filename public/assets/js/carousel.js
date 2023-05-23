$(document).ready(function () {
  $(".center").slick({
    centerMode: true,
    centerPadding: "0px",
    dots: true,
    slidesToScroll: 1,
    slidesToShow: 5,
    prevArrow:
      '<span class="priv_arrow"> <i class="fa fa-chevron-left" aria-hidden="true"></i></span>',
    nextArrow:
      '<span class="next_arrow"> <i class="fa fa-chevron-right" aria-hidden="true"></i></span>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  });
});
