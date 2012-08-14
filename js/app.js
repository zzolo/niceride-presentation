/**
 * Main slide logic
 */

(function($, window, undefined) {
  var Slide = Backbone.Model.extend({
  });

  var Slides = Backbone.Collection.extend({
  });

  var SlideApp = Backbone.View.extend({
    slideCount: 0,
    slides: [],
    currentSlide: 0,
    el: 'body',
    
    events: {
      'click': 'nextSlide',
    },
    
    initialize: function() {
      this.slides = new Slides;
      this.gatherSlides();
      this.showCurrentSlide();
      
      _.bindAll(this, 'handleKeys');
      $(this.el).bind('keydown', this.handleKeys);
    },
    
    gatherSlides: function() {
      var thisApp = this;
      var slide;
      $('#slides .slide').each(function() {
        slide = new Slide;
        slide.set('el',  $(this));
        slide.set('slideNum',  thisApp.slideCount);
        thisApp.slides.add(slide);
        thisApp.slideCount++;
      });
      return this;
    },
    
    handleKeys: function(e) {
      if (e.keyCode === 39) {
        this.previousSlide();
      }
      if (e.keyCode === 37) {
        this.nextSlide();
      }
    },
    
    showCurrentSlide: function() {
      this.showSlide(this.currentSlide);
    },
    
    nextSlide: function() {
      this.currentSlide++;
      
      if (this.currentSlide >= this.slideCount) {
        this.currentSlide = 0;
      }
      this.showSlide(this.currentSlide);
    },
    
    previousSlide: function() {
      this.currentSlide--;
      
      if (this.currentSlide < 0) {
        this.currentSlide = this.slideCount;
      }
      this.showSlide(this.currentSlide);
    },
    
    showSlide: function(slide) {
      var slideToShow;
      
      if (_.isNumber(slide) && slide !== NaN) {
        slideToShow = this.slides.where({ slideNum: slide });
        if (!_.isEmpty(slideToShow)) {
          $('#current-slide-container').html(_.template(slideToShow[0].get('el').html(), {}));
        }
      }
    }
  });

  $(document).ready(function() {
    var slideApp = new SlideApp();
  });
})(jQuery, window);