/**
 * 
 */

import easydropdown from 'easydropdown'

/**
 * Forms.
 */

export class BasicForms {

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

        const selects : NodeListOf<HTMLElement> = document.querySelectorAll('select')

        /**
         * 
         */

        if (selects.length) {

            /**
             * 
             */

            selects.forEach((el : HTMLSelectElement) => {

                /**
                 * 
                 */

                easydropdown(el)

            })

        }

    }

}
