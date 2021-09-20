/**
 * KeyShapeDocumentContent.
 */

interface KeyShapeDocumentContent extends Document {
    ks: any,
    parentObject: KeyShapeHTMLObjectElement
}

/**
 * KeyShapeHTMLObjectElement.
 */

interface KeyShapeHTMLObjectElement extends HTMLObjectElement {
    playAnimation: () => void
}

/**
 * AnimatedIcons.
 */

export class AnimatedIcons {

    /**
     * 
     */

    public icons : Array<KeyShapeHTMLObjectElement>
    
    /**
     * constructor.
     */

    constructor() {

        /**
         *
         */

        this.icons = new Array()

    }

    /**
     * registerAnimatedIcon.
     */

    registerAnimatedIcon(obj : KeyShapeHTMLObjectElement) {

        /**
         * Return early if this icon has already been added to the list.
         * This could happen when a 'load' triggers this function, or
         * a timeout triggers it.
         */

        if (this.icons.indexOf(obj) != -1) {
            return
        }

        /**
         * Store obj.
         */

        this.icons.push(obj)        

        /**
         * 
         */

        const contentDocument : KeyShapeDocumentContent = obj.contentDocument as KeyShapeDocumentContent
        contentDocument.parentObject = obj

        /**
         * Add a new method to the object.
         */

        obj.playAnimation = function() {

            /**
             * Grab the contentDocument from the object.
             */

            const contentDocument : KeyShapeDocumentContent = this.contentDocument

            /**
             * Make sure it's not already running, and then set the timeline
             * back to zero.
             */
 
            if (contentDocument.ks.timelines()[0].state() != "running")
                contentDocument.ks.timelines()[0].time(0)
 
            /**
             * Play the animation.
             */

            contentDocument.ks.globalPlay()

        }

        /**
         *
         */
        
        obj.contentDocument.addEventListener('mouseover', function() {

            const contentDocument = this as KeyShapeDocumentContent
            const object = contentDocument.parentObject as KeyShapeHTMLObjectElement
            object.playAnimation()

        })

        /**
         * Create a timeout to start the animation process
         * for an animated icon.
         */

        setTimeout(() => {

            /**
             * Create interval to play animation at.
             */

            setInterval(() => {
                obj.playAnimation()
            }, 1000 * this.getRandomNumberBetweenInclusive(4, 6))

            /**
             * Play the animation now.
             */

            obj.playAnimation()

        }, 750 * this.getRandomNumberBetweenInclusive(0, 10))

    }

    /**
     * start.
     */

    start(): void {

        /**
         * Find all animated icons.
         */

        const elements : NodeList = document.querySelectorAll('.animated-icon')

        /**
         * 
         */

        const self : AnimatedIcons = this

        /**
         * 
         */

        elements.forEach((node : Node) => {

            /**
             * 
             */

            node.addEventListener('load', function() {
                self.registerAnimatedIcon(this)
            })

            /**
             * There appears to be occurances where the 'load' event
             * listener does not get called, therefore we have 
             * a fallback timeout.
             */

            setTimeout(() => {
                self.registerAnimatedIcon(node as KeyShapeHTMLObjectElement)
            }, 1000)

        })

    }

    /**
     * getRandomNumberBetweenInclusive.
     */

    getRandomNumberBetweenInclusive(min : number, max : number) {

        /**
         * 
         */

        min = Math.ceil(min)
        max = Math.floor(max)

        /**
         * 
         */

        return Math.floor(Math.random() * (max - min + 1) + min)

    }

}
