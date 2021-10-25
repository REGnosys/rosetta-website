/**
 * 
 */
 
import { CountUp } from 'countup.js'
import scrollama from 'scrollama'

/**
 * NumberCountUp.
 */

export class NumberCountUp {

    /**
     * Private members.
     */

    private selector: string = '.count-up'
    private scroller: scrollama.ScrollamaInstance

    /**
     * constructor.
     */

    constructor() {

        /**
         * Create a new instance of scrollama.
         */

        this.scroller = scrollama()

    }

    /**
     * start.
     */

    start(): void {

        /**
         * Configure the elements on the page.
         */

        this.configureElementsOnPage()

        /**
         * Configure scrollama to catch the elements
         * when they appear on the page.
         */

        this.configureScrollama()

    }

    /**
     * configureScrollama.
     */

    configureScrollama() {

        /**
         *
         */

        this.scroller
            .setup({
                step: this.selector,
                offset: 0.9,
                once: true
            })
            .onStepEnter(response => {

                /**
                 * When the element enters the screen, animate
                 * up the numbers.
                 */

                this.animateNumber(response.element)

            })

    }

    /**
     * configureElementsOnPage.
     */

    configureElementsOnPage() {

        /**
         * Find all elements with the class.
         */

        const nodeList : NodeList = document.querySelectorAll(this.selector)

        /**
         * Provided we found some.
         */

        if (nodeList.length) {

            /**
             * Run through the NodeList item.
             */

            nodeList.forEach(el => {

                /**
                 * 
                 */

                const element: HTMLElement = el as HTMLElement
                const valueElement: HTMLElement = element.querySelector('.value')
                const sTargetValue: string = valueElement.innerText

                /**
                 * Set a new attribute on the element which
                 * will contain the value we wish to count
                 * up to.
                 */

                element.setAttribute('starting-value', sTargetValue)

                /**
                 * Make the value element blank and the element invisible.
                 */

                valueElement.innerHTML = "&nbsp;"
                element.style.opacity = '0'

            })

        }

    }

    /**
     * animateNumber.
     */

    animateNumber(element: HTMLElement) {

        /**
         * Variables.
         */

        const valueElement: HTMLElement = element.querySelector('.value')
        const sTargetValue: string = element.getAttribute('starting-value')
        const nTargetValue: number = Number(sTargetValue)

        /**
         * Initial decimal place position, i.e. none.
         */

        var decimalPlaces = 0

        /**
         * Check if there is a decimal place.
         */

        if (sTargetValue.indexOf('.') != -1) {
            const split = sTargetValue.split('.')
            decimalPlaces = split[split.length - 1].length
        }

        /**
         * Make the element visible.
         */

        element.style.opacity = '1'

        /**
         * Create a new countup.js instance.
         */

        const countUp = new CountUp(valueElement, nTargetValue, {
            startVal: 0,
            separator: '',
            decimalPlaces: decimalPlaces
        })

        /**
         * Run if there were no errors.
         */

        if (!countUp.error) countUp.start()
        if (countUp.error)  console.error(countUp.error)

    }

}
