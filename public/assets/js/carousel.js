document.addEventListener( 'DOMContentLoaded', function() {
  var splide = new Splide( '.splide', {
    type   : 'slide',
    perPage : 3,
    perMove : 1,
    gap : '15px',
    width : 'min(1200px, 100% - 60px)',
    // rewind     : true,
    breakpoints: {
      992: {
        perPage: 2,
      }, 
      480: {
        perPage: 1,
        rewind : true,
      },
    }
  } );
  splide.mount();
  
} );

