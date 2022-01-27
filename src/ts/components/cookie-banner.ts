/**
 * CookieBanner.
 */

export class CookieBanner {
    private banner: HTMLElement;
    private dismissBtn: HTMLButtonElement;

    constructor() {}

    start(): void {
        this.banner = document.querySelector(".cookie-banner");
        this.dismissBtn = document.querySelector(".cookie-banner .button");

        if (this.banner) {
            this.addListener();
        }
    }

    addListener() {
        this.dismissBtn.addEventListener("click", () => this.dismissHandler());
    }

    private dismissHandler() {
        this.addCookie();
        this.dismissBtn.removeEventListener("click", () => this.dismissHandler());
        this.banner.remove();
    }

    private addCookie() {
        document.cookie = "cookie-consent=accepted;path=/";
    }
}
