# PointCrop

PointCrop allows to you dynamically crop images in the browser using a specified focus point that will always be centred within the image's parent container regardless of the container's dimensions. 

PointCrop is particularly useful in cropping images containing people. Traditionally you may have ended up with row of chest shots when using the centre of the image as the focal point, especially when going between widely differing aspect ratios. It's also a great solution for images that need to be resized or have their dimensions re-adjusted without loading a different file. It could even be used in instances where the displayed size is fluid, where it would be impractical to generate multiple versions on the fly.

## Usage

First include the contents of `jquery.pointcrop.css` in your CSS.

Next pass the pointCrop function an object of options and crop points where the url matches the src attribute of the image and x & y coordinates of the focal point are passed in as an array. The crop focus points are given as a ratio between `0` - `1`. For example the center of the image will be `[0.5, 0.5]`.

```js
$(selector).pointCrop({
  wrapperElement: 'div',
  onComplete: function() {},
  cropPoints: {
    'url': [x, y],
    'url': [x, y],
    'url': [x, y]
  }
});
```

## Examples

### Images cropped to focus points.

This is the most basic implementation, images are loaded into the browser and then cropped. Using PointCrop this way will mean visitors may see the uncropped image before the images are cropped.

HTML for images:

```html
<div class="image-wrapper">
  <img src="http://example.com/files/images/example-img1.png" alt="" />
</div>
<div class="image-wrapper">
  <img src="http://example.com/files/images/example-img2.png" alt="" />
</div>
<div class="image-wrapper">
  <img src="http://example.com/files/images/example-img3.jpg" alt="" />
</div>
<div class="image-wrapper">
  <img src="http://example.com/files/images/example-img4.jpg" alt="" />
</div>
<div class="image-wrapper">
  <img src="http://example.com/files/images/example-img5.png" alt="" />
</div>
```

CSS for images:

```css
.image-wrapper {
  height: 200px;
  overflow: hidden;
  width: 400px;
}

.image-wrapper img {
  display: block;
  position: relative;
}
```
    
Set the crop points:

```js
var cropPoints = {
  'http://example.com/files/images/example-img1.png': [0.3, 0.26],
  'http://example.com/files/images/example-img2.png': [0.7, 0.16],
  'http://example.com/files/images/example-img3.jpg': [0.5, 0.47],
  'http://example.com/files/images/example-img4.jpg': [0.9, 0.831],
  'http://example.com/files/images/example-img5.png': [0.345, 0.221]
};
```

Crop the images:

```js    
$('img').pointCrop({cropPoints: cropPoints});
```

### Images are hidden until cropped

A slightly more advanced implementation. Images are hidden initially then shown after they have been cropped to prevent visitors from seeing uncropped images.

HTML for images:

```html
<div class="image-wrapper">
  <img src="http://example.com/files/images/example-img1.png" alt="" />
</div>
<div class="image-wrapper">
  <img src="http://example.com/files/images/example-img2.png" alt="" />
</div>
<div class="image-wrapper">
  <img src="http://example.com/files/images/example-img3.jpg" alt="" />
</div>
<div class="image-wrapper">
  <img src="http://example.com/files/images/example-img4.jpg" alt="" />
</div>
<div class="image-wrapper">
  <img src="http://example.com/files/images/example-img5.png" alt="" />
</div>
```

CSS to hide images initially:

```css
.image-wrapper {
  height: 200px;
  overflow: hidden;
  width: 400px;
}

.image-wrapper img {
  display: block;
  position: relative;
  visibility: hidden;
}
```

Set the crop points:

```js
var cropPoints = {
  'http://example.com/files/images/example-img1.png': [0.3, 0.26],
  'http://example.com/files/images/example-img2.png': [0.7, 0.16],
  'http://example.com/files/images/example-img3.jpg': [0.5, 0.47],
  'http://example.com/files/images/example-img4.jpg': [0.9, 0.831],
  'http://example.com/files/images/example-img5.png': [0.345, 0.221]
};
```

Crop the images, then show them:

```js
$('img').pointCrop({cropPoints: cropPoints, onComplete: function() {
  // Fade the image in after it has been cropped.
  $(this).hide().css('visibility', 'visible').fadeIn(1000);
}});
```

## Options
<table border=1>
  <tr>
    <th>
      Property
    </th>
    <th>
      Default
    </th>
    <th>
      Description
    </th>
  </tr>
  <tr>
    <th>
    cropPoints
    </th>
    <td>
      <em>this is required</em>
    </td>
    <td>
      An object of crop points where the key is the src of the img and the value is an array of the x & y coords of the crop focus point as a ratio between 0 & 1.
    </td>
  </tr>
  <tr>
    <th>
      wrapperElement
    </th>
    <td>
      'div'
    </td>
    <td>
      The wrapper element surrounding the image(s) to be cropped. By default the parent div is selected.
    </td>
  </tr>
  <tr>
    <th>
      onComplete
    </th>
    <td>
      false
    </td>
    <td>
      A callback function that will be triggered for each cropped image after it has been cropped. This image is available within this callback as <em>this</em>.
    </td>
  </tr>
</table>

## License

The MIT License (MIT)

Copyright (c) 2012 Oxide Interactive http://www.oxideinteractive.com.au

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.