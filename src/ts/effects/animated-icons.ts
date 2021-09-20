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
         * 
         */

        setTimeout(() => {

            /**
             * 
             */

            setInterval(() => {
                obj.playAnimation()
            }, 1000 * this.getRandomNumberBetweenInclusive(4, 6))

            /**
             * 
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
