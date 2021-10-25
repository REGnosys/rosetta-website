/**
 * 
 */

import scrollama from 'scrollama'

/**
 * Header.
 */

export class Header {

    /**
     * 
     */

    private header : HTMLElement
    private scroller : scrollama.ScrollamaInstance

    /**
     * constructor.
     */

    constructor() {

        /**
         * 
         */

        this.header = document.querySelector('.page-header')

        /**
         * 
         */

        this.scroller = scrollama()
        window.addEventListener('resize', this.scroller.resize)

    }

    /**
     * start.
     */

    start(): void {

        /**
         *
         */

        this.scroller
            .setup({
                step: '.mini-header-trigger',
                offset: 0.1
            })
            .onStepEnter(response => {

                /**
                 * 
                 */

                if (response.direction == 'down') this.header.classList.add('mini')
                if (response.direction == 'up') this.header.classList.remove('mini') 

            })
            .onStepExit(response => {

                /**
                 * 
                 */

            })

    }

}
