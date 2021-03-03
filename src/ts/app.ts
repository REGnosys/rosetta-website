/**
 * Utils.
 */

import { Ready } from './utils/ready'

/**
 * Layouts.
 */

import { Header } from './layouts/common/header'

/**
 * Components.
 */

import { LinkWithGraphics } from './components/link-with-graphics'
import { BodyCurves } from './components/body-curves'

/**
 * Effects.
 */

import { AnimatedIcons } from './effects/animated-icons'
import { ScrollsIntoView } from './effects/scolls-into-view'
import { NumberCountUp  } from './effects/number-count-up'

/**
 * App.
 */

export class App {

    /**
     * Layouts.
     */

    private header : Header
    
    /**
     * Components.
     */
    
    private linkWithGraphics : LinkWithGraphics
    private bodyCurves : BodyCurves
    
    /**
     * Effects.
     */

    private animatedIcons : AnimatedIcons
    private scrollsIntoView : ScrollsIntoView
    private numberCountUp : NumberCountUp

    /**
     * constructor.
     */

    constructor() {

        /**
         * Layouts.
         */

        this.header = new Header()

        /**
         * Components.
         */

        
        this.linkWithGraphics = new LinkWithGraphics()
        this.bodyCurves = new BodyCurves()
        
        /**
         * Effects.
         */

        this.animatedIcons = new AnimatedIcons()
        this.scrollsIntoView = new ScrollsIntoView()
        this.numberCountUp = new NumberCountUp()

    }

    /**
     * start.
     */

    start(): void {

        /**
         * When document is ready.
         */

        new Ready(() => {

            /**
             * Start components.
             */

            this.header.start()
            this.linkWithGraphics.start()
            this.bodyCurves.start()
            
            /**
             * Start effects.
             */

            this.scrollsIntoView.start()
            this.numberCountUp.start()
            // this.animatedIcons.start()

        })

    }

}
