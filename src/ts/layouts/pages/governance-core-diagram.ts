/**
 * 
 */

import { SVGInjector } from '@tanem/svg-injector'
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
import Swiper, { Pagination } from 'swiper'

/**
 * CoreDiagram.
 */

export class CoreDiagram {
    
    /**
     * Private variables.
     */

    private coreDiagram : HTMLElement
    private listItemsContentNodes : NodeListOf<HTMLElement>
    private siwperInstance : Swiper

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

            /**
             *
             */

            this.configureInfoPanels()

        }

    }

    /**
     * configureInfoPanels.
     */

    configureInfoPanels() {

        /**
         * 
         */

        Swiper.use([Pagination]);

        /**
         * 
         */         

        this.siwperInstance = new Swiper('.swiper-container', {
            autoHeight: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            on: {

                /**
                 * init.
                 */

                afterInit: () => {

                    /**
                     * 
                     */

                    let paginationItems : NodeListOf<HTMLElement> = document.querySelectorAll('.swiper-pagination-bullet')

                    /**
                     * 
                     */

                    let itemIndex : number = 0

                    /**
                     * 
                     */

                    paginationItems.forEach((item) => {

                        /**
                         * 
                         */

                        item.setAttribute('item-index', itemIndex.toString())
                        itemIndex++

                        /**
                         * 
                         */

                        item.addEventListener('click', () => {
                            
                            /**
                             * 
                             */

                            let index : number = parseInt(item.getAttribute('item-index'))

                            /** 
                             * 
                             */

                            if (index == 0) {
                                
                                /**
                                 * 
                                 */

                                this.fullColorAllRings()
                                this.fullColorAllListItems()

                            } else {

                                /**
                                 * 
                                 */

                                let listItem : HTMLElement = this.listItemsContentNodes[index - 1]

                                /**
                                 * 
                                 */

                                this.highlightListItem(listItem)
                                this.highlightRingCorrespondingToListItem(listItem)

                            }

                        })

                    })

                }
            }
        })

    }

    /**
     * goToDefaultState.
     */

    goToDefaultState() {

        /**
         * 
         */

        this.getRingOverlayElements().forEach(el => {
            el.classList.remove('active')
        })

        /**
         * 
         */

        this.hideOuterRingAnnotations()

        /**
         *
         */

        this.siwperInstance.slideTo(0)

        /**
         * 
         */

        this.fullColorAllRings()
        this.fullColorAllListItems()

    }

    /**
     * highlightRingCorrespondingToListItem.
     */

    highlightRingCorrespondingToListItem(listItem : HTMLElement) {

        /**
         * 
         */

        const targetRingSelector = listItem.getAttribute('data-ring-selector')

        /**
         * 
         */

        this.getRingOverlayElements().forEach(el => {
            if (('#' + el.getAttribute('id')) == targetRingSelector) {
                this.highlightRing(el)
            }
        })

    }

    /**
     * highlightRing.
     */

    highlightRing(ring : HTMLElement) {

        /**
         * 
         */

        this.knockBackAllRings()

        /**
         * 
         */

        ring.classList.remove('knocked-back')

        /**
         * 
         */

        const id : string = ring.id           

        /**
         * Check if the user moved their mouse over the outer ring.
         */

        if (id.substr(0, 7) == 'outside') this.showOuterRingAnnotations()

    }

    /**
     * highlightListItem.
     */

    highlightListItem(target : HTMLElement) {

        /**
         * 
         */

        this.knockBackAllListItems()

        /**
         * 
         */

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
                 * mouseenter.
                 */

                el.addEventListener('mouseenter', (event) => {

                    /**
                     * 
                     */
                    
                    const target : HTMLElement = event.target as HTMLElement
                    this.highlightListItem(target)

                    /**
                     * 
                     */

                    this.highlightRingCorrespondingToListItem(target)

                    /**
                     * 
                     */

                    const slideIndex : string = target.getAttribute('data-slide-index')
                    this.siwperInstance.slideTo(parseInt(slideIndex))

                })

                /**
                 * mouseleave.
                 */

                el.addEventListener('mouseleave', (event) => {

                    /**
                     * 
                     */

                    this.goToDefaultState()

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
                const id : string = ring.id
                this.highlightRing(ring)

                /**
                 * 
                 */

                const listItem : HTMLElement = this.coreDiagram.querySelector('[data-ring-selector="#' + id + '"]')       
                this.highlightListItem(listItem)
                
                /**
                 * 
                 */

                const slideIndex : string = listItem.getAttribute('data-slide-index')
                this.siwperInstance.slideTo(parseInt(slideIndex))

            })

            /**
             * 
             */

             el.addEventListener('mouseleave', (event) => {

                /**
                 * 
                 */

                this.goToDefaultState()

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
