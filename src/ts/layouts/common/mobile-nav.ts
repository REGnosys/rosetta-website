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
        
        let mobileNav : HTMLElement = document.querySelector('.header-mobile-navigation')

        /**
         * 
         */

        if (!mobileNav) return

        /**
         * 
         */

        let mobileNavClose : HTMLElement = mobileNav.querySelector('.header-mobile-navigation__close')
        let ham : HTMLElement = document.querySelector('.page-header__col-menu-ham a')

        /**
         * 
         */

        ham.addEventListener('click', () => {

            /**
             * 
             */

            mobileNav.classList.add('show')

        })

        /**
         * 
         */

        mobileNavClose.addEventListener('click', () => {

            /**
             * 
             */

            mobileNav.classList.remove('show')

        })

    }

}
