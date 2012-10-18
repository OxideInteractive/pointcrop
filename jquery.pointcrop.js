/**
 * jQuery PointCrop 1.0
 *
 * Copyright 2012, Oxide Interactive (http://oxideinteractive.com.au)
 * Released under the MIT license
 *
 * http://pointcrop.com
 */

(function($) {

  $.fn.pointCrop = function(options) {
    return this.each(function() {
      var 
        opts = $.extend({}, $.fn.pointCrop.defaults, options),
        $this = $(this),
        $wrapper = $this.parents(opts.wrapperElement),
        file = $this.attr('src'),
        imgW = $this.width(),
        imgH = $this.height(),
        imgRatio = imgW / imgH,
        diff,
        ref,
        wrapperCentre;

      if ($this.data('processed')) {
        return;
      }

      wrapperRatio = $wrapper.width() / $wrapper.height();
      if (imgRatio > wrapperRatio) {
        // This 1 millisecond timeout is a fix for IE8.
        // Without this newWidth gets set to the incorrect value by width().
        setTimeout(function() {
          // Add class to apply css resizing.
          $this.addClass('pointcrop-landscape');
          // Get the x-axis focus point for this image.
          ref = opts.cropPoints[file][0];
          // Get the width of the image after it has been resized by the css.
          var newWidth = $this.width();
          // Get the focus point in pixels (of the resized image).
          var focus_x = ref * newWidth;
          // Get the centre of the wrapper div.
          wrapperCentre = $wrapper.width() / 2;
          // The amount to move the image to the left.
          diff = Math.round(wrapperCentre - focus_x);
          // Never move an image past the edge of the container.
          diff = Math.max(diff, $wrapper.width() - newWidth);
          // Never move an image the wrong way.
          if (diff > 0) {
            diff = 0;
          }

          if (opts.smart) {
            $this.css({left: diff + 'px'});
          }
        }, 1);
      }
      else {
        // This 1 millisecond timeout is a fix for IE8.
        // Without this newHeight gets set to the incorrect value by height().
        setTimeout(function() {
          // Add class to apply css resizing.
          $this.addClass('pointcrop-portrait');
          // Get the y-axis focus point for this image.
          ref = opts.cropPoints[file][1];
          // Get the width of the image after it has been resized by the css.
          var newHeight = $this.height();
          // Get the focus point in pixels (of the resized image).
          var focus_y = ref * newHeight;
          // Get the centre of the wrapper div.
          wrapperCentre = $wrapper.height() / 2;
          // The amount to move the image to the left.
          diff = Math.round(wrapperCentre - focus_y);
          // Never move an image past the edge of the container.
          diff = Math.max(diff, $wrapper.height() - newHeight);
          // Never move an image the wrong way.
          if (diff > 0) {
            diff = 0;
          }

          if (opts.smart) {
            $this.css({top: diff + 'px'});
          }
        }, 1);
      }

      $this.data('processed', true);

      // Allow callers to run code on completion.
      if (opts.onComplete) {
        opts.onComplete.call(this);
      }
    });
  };
  $.fn.pointCrop.defaults = {
    smart: true,
    wrapperElement: 'div',
    onComplete: false
  };

})(jQuery);
