/**
 * 
 */

import { SVGInjector } from '@tanem/svg-injector'

/**
 * CoreDiagram.
 */

export class CoreDiagram {
    
    /**
     * Private variables.
     */

    private coreDiagram : HTMLElement
    private listItemsContentNodes : NodeListOf<HTMLElement>

    /**
     * constructor.
     */

    constructor() {

        /**
         * 
         */

    }

    /**
     * start.
     */

    start(): void {

        /**
         * 
         */

        this.coreDiagram = document.querySelector('.core-diagram')

        /**
         * 
         */

        if (this.coreDiagram) {

            /**
             * 
             */

            this.listItemsContentNodes = this.coreDiagram.querySelectorAll('.core-diagram__list-item-content')

            /**
             * 
             */

            this.applyEventListenersToListItems()

            /**
             * Convert the img graphic to an SVG.
             */

            SVGInjector(document.querySelectorAll('.core-diagram__graphic'), {
                cacheRequests: false,
                evalScripts: 'once',
                renumerateIRIElements: false,
                afterAll: () => {

                    /**
                     * 
                     */

                    this.applyEventListenersToRing()

                }
            })

        }

    }

    /**
     * applyEventListenersToListItems.
     */

    applyEventListenersToListItems() {

        /**
         * 
         */

        if (this.listItemsContentNodes.length) {

            /**
             * Run through each list item.
             */

            this.listItemsContentNodes.forEach(el => {

                /**
                 * 
                 */

                el.addEventListener('mouseenter', (event) => {

                    /**
                     * 
                     */

                    this.knockBackAllRings()
                    this.knockBackAllListItems()

                    /**
                     * 
                     */
                    
                    const target : HTMLElement =  event.target as HTMLElement
                    target.parentElement.classList.remove('knocked-back')
                    target.classList.add('active')

                    /**
                     * 
                     */

                    const graphic : HTMLElement = this.coreDiagram.querySelector('.core-diagram__graphic')
                    const ringSelector : string = target.getAttribute('data-ring-selector')

                    /**
                     * 
                     */

                    const ring : any = graphic.querySelector(ringSelector)
                    ring.classList.remove('knocked-back')
                    
                    /**
                     * 
                     */

                    if (ringSelector.substr(0, 8) == '#outside') this.showOuterRingAnnotations()

                })

                /**
                 * 
                 */

                el.addEventListener('mouseleave', (event) => {

                    /**
                     * 
                     */

                    const target : HTMLElement =  event.target as HTMLElement
                    target.classList.remove('active')

                    /**
                     * 
                     */

                    const ringSelector : string = target.getAttribute('data-ring-selector')

                    /**
                     * 
                     */

                    if (ringSelector.substr(0, 8) == '#outside') this.hideOuterRingAnnotations()

                    /**
                     * 
                     */

                    this.fullColorAllRings()
                    this.fullColorAllListItems()

                })

            })

        }

    }



    /**
     * applyEventListenersToRing.
     */

    applyEventListenersToRing() {

        /**
         * 
         */

        this.getRingOverlayElements().forEach(el => {

            /**
             * 
             */

            el.addEventListener('mouseenter', (event) => {

                /**
                 * 
                 */

                this.knockBackAllRings()
                this.knockBackAllListItems()

                /**
                 * 
                 */

                const ring : any = event.target
                ring.classList.remove('knocked-back')

                /**
                 * 
                 */

                const id : string = ring.id
                const listItem : HTMLElement = this.coreDiagram.querySelector('[data-ring-selector="#' + id + '"]')
                listItem.classList.add('active')
                listItem.parentElement.classList.remove('knocked-back')

                /**
                 * Check if the user moved their mouse over the outer ring.
                 */

                if (id.substr(0, 7) == 'outside') this.showOuterRingAnnotations()

            })

            /**
             * 
             */

             el.addEventListener('mouseleave', (event) => {

                /**
                 * 
                 */

                const ring : any = event.target
                const id : string = ring.id

                /**
                 * Check if the user moved their mouse out of the outer ring.
                 */

                 if (id.substr(0, 7) == 'outside') this.hideOuterRingAnnotations()

                /**
                 * 
                 */

                this.fullColorAllRings()
                this.fullColorAllListItems()

            })

        })

    }

    /**
     * showOuterRingAnnotations.
     */

    showOuterRingAnnotations() {

        /**
         * 
         */

        const outsideRingAnnotations : HTMLElement = this.coreDiagram.querySelector('#annotation-text-and-lines')
        outsideRingAnnotations.classList.add('show')

    }

    /**
     * hideOuterRingAnnotations.
     */

    hideOuterRingAnnotations() {

        /**
         * 
         */

        const outsideRingAnnotations : HTMLElement = this.coreDiagram.querySelector('#annotation-text-and-lines')
        outsideRingAnnotations.classList.remove('show')

    }

    /**
     * onFullColor.
     */

    onFullColor(ringSelectorId : String ) {

        /**
         * 
         */

    }

    /**
     * onKnockback.
     */

    onKnockback(ringSelectorId : String) {

        /**
         * 
         */

    }

    /**
     * getRingOverlayElements.
     */

    getRingOverlayElements() : Array<HTMLElement> {
        return [
            this.coreDiagram.querySelector('#inside-knockback') as HTMLElement,
            this.coreDiagram.querySelector('#middle-knockback') as HTMLElement,
            this.coreDiagram.querySelector('#outside-knockback') as HTMLElement
        ]
    }

    /**
     * knockBackAllRings.
     */

    knockBackAllRings() {
        this.getRingOverlayElements().forEach(el => el.classList.add('knocked-back'))
    }

    /**
     * fullColorAllRings.
     */

    fullColorAllRings() {
        this.getRingOverlayElements().forEach(el => el.classList.remove('knocked-back'))
    }

    /**
     * knockBackAllListItems.
     */

    knockBackAllListItems() {
        this.listItemsContentNodes.forEach(el => {
            el.classList.remove('active')
            el.parentElement.classList.add('knocked-back')
        })
    }

    /**
     * fullColorAllListItems.
     */

    fullColorAllListItems() {
        this.listItemsContentNodes.forEach(el => {
            el.classList.remove('active')
            el.parentElement.classList.remove('knocked-back')
        })
    }

}
