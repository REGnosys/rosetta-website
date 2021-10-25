/**
 * 
 */

/**
 * MobileNav.
 */

export class MobileNav {

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
        
        let mobileNavWrapper : HTMLElement = document.querySelector('.header-mobile-navigation-wrapper')

        /**
         * 
         */

        if (!mobileNavWrapper) return

        /**
         * 
         */

        let mobileNavClose : HTMLElement = mobileNavWrapper.querySelector('.header-mobile-navigation-wrapper__close')
        let ham : HTMLElement = document.querySelector('.page-header__col-menu-ham a')

        /**
         * 
         */

        ham.addEventListener('click', (e) => {

            /**
             * 
             */

            mobileNavWrapper.classList.add('show')

            /**
             * 
             */

            e.preventDefault()

        })

        /**
         * 
         */

        mobileNavClose.addEventListener('click', (e) => {

            /**
             * 
             */

            mobileNavWrapper.classList.remove('show')

            /**
             * 
             */

            e.preventDefault()

        })

    }

}
