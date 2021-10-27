/**
 * 
 */

import { SVGInjector } from '@tanem/svg-injector'

/**
 * LinkWithGraphics.
 */

export class LinkWithGraphics {

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

        SVGInjector(document.querySelectorAll('.link-with-graphic i img'), {
            cacheRequests: false,
            evalScripts: 'once',
            renumerateIRIElements: false,
        })

    }

}
