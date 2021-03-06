/**
 * Utils.
 */

import { Ready } from './utils/ready'

/**
 * Layouts.
 */

import { Header } from './layouts/common/header'
import { CoreDiagram } from './layouts/pages/governance-core-diagram'
import { HeaderSubNavigation } from './layouts/common/header-sub-navigation'

/**
 * Components.
 */

import { LinkWithGraphics } from './components/link-with-graphics'
import { BodyCurves } from './components/body-curves'
import { GraphicHeaders } from './components/graphic-headers'
import { BasicForms } from './components/basic-forms'

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
    private headerSubNavigation : HeaderSubNavigation

    /**
     * Components.
     */
    
    private linkWithGraphics : LinkWithGraphics
    private bodyCurves : BodyCurves
    private graphicHeaders : GraphicHeaders
    private basicForms : BasicForms

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
        this.coreDiagram = new CoreDiagram()
        this.headerSubNavigation = new HeaderSubNavigation()
        
        /**
         * Components.
         */
        
        this.linkWithGraphics = new LinkWithGraphics()
        this.bodyCurves = new BodyCurves()
        this.graphicHeaders = new GraphicHeaders()
        this.basicForms = new BasicForms()

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
            this.headerSubNavigation.start()

            /**
             * Start components.
             */

            this.linkWithGraphics.start()
            this.bodyCurves.start()
            this.graphicHeaders.start()
            this.basicForms.start()

            /**
             * Start effects.
             */

            this.scrollsIntoView.start()
            this.numberCountUp.start()
            // this.animatedIcons.start()

        })

    }

}
