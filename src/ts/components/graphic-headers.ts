/**
 * 
 */

import { SVGInjector } from '@tanem/svg-injector'

/**
 * GraphicHeaders.
 */

export class GraphicHeaders {

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

        SVGInjector(document.querySelectorAll('.graphic-header .graphic-header__curve'), {
            cacheRequests: false,
            evalScripts: 'once',
            renumerateIRIElements: false,
        })

    }

}
