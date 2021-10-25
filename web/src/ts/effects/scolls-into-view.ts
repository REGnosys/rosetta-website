/**
 * 
 */

import scrollama from 'scrollama'

/**
 * ScrollsIntoView.
 */

export class ScrollsIntoView {

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
         * 
         */

        const scroller = scrollama()

        /**
         *
         */

        scroller
            .setup({
                step: '.scrolls-into-view',
                offset: 0.9
            })
            .onStepEnter(response => {

                // { element, index, direction }

                /**
                 *
                 */

                response.element.classList.add('entered-view')

            })
            .onStepExit(response => {

                // { element, index, direction }

            })
        
        /**
         *
         */

        window.addEventListener('resize', scroller.resize)

    }

}
