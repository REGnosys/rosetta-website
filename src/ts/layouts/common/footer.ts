/**
 * 
 */

import { SVGInjector } from '@tanem/svg-injector'

/**
 * Footer.
 */

export class Footer {

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

        SVGInjector(document.querySelectorAll('.page-footer__social-list i img'), {
            cacheRequests: false,
            evalScripts: 'once',
            renumerateIRIElements: false,
        })

    }

}
