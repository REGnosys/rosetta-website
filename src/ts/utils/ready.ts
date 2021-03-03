/**
 * Ready.
 */

export class Ready {

    /**
     * constructor.
     */
    
    constructor(fn: () => void) {

        /**
         * Check the document state.
         */

        if (document.readyState != 'loading') {

            /**
             * Call the callback immediately if we're done loading.
             */

            fn()

        } else {

            /**
             * Add event listener.
             */

            document.addEventListener('DOMContentLoaded', fn)

        }

    }

}
