/**
 * UrlHash.
 */

export class UrlHash {

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

        var search : string = window.location.search

        /**
         * 
         */

        if (search != '') {

            /**
             * 
             */

            let idTarget : string = search.replace('?panel=', '')

            /**
             * 
             */

            if (idTarget != '') {

                /**
                 * 
                 */

                setTimeout(() => {

                    /**
                     * 
                     */

                    const targetElement : HTMLElement = document.querySelector('#' + idTarget)

                    /**
                     * 
                     */

                    if (targetElement) {

                        /**
                         * 
                         */

                        const rect : DOMRect = targetElement.getBoundingClientRect()

                        /**
                         * 
                         */

                        window.scrollTo(0, rect.top - 150)

                    }

                }, 1000)

            }

        }

    }

}
