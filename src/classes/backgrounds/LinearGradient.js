/**
 * A linear gradient background
 * @extends Background
 * @param {Number} [angle=0] - The gradient orientation
 * @param {GradientParams} params - The gradient definition
 * @constructor
 */
function LinearGradient (angle, params) {
    if (isNaN(+angle) && LinearGradient.orientation[angle] !== undefined) {
        angle = LinearGradient.orientation[angle];
    }
    this.angle = +angle || 0;
    this.params = params;
}
/**
 * Enum for linear gradient orientation
 * @enum {Number}
 * @readonly
 */
LinearGradient.orientation = {
    toRight: 0,
    toBottomRight: 45,
    toBottom: 90,
    toBottomLeft: 135,
    toLeft: 180,
    toTopRight: -45,
    toTop: -90,
    toTopLeft: -135
};
Utils.extends(LinearGradient, Background, {
    /**
     * Build the gradient
     * @param {CanvasRenderingContext2D} ctx - A drawing context
     * @param {Shape} shape - The holding shape
     * @return {CanvasGradient}
     * @memberOf LinearGradient#
     */
    getStyle: function(ctx, shape) {
        var width = shape.width(ctx) / 2;
        var height = shape.height(ctx) / 2;
        var posX = shape.position.getX();
        var posY = shape.position.getY();

        var xComp = Utils.cos(this.angle * Utils.PI / 180);
        var yComp = Utils.sin(this.angle * Utils.PI / 180);

        var gradient = ctx.createLinearGradient(posX - (width * xComp), posY - (height * yComp), posX + (width * xComp), posY + (height * yComp));

        for (var stop in this.params) {
            if (this.params.hasOwnProperty(stop)) {
                gradient.addColorStop(stop / 100, this.params[stop]);
            }
        }

        this.style = gradient;

        return this._getStyle();
    },
    /**
     * Get CSS string for this background
     * @returns {string}
     * @memberOf LinearGradient#
     */
    getCSS: function() {
        var css = "linear-gradient(" + (this.angle+90) + "deg, ";

        var stops = [];
        for (var stop in this.params) {
            if (this.params.hasOwnProperty(stop)) {
                stops.push(this.params[stop] + " " + stop + "%");
            }
        }
        css += stops.join(", ") + ")";
        
        return css;
    }
});
