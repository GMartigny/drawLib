/**
 * A rectangular shape
 * @extends Polygon
 * @param {Position|Shape} startPoint - Position of the upper-left corner
 * @param {Number} width - Width of the rectangle
 * @param {Number} height - Height of the rectangle
 * @param {Object} options - Specific options for this shape
 * @constructor
 * @constructs
 */
function Rectangle (startPoint, width, height, options) {
    Utils.assertLength(arguments, 2);

    this.startPoint = Position.createFrom(startPoint);
    this.endPoint = new Position(this.startPoint.getX() + width, this.startPoint.getY() + height);

    Polygon.call(this, [this.startPoint, this.endPoint], options);
}
/**
 * Create a rectangle between two point
 * @param {Position|Shape} from - Top-left point
 * @param {Position|Shape} to - Bottom-right point
 * @param {Object} options - Specific options for this shape
 * @return {Rectangle}
 */
Rectangle.fromPointToPoint = function(from, to, options) {
    var rect = new Rectangle(from, 0, 0, options);
    rect.endPoint = Position.createFrom(to);
    rect.isLinkedToOthers = true;
    return rect;
};
Utils.extends(Rectangle, Polygon, /** @lends Rectangle */ {
    /**
     * Trace the rectangle
     * @override Shape.trace
     * @param {CanvasRenderingContext2D} ctx - A drawing context
     * @memberOf Rectangle#
     */
    trace: function(ctx) {
        ctx.rect(this.startPoint.getX(), this.startPoint.getY(),
        this.endPoint.getX() - this.startPoint.getX(),
        this.endPoint.getY() - this.startPoint.getY()
        );
    },
    /**
     *
     * @param {Number} value -
     * @return {Rectangle} Itself
     * @memberOf Rectangle#
     */
    setWidth: function(value) {
        this.endPoint.setX(this.startPoint.getX() + value);
        return this;
    },
    /**
     *
     * @param {Number} value -
     * @return {Rectangle} Itself
     * @memberOf Rectangle#
     */
    setHeight: function(value) {
        this.endPoint.setY(this.startPoint.getY() + value);
        return this;
    },
    width: function() {
        return Line.prototype.width.call(this);
    },
    height: function() {
        return Line.prototype.height.call(this);
    }
});
