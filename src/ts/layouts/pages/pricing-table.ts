/**
 * 
 */

/**
 * PricingTable.
 */
 
export class PricingTable {
     
    /**
     * Private variables.
     */

    private pricingTable : HTMLElement

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

        this.pricingTable = document.querySelector('.pricing-table')

        /**
         * 
         */

        if (this.pricingTable) {

            /**
             * Create a resize event listener.
             */

            window.addEventListener('resize', () => {
                this.setHeaderLevelsColorFillExpansionHeight()
            })

            /**
             * 
             */

            this.setHeaderLevelsColorFillExpansionHeight()

            /**
             * 
             */

            this.configureExpandableRows()

        }
 
    }
 
    /**
     * configureExpandableRows.
     */

    configureExpandableRows(): void {

        /**
         * 
         */

        var expandableRows : NodeListOf<HTMLElement> = document.querySelectorAll('.pricing-table__row-header--expandable')

        /**
         * 
         */

        expandableRows.forEach(element => {

            /**
             * 
             */

            var targetContentSelector : string = element.attributes.getNamedItem('data-expandable-content-selector').value
            var targetContent : HTMLElement = document.querySelector(targetContentSelector)

            /**
             * 
             */

            element.addEventListener('click', () => {
                if (element.classList.contains('expanded')) {
                    element.classList.remove('expanded')
                    targetContent.classList.remove('expanded')
                } else {
                    element.classList.add('expanded')
                    targetContent.classList.add('expanded')
                }
            })

        })

    }

    /**
     * setHeaderLevelsColorFillExpansionHeight.
     */

    setHeaderLevelsColorFillExpansionHeight(): void {

        /**
         * Grab the heading height reference element and get it's height.
         */

        var headingHeightReference : HTMLElement = document.querySelector('.heading-height-reference')
        var value = headingHeightReference.offsetHeight

        /**
         * Grab the expansion elements on the page.
         */

        var expansions : NodeListOf<HTMLElement> = document.querySelectorAll('.color-fill-expansion')

        /**
         * Set the height for each expansion.
         */

        expansions.forEach(element => {
            element.style.height = value + "px"
        })

        /**
         * Grab the table header.
         */

        var tableHeader : HTMLElement = document.querySelector('.pricing-table__header')

        /**
         * 
         */

        tableHeader.style.marginTop = "-" + value + "px"

    }

 
}
 