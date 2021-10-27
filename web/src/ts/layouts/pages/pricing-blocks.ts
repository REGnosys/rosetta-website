/**
 * 
 */

import Velocity, { VelocityElements } from "velocity-animate"

/**
 * PricingBlocks.
 */
 
export class PricingBlocks {
     
    /**
     * Private variables.
     */

    private pricingBlocks : NodeListOf<HTMLElement>

    /**
     * constructor.
     */
 
    constructor() {
 
        /**
         * 
         */

    }
 
    /**
     * start.
     */
 
    start(): void {
 
        /**
         * 
         */

        this.pricingBlocks = document.querySelectorAll('.pricing-block')

        /**
         * 
         */

        if (this.pricingBlocks.length) {

            /**
             * 
             */

            this.configureExpandableBlocks()
            this.configureExpandableRows()
            
        }
 
    }
 
    /**
     * configureExpandableBlocks.
     */

    configureExpandableBlocks(): void {
        
        /**
         * 
         */

        var blockExpanderButtons : NodeListOf<HTMLElement> = document.querySelectorAll('.pricing-block .block-expander')

        /**
         * 
         */

        blockExpanderButtons.forEach(element => {

            /**
             * 
             */

            let block : HTMLElement = this.findAncestor(element, 'pricing-block')
            let body : HTMLElement = block.querySelector('.pricing-block__body')

            /**
             * 
             */

            element.addEventListener('click', (mv) => {
                if (element.classList.contains('expanded')) {

                    /**
                     * 
                     */

                    element.classList.remove('expanded')
                    
                    /**
                     * 
                     */

                    body.style.overflow = 'hidden'

                    /**
                     * 
                     */

                    Velocity(body as VelocityElements, {
                        "height" : 0,
                        "opacity" : 0
                    }, {
                        duration: 600,
                        easing: "ease-in",
                    })

                } else {

                    /**
                     *
                     */

                    element.classList.add('expanded')
                    
                    /**
                     * Set the styles on the `body` element so that
                     * it renders invisibly at full height - this
                     * allows us to get the full height of the element
                     * so we can use it to slide down. Because we hid
                     * the element the user will not see anything
                     * visually odd.
                     */

                    body.style.visibility = 'hidden'
                    body.style.position   = 'absolute'
                    body.style.display    = 'block'
                    body.style.overflow   = 'visible'
                    body.style.height     = 'auto'

                    /**
                     * Grab the height.
                     */

                    let height : number = body.offsetHeight

                    /**
                     * Make the `body` element visible again.
                     * Although set it's opacity to 0 so we 
                     * can fade it up.
                     */

                    body.style.visibility = 'visible'
                    body.style.position = 'relative'
                    body.style.height = '0'
                    body.style.opacity = '0'

                    /**
                     *
                     */

                    Velocity(body as VelocityElements, {
                        "height" : height,
                        "opacity" : 1
                    }, {
                        duration: 600,
                        easing: "ease-out",
                    })

                }
                mv.preventDefault()
                return false
            })

        })

    }

    /**
     * 
     */

    findAncestor(el : HTMLElement, className : string): HTMLElement {
        while ((el = el.parentElement) && !el.classList.contains(className));
        return el;
    }

    /**
     * configureExpandableRows.
     */

    configureExpandableRows(): void {

        /**
         * 
         */

        var expandableRows : NodeListOf<HTMLElement> = document.querySelectorAll('.pricing-block__body-row-header--expandable')

        /**
         * 
         */

        expandableRows.forEach(element => {

            /**
             * 
             */
            
            var targetContent : HTMLElement = element.parentElement.querySelector('.pricing-block__body-row-body')

            /**
             * 
             */

            element.addEventListener('click', (mv) => {
                if (element.classList.contains('expanded')) {
                    element.classList.remove('expanded')
                    targetContent.classList.remove('expanded')
                } else {
                    element.classList.add('expanded')
                    targetContent.classList.add('expanded')
                }
                return false
            })

        })

    }
 
}
 