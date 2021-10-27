/**
 * 
 */

import { fabric } from "fabric"

/**
 * BodyCurves.
 */

export class BodyCurves {

    /**
     * 
     */

    private curves : Curve[] = []

    /**
     * constructor.
     */

    constructor() {

    }

    /**
     * start.
     */

    start(): void {

        /**
         * Create an array of canvses from the page.
         */

        const canvasElements : HTMLCanvasElement[] = Array.prototype.slice.apply(
            document.querySelectorAll('.body-curve canvas')
        )

        /**
         * Run through each of the found curves on the page.
         */

        canvasElements.forEach(canvasElement => {

            /**
             * 
             */

            const curve = new Curve(
                canvasElement, 
                canvasElement.getAttribute('data-top-shape-svg-url'),
                canvasElement.getAttribute('data-bottom-shape-svg-url'),
                canvasElement.getAttribute('data-primary-color'),
                canvasElement.getAttribute('data-secondary-color')
            )

            /**
             *
             */

            this.curves.push(curve)

        })

        /**
         * Add a resize listener to resize the cavases
         * when the window resizes.
         */

        window.addEventListener('resize', () => {
            this.curves.forEach(c => c.onWindowResized())
        })
        
    }

}

/**
 * Curve.
 */

class Curve {

    /**
     * Private variables.
     */

    private canvasEl        : HTMLCanvasElement
    private fabricCanvas    : fabric.StaticCanvas
    private parentEl        : HTMLElement
    private contentEl       : HTMLElement
    private shapeTop        : fabric.Group | fabric.Object
    private shapeBottom     : fabric.Group | fabric.Object
    private spaceFillerRect : fabric.Rect
    private svgLoadCount    : number = 0
    private primaryColor    : string
    private secondaryColor  : string

    /**
     * constructor.
     */

    constructor(
        canvasEl          : HTMLCanvasElement,
        svgShapeTopUrl    : string,
        svgShapeBottomUrl : string,
        primaryColor      : string,
        secondaryColor    : string
    ) {

        /**
         * Store the canvas element.
         */

        this.canvasEl = canvasEl

        /**
         * Store colors.
         */

        this.primaryColor = primaryColor
        this.secondaryColor = secondaryColor

        /**
         * Create a new fabric canvas object.
         */

        this.fabricCanvas = new fabric.StaticCanvas(this.canvasEl)

        /**
         * Set the background color of the canvas; used for debugging.
         */

        // this.fabricCanvas.setBackgroundColor('#0000ff', () => {})

        /**
         * Grab and store the parent element of the canvas, 
         * this is a div that wraps the canvas object.
         */

        this.parentEl = canvasEl.parentElement

        /**
         * Find the element which tells us the height of the content.
         * This is a div with the class of '.body-curve-content'.
         * It sits outside of the canvas wrapper.
         */

        this.contentEl = this
            .parentEl
            .parentElement
            .querySelector('.body-curve-content')

        /**
         *
         */

        this.loadSVGs(svgShapeTopUrl, svgShapeBottomUrl)

    }

    /**
     * loadSVGs.
     */

    loadSVGs(svgShapeTopUrl : string, svgShapeBottomUrl : string): void {

        /**
         * Load top svg.
         */

        fabric.loadSVGFromURL(svgShapeTopUrl, (objects, options) => {
            this.shapeTop = fabric.util.groupSVGElements(objects, options)
            this.onSVGLoaded()
        })

        /**
         * Load bttom svg.
         */

        fabric.loadSVGFromURL(svgShapeBottomUrl, (objects, options) => {
            this.shapeBottom = fabric.util.groupSVGElements(objects, options)
            this.onSVGLoaded()
        })

    }

    /**
     * onSVGLoaded.
     */

    onSVGLoaded(): void {

        /**
         *
         */

        this.svgLoadCount++

        /**
         *
         */

        if (this.svgLoadCount == 2) this.onAllSVGsLoaded()

    }

    /**
     * onAllSVGsLoaded.
     */

    onAllSVGsLoaded() : void {

        /**
         * Add the SVG elements to the canvas.
         */

        this.fabricCanvas.add(this.shapeTop)
        this.fabricCanvas.add(this.shapeBottom)

        /**
         *
         */

        this.colorizeShapes()

        /**
         *
         */

        this.refresh()

        /**
         * Forces a delayed refresh incase elements 
         * on the page haven't fully loaded.
         */

        setTimeout(() => {
            this.refresh()
        }, 500)

    }

    /**
     * onWindowResized.
     */

    onWindowResized(): void {

        /**
         *
         */

        this.refresh()

    }

    /**
     * refresh.
     */

    refresh(): void {
        /**
         *
         */

        this.resizeShapes()

        /**
         *
         */

        this.resizeCanvas()

        /**
         * 
         */

        this.applyMargin()

        /**
         *
         */

        this.repositionShapes()

        /**
         *
         */

        this.fillGapBetweenShapes()

        /**
         * Repaint.
         */

        this.fabricCanvas.renderAll()

    }

    /**
     * applyMargin.
     */

    applyMargin() {

        /**
         * Grab the values from the object attributes.
         */

        const topMarginPercentageOfTopShapeHeight: Number = new Number(this.canvasEl.getAttribute('data-margin-top-percentage-of-top-shape-height'))
        const bottomMarginPercentageOfBottomShapeHeight: Number = new Number(this.canvasEl.getAttribute('data-margin-bottom-percentage-of-bottom-shape-height'))

        /**
         * Calculate the actual amount of pixels for the top and bottom margin
         * based of the percentage of respective heights of each top and bottom shape.
         */

        const marginTop: string = Math.round( this.shapeTop.getScaledHeight() * (topMarginPercentageOfTopShapeHeight as number) ) + 'px'
        const marginBotom: string = Math.round( this.shapeBottom.getScaledHeight() * (bottomMarginPercentageOfBottomShapeHeight as number) ) + 'px'

        /**
         * Apply the margins.
         */

        this.parentEl.parentElement.style.marginTop = marginTop
        this.parentEl.parentElement.style.marginBottom = marginBotom

    }

    /**
     * resizeCanvas.
     */

    resizeCanvas(): void {

        /**
         * Fetch the top shape offset and calculate the number
         * of pixels we need to set as the top css value.
         */

        const topShapeYOffsetPercentage: Number = new Number(this.canvasEl.getAttribute('data-top-shape-y-offset-percentage'))
        const topShapeScaledHeight: number      = Math.round( this.shapeTop.getScaledHeight() )
        const topShapeTop: number               = Math.round( topShapeScaledHeight * (topShapeYOffsetPercentage as number) )

        /**
         * Grab the height of the div that houses the content. 
         * This is used as the actual height of the content.
         */

        const contentElHeight : number = Math.round( parseFloat(getComputedStyle(this.contentEl, null).height.replace("px", "")) )

        /**
         * Assign the top css value.
         */

        this.parentEl.style.top = '-' + topShapeTop + 'px'

        /**
         * Now fetch the bottom percentage and calculate the value.
         */

        const bottomShapeYOffsetPercentage: Number = new Number(this.canvasEl.getAttribute('data-bottom-shape-y-offset-percentage'))
        const bottomShapeScaledHeight: number      = Math.round( this.shapeBottom.getScaledHeight() )       
        const bottomShapeBottom: number            = Math.round( bottomShapeScaledHeight * (bottomShapeYOffsetPercentage as number) )
        /**
         * Assign the bottom css value.
         */

        this.parentEl.style.bottom = '-' + bottomShapeBottom + 'px'

        /**
         * Grab the width and height of the parent element. This is the width
         * of the curve wrapper, which will be the full width of the browser.
         * 
         */

        const parentElWidth : number = Math.round( parseFloat(getComputedStyle(this.parentEl, null).width.replace("px", "")) )
        const parentElHeight : number = Math.round( parseFloat(getComputedStyle(this.parentEl, null).height.replace("px", "")) )

        /**
         * 
         */

        this.fabricCanvas.setWidth(parentElWidth)
        this.fabricCanvas.setHeight(parentElHeight)

    }

    /**
     * resizeShapes.
     */
    
    resizeShapes(): void {

        /**
         *
         */

        const parentElWidth : number = Math.round( parseFloat(getComputedStyle(this.parentEl, null).width.replace("px", "")) )

        /**
         * We assign an additional 10 pixels, so that we can have 5 pixels overflow
         * on the left, and 5 pixels overflow on the right. See repositionShapes for
         * more info.
         */

        this.shapeTop.scaleToWidth(parentElWidth + 10, true)
        this.shapeBottom.scaleToWidth(parentElWidth + 10, true)

    }

    /**
     * colorizeShapes.
     */

    colorizeShapes(): void {

        /**
         * shapeTop.
         */

        if   (this.shapeTop.type == 'group') { this.colorizeShapeGroup(<fabric.Group>this.shapeTop) }
        else { this.colorizeShapeObject(<fabric.Object>this.shapeTop) }

        /**
         * shapeBottom.
         */

        if (this.shapeBottom.type == 'group') { this.colorizeShapeGroup(<fabric.Group>this.shapeBottom) }
        else { this.colorizeShapeObject(<fabric.Object>this.shapeBottom) }

    }

    /**
     * colorizeShapeGroup.
     */

    colorizeShapeGroup(shape: fabric.Group): void {

        /**
         * 
         */

        let index : number = 1

        /**
         * For each appears to loop backwards, hence then
         * index == 2 is the primary color, and index == 1
         * is the secondary color.
         */

        shape.forEachObject((obj : fabric.Object) => {

            /**
             *
             */

            if (index == 2)      { obj.fill = this.primaryColor } 
            else if (index == 1) { obj.fill = this.secondaryColor }

            /**
             *
             */
            
            index++

        })

    }

    /**
     * colorizeShapeObject.
     */

    colorizeShapeObject(shape: fabric.Object): void {
        shape.fill = this.primaryColor
        shape.strokeWidth = 0
    }    

    /**
     * repositionShapes.
     */

    repositionShapes(): void {

        /**
         * We set the left value to -5 to ensure that we completely cover
         * the full width of the canvas and there is no chance of having
         * a pixel white line down the side.
         */

        this.shapeTop.set({
            top: 0,
            left: -5
        })

        /**
         * Subtract 1 from our value to ensure we do not clip off the bottom.
         */

        let newShapeBottomTop : number = Math.ceil(this.fabricCanvas.getHeight() - this.shapeBottom.getScaledHeight()) - 1
        
        /**
         *
         */

        this.shapeBottom.set({
            top: newShapeBottomTop,
            left: -5
        })

        /**
         * Extremely important for some reason, otherwise the bottom
         * shape does not get rendered when the browser is scaled
         * down by over ~50px AND the shape is below a certain height.
         */

        this.shapeBottom.setCoords()

    }

    /**
     * fillGapBetweenShapes.
     */

    fillGapBetweenShapes() : void {

        /**
         *
         */

        if (! this.spaceFillerRect) {

            /**
             *
             */

            this.spaceFillerRect = new fabric.Rect({
                left   : 0,
                top    : 0,
                width  : 0,
                height : 0,
                // fill   : 'rgba(255,0,0,0.8)',
                fill: this.primaryColor
            })

            /**
             *
             */

            this.fabricCanvas.add(this.spaceFillerRect)

        }

        /**
         *
         */
        
        this.spaceFillerRect.set({
            left: -5,
            top: this.shapeTop.top + this.shapeTop.getScaledHeight() - 5,
            width: this.fabricCanvas.getWidth() + 5,
            height: this.shapeBottom.top - (this.shapeTop.top + this.shapeTop.getScaledHeight()) + 10
        })

    }

}
