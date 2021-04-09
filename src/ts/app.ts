/**
 * Utils.
 */

import { Ready } from './utils/ready'

/**
 * Layouts.
 */

import { Header } from './layouts/common/header'
import { CoreDiagram } from './layouts/pages/governance-core-diagram'

/**
 * Components.
 */

import { LinkWithGraphics } from './components/link-with-graphics'
import { BodyCurves } from './components/body-curves'
import { GraphicHeaders } from './components/graphic-headers'

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
    private coreDiagram : CoreDiagram

    /**
     * Components.
     */
    
    private linkWithGraphics : LinkWithGraphics
    private bodyCurves : BodyCurves
    private graphicHeaders : GraphicHeaders

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
        this.graphicHeaders = new GraphicHeaders()
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
             * Start layouts.
             */

            this.coreDiagram.start()

            /**
             * Start components.
             */

            this.linkWithGraphics.start()
            this.bodyCurves.start()
            this.graphicHeaders.start()
            /**
             * Start effects.
             */

            this.scrollsIntoView.start()
            this.numberCountUp.start()
            // this.animatedIcons.start()

        })

    }

}
