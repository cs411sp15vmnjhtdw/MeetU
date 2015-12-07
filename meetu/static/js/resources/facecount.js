(function($, cascade, ccv) {
    $.fn.faceCount = function(callback) {
        return this.each(function() {
            var self = $(this);
            var source = new Image();
            source.src = self.attr("src");
            source.crossOrigin = self.attr("crossorigin");
            var canvas = ccv.pre(source);
            canvas = ccv.grayscale(canvas);

            faces = ccv.detect_objects({
                canvas: canvas,
                cascade: cascade,
                interval: 4,
                min_neighbors: 1
            });

            data = []

            if (faces.length === 1) {
                data.validPhoto = true;
                data.message = "valid picture";
            } else if (faces.length < 1) {
                data.validPhoto = false;
                data.message = "no face found";
            } else {
                console.log(faces.length, 'faces detected')
                data.validPhoto = false;
                data.message = "more than 1 face detected";
            }
            callback.complete.apply(self, [data]);
        });

    };
})(jQuery, cascade, ccv);