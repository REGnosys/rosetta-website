/**
 *
 */

/**
 * Body.
 */

export class Body {
    /**
     *
     */

    private body: HTMLElement;
    private readonly BODY_ID = "rosetta-website";

    /**
     * constructor.
     */

    constructor() {
        /**
         *
         */

        this.body = document.querySelector("body");
    }

    /**
     * start.
     */

    start(): void {
        /**
         *
         */

        this.body.id = this.BODY_ID;
    }
}
