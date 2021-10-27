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
         * Find all elements with the class.
         */

        const nodeList : NodeList = document.querySelectorAll('.scrolls-into-view')

        /**
         * 
         */

        if (nodeList.length == 0)
            return

        /**
         *
         */

        scroller
            .setup({
                step: '.scrolls-into-view',
                offset: 0.9
            })
            .onStepEnter(response => {

                /**
                 *
                 */

                response.element.classList.add('entered-view')

            })
            .onStepExit(response => {

                /**
                 * 
                 */

            })
        
        /**
         *
         */

        window.addEventListener('resize', scroller.resize)

    }

}
