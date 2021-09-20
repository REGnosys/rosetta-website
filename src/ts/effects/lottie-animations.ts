/**
 * 
 */

import Lottie, { AnimationItem } from "lottie-web"

/**
 * LottieAnimations.
 */

export class LottieAnimations {

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
         * Grab all the <lottie-player> elements on the page.
         */

        const players : NodeListOf<HTMLElement> = document.querySelectorAll("lottie-player")

        /**
         * Run through each one.
         */

        players.forEach(player => {
            
            /**
             * Add class to hide the player.
             */

            player.classList.add('hidden')

            /**
             * Load the animation.
             */

            let anim : AnimationItem = Lottie.loadAnimation({
                container: player,
                renderer:  'svg',
                loop:      (player.hasAttribute('loop') ? true : false),
                autoplay:  (player.hasAttribute('autoplay') ? true : false),
                path:      player.attributes.getNamedItem('src').nodeValue,
                rendererSettings: {
                    progressiveLoad: true
                }
            })

            /**
             * Add a `DOMLoaded` event listener. Once it's loaded
             * we show the element on the page.
             */

            anim.addEventListener('DOMLoaded', () => {
                
                /**
                 * A timeout may help the initial animation render
                 * all load in one go instead bits of the graphic
                 * loading at different times.
                 */

                setTimeout(() => { 

                    /**
                     * Remove class to fade up the player.
                     */

                    player.classList.remove('hidden')
                    
                }, 25)

            })

        })

    }

}
