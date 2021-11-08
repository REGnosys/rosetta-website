/**
 *
 */

import anime from "animejs";

/**
 * TouchAreaBridge.
 */

class TouchAreaBridge {
    /**
     * Variables.
     */

    private element: HTMLElement;
    private headerSubNavigation: HeaderSubNavigation;

    /**
     * constructor.
     */

    constructor(touchAreaBridgeElement: HTMLElement, headerSubNavigation: HeaderSubNavigation) {
        /**
         *
         */

        this.element = touchAreaBridgeElement;
        this.headerSubNavigation = headerSubNavigation;
        this.addEventListeners();
    }

    /**
     * showAlignAndResizeToMainNav.
     */

    showAlignAndResizeToMainNav(): void {
        /**
         *
         */

        anime({
            targets: this.element,
            translateX: {
                value: this.headerSubNavigation.getMainNavigation().getBoundingClientRect().left,
            },
            translateY: {
                value: this.headerSubNavigation.getMainNavigation().getBoundingClientRect().bottom,
            },
            width: this.headerSubNavigation.getMainNavigation().offsetWidth,
            height: 80,
            duration: 0,
            opacity: 1,
            complete: () => {
                this.element.classList.add("visible");
            },
        });
    }

    /**
     * hide.
     */

    hide(): void {
        /**
         *
         */

        anime({
            targets: this.element,
            duration: 0,
            opacity: 0,
            complete: () => {
                this.element.classList.remove("visible");
            },
        });
    }

    /**
     * addEventListeners.
     */

    private addEventListeners(): void {
        /**
         * mouseenter.
         */

        this.element.addEventListener("mouseenter", (mouseEvent: MouseEvent) => {
            this.headerSubNavigation.cancelSubNavCloseTimeout();
        });

        /**
         * mouseleave.
         */

        this.element.addEventListener("mouseleave", (mouseEvent: MouseEvent) => {
            this.headerSubNavigation.initiateSubNavClose();
        });
    }
}

/**
 * SubNavArrow.
 */

class SubNavArrow {
    /**
     * Variables.
     */

    private element: HTMLElement;
    private headerSubNavigation: HeaderSubNavigation;

    /**
     * constructor.
     */

    constructor(element: HTMLElement, headerSubNavigation: HeaderSubNavigation) {
        /**
         *
         */

        this.element = element;
        this.headerSubNavigation = headerSubNavigation;
    }

    /**
     * alignToNavListItem.
     */

    alignToNavListItem(navListItem: NavListItem, animate: boolean = true): void {
        /**
         *
         */

        let duration: number = 0;

        /**
         *
         */

        if (animate) duration = 350;

        /**
         *
         */

        anime({
            targets: this.element,
            translateX: {
                value: navListItem.getMiddle() - this.element.clientWidth,
                duration: duration,
                easing: "easeInOutSine",
            },
        });
    }

    /**
     * alignToTopOfSubNav.
     */

    alignToTopOfSubNav(): void {
        /**
         *
         */

        anime({
            targets: this.element,
            translateY: {
                value:
                    this.headerSubNavigation.getSubNavWrapperBoundingRect().top -
                    this.element.offsetHeight,
                duration: 0,
            },
        });
    }

    /**
     * show.
     */

    show(animate: boolean = true): void {
        /**
         *
         */

        let duration = 350;

        /**
         *
         */

        if (!animate) duration = 0;

        /**
         *
         */

        anime({
            targets: this.element,
            opacity: 1,
            duration: duration,
            easing: "easeInOutSine",
        });
    }

    /**
     * hide.
     */

    hide(animate: boolean = true): void {
        /**
         *
         */

        let duration = 350;

        /**
         *
         */

        if (!animate) duration = 0;

        /**
         *
         */

        anime({
            targets: this.element,
            opacity: 0,
            duration: duration,
            easing: "easeInOutSine",
        });
    }
}

/**
 * SubNavArea.
 */

class SubNavArea {
    /**
     * Variables.
     */

    private element: HTMLElement;
    private headerSubNavigation: HeaderSubNavigation;
    private showAnimation: anime.AnimeInstance;
    private navListItem: NavListItem;

    /**
     * constructor.
     */

    constructor(
        subNavArea: HTMLElement,
        headerSubNavigation: HeaderSubNavigation,
        navListItem: NavListItem
    ) {
        /**
         *
         */

        this.element = subNavArea;
        this.headerSubNavigation = headerSubNavigation;
        this.addEventListeners();
        this.navListItem = navListItem;

        /**
         *
         */

        this.hide();
    }

    /**
     * getWidth.
     */

    getWidth(): Number {
        return this.element.offsetWidth;
    }

    /**
     * getHeight.
     */

    getHeight(): Number {
        return this.element.offsetHeight;
    }

    /**
     * getNavListItem.
     */

    getNavListItem(): NavListItem {
        return this.navListItem;
    }

    /**
     * hide.
     */

    hide(animate: boolean = false): void {
        /**
         *
         */

        let duration = 200;

        /**
         *
         */

        if (!animate) duration = 0;

        /**
         * If the area is currently being animated
         * up/visible, then stop it.
         */

        if (this.showAnimation) this.showAnimation.pause();

        /**
         *
         */

        anime({
            targets: this.element,
            opacity: 0,
            duration: duration,
            translateX: {
                value: "-52%",
            },
            easing: "easeInOutSine",
        });

        /**
         * Used in CSS to disable pointer events.
         */

        this.element.classList.add("hidden");
    }

    /**
     * show.
     */

    show(): void {
        /**
         *
         */

        this.headerSubNavigation.onAreaShown(this);

        /**
         *
         */

        anime({
            targets: this.element,
            translateX: {
                value: "-52%",
            },
            duration: 0,
        });

        /**
         *
         */

        this.showAnimation = anime({
            targets: this.element,
            opacity: 1,
            translateX: {
                value: "-50%",
            },
            duration: 350,
            easing: "easeInOutSine",
        });

        /**
         * Used in CSS to disable pointer events.
         */

        this.element.classList.remove("hidden");
    }

    /**
     * addEventListeners.
     */

    private addEventListeners(): void {
        /**
         * mouseenter.
         */

        this.element.addEventListener("mouseenter", (mouseEvent: MouseEvent) => {
            this.headerSubNavigation.cancelSubNavCloseTimeout();
        });

        /**
         * mouseleave.
         */

        this.element.addEventListener("mouseleave", (mouseEvent: MouseEvent) => {
            this.headerSubNavigation.initiateSubNavClose();
        });
    }
}

/**
 * NavListItem.
 */

class NavListItem {
    /**
     * Variables.
     */

    private element: HTMLElement;
    private headerSubNavigation: HeaderSubNavigation;
    private subNavArea: SubNavArea;

    /**
     * constructor.
     */

    constructor(navListItem: HTMLElement, headerSubNavigation: HeaderSubNavigation) {
        this.element = navListItem;
        this.headerSubNavigation = headerSubNavigation;
        this.addEventListeners();
    }

    /**
     * getRect.
     */

    private getRect(): DOMRect {
        return this.element.getBoundingClientRect();
    }

    /**
     * setSubNavArea.
     */

    setSubNavArea(subNavArea: SubNavArea) {
        this.subNavArea = subNavArea;
    }

    /**
     * getSubNavArea.
     */

    getSubNavArea(): SubNavArea {
        return this.subNavArea;
    }

    /**
     * setActive.
     */

    setActive(): void {
        this.element.classList.add("active");
    }

    /**
     * setInactive.
     */

    setInactive(): void {
        this.element.classList.remove("active");
    }

    /**
     * addEventListeners.
     */

    private addEventListeners(): void {
        /**
         * mouseenter.
         */

        this.element.addEventListener("mouseenter", (mouseEvent: MouseEvent) => {
            this.headerSubNavigation.openSubNav(this);
            this.headerSubNavigation.cancelSubNavCloseTimeout();
        });

        /**
         * mouseleave.
         */

        this.element.addEventListener("mouseleave", (mouseEvent: MouseEvent) => {
            this.headerSubNavigation.initiateSubNavClose();
        });
    }

    /**
     * getLeft.
     */

    getLeft(withOffset: boolean = false): Number {
        if (!withOffset) return this.getRect().left;
        if (withOffset) return this.getRect().left - 100;
    }

    /**
     * getMiddle.
     */

    getMiddle(): number {
        const width: number = this.getRect().right - this.getRect().left;
        const paddingRight: number = parseFloat(getComputedStyle(this.element).paddingRight);
        const middle: number = this.getRect().left + (width - paddingRight) / 2;
        return middle;
    }
}

/**
 * SubNavState.
 */

enum SubNavState {
    Closing = "CLOSING",
    Closed = "CLOSED",
    Opening = "OPENING",
    Open = "OPEN",
}

/**
 * HeaderSubNavigation.
 */

export class HeaderSubNavigation {
    /**
     *
     */

    private mainNavigation: HTMLElement;

    /**
     * Main wrapper.
     */

    private subNavigationWrapper: HTMLElement;
    private subNavHideAnimation: anime.AnimeInstance;
    private subNavShowAnimation: anime.AnimeInstance;

    /**
     * Areas.
     */

    private areas: SubNavArea[];
    private productsArea: SubNavArea;
    private aboutArea: SubNavArea;

    /**
     * Nav items.
     */

    private productNavListItem: NavListItem;
    private aboutNavListItem: NavListItem;

    /**
     * The active objects.
     */

    private activeArea: SubNavArea;
    private activeNavListItem: NavListItem;

    /**
     * Nav arrow.
     */

    private subNavArrow: SubNavArrow;

    /**
     * Touch area bridge.
     */

    private touchAreaBridge: TouchAreaBridge;

    /**
     * Sub nav state.
     */

    public subNavState: SubNavState = SubNavState.Closed;

    /**
     *
     */

    private subNavCloseTimeout: NodeJS.Timeout;

    /**
     * constructor.
     */

    constructor() {
        this.areas = [];
    }

    /**
     * setActiveArea.
     */

    private setActiveArea(area: SubNavArea) {
        this.activeArea = area;
    }

    /**
     * getActiveArea.
     */

    private getActiveArea(): SubNavArea {
        return this.activeArea;
    }

    /**
     * getSubNavArrow.
     */

    private getSubNavArrow(): SubNavArrow {
        return this.subNavArrow;
    }

    /**
     * setActiveNavListItem.
     */

    private setActiveNavListItem(navListItem: NavListItem) {
        this.activeNavListItem = navListItem;
    }

    /**
     * getActiveNavListItem.
     */

    private getActiveNavListItem(): NavListItem {
        return this.activeNavListItem;
    }

    /**
     * getSubNavWrapperWidth.
     */

    getSubNavWrapperWidth(): number {
        return this.subNavigationWrapper.offsetWidth;
    }

    /**
     * getSubNavWrapperBoundingRect.
     */

    getSubNavWrapperBoundingRect(): DOMRect {
        return this.subNavigationWrapper.getBoundingClientRect();
    }

    /**
     * getMainNavigation.
     */

    getMainNavigation(): HTMLElement {
        return this.mainNavigation;
    }

    /**
     * start.
     */

    start(): void {
        /**
         * Grab the main navigation element.
         */

        this.mainNavigation = document.querySelector("[data-nav]");

        /**
         * Grab the div that wraps the sub navigation.
         */

        this.subNavigationWrapper = document.querySelector(".header-sub-navigation");

        /**
         * Grab the two nav list items and create objects.
         */

        this.productNavListItem = new NavListItem(
            document.querySelector('[data-nav-list-item][data-sub-nav-ref="products"]'),
            this
        );
        this.aboutNavListItem = new NavListItem(
            document.querySelector('[data-nav-list-item][data-sub-nav-ref="about"]'),
            this
        );

        /**
         * Grab the divs that contain each 'area' and create objects . Add them to an array.
         */

        this.productsArea = new SubNavArea(
            document.querySelector('[data-sub-nav-name="products"]'),
            this,
            this.productNavListItem
        );
        this.aboutArea = new SubNavArea(
            document.querySelector('[data-sub-nav-name="about"]'),
            this,
            this.aboutNavListItem
        );
        this.areas.push(this.productsArea, this.aboutArea);

        /**
         * Assign the corresponding area to the nav list items.
         */

        this.productNavListItem.setSubNavArea(this.productsArea);
        this.aboutNavListItem.setSubNavArea(this.aboutArea);

        /**
         * Grab the sub nav arrow element and create a new object.
         */

        this.subNavArrow = new SubNavArrow(document.querySelector("[data-sub-nav-arrow]"), this);

        /**
         *
         */

        this.touchAreaBridge = new TouchAreaBridge(
            document.querySelector("[data-sub-nav-touch-area-bridge]"),
            this
        );

        /**
         * Add the window resize listener.
         */

        this.addResizeListener();

        /**
         *
         */

        document.querySelector(".page-header__sign-in").addEventListener("click", () => {
            this.hideSubNav();
        });
    }

    /**
     * hideAllAreas.
     */

    private hideAllAreas(excludeArea: SubNavArea = null, animate: boolean = true): void {
        this.areas.forEach((a) => {
            if (excludeArea && a == excludeArea) return;
            a.hide(animate);
        });
    }

    /**
     * addResizeListener.
     */

    private addResizeListener(): void {
        /**
         * Add the resize listener to the window.
         */

        window.addEventListener("resize", () => {
            /**
             * Make sure that our sub nav is already open.
             */

            if (this.subNavState == SubNavState.Open) {
                /**
                 *
                 */

                this.setSubNavPosition(this.getActiveNavListItem().getLeft(true), false);
                this.getSubNavArrow().alignToTopOfSubNav();
                this.getSubNavArrow().alignToNavListItem(this.getActiveNavListItem(), false);
            }
        });
    }

    /**
     * showSubNav.
     */

    private showSubNav(): void {
        /**
         *
         */

        this.onSubNavShow();

        /**
         * Set the state of the sub nav.
         */

        this.subNavState = SubNavState.Opening;

        /**
         *
         */

        if (this.subNavHideAnimation) this.subNavHideAnimation.pause();

        /**
         *
         */

        this.subNavShowAnimation = anime({
            targets: this.subNavigationWrapper,
            opacity: 1,
            duration: 350,
            easing: "easeInOutSine",
            complete: () => {
                this.subNavState = SubNavState.Open;
            },
        });

        /**
         * `hidden` class used in CSS to disable pointer events.
         */

        this.subNavigationWrapper.classList.remove("hidden");
    }

    /**
     * hideSubNav.
     */

    private hideSubNav(): void {
        /**
         *
         */

        this.onSubNavHide();

        /**
         * Set the state of the sub nav.
         */

        this.subNavState = SubNavState.Closing;

        /**
         *
         */

        if (this.subNavShowAnimation) this.subNavShowAnimation.pause();

        /**
         *
         */

        this.getSubNavArrow().hide();

        /**
         *
         */

        this.subNavHideAnimation = anime({
            targets: this.subNavigationWrapper,
            opacity: 0,
            duration: 350,
            easing: "easeInOutSine",
            complete: () => {
                this.subNavState = SubNavState.Closed;
            },
        });

        /**
         * `hidden` class used in CSS to disable pointer events.
         */

        this.subNavigationWrapper.classList.add("hidden");
    }

    /**
     * initiateSubNavClose.
     */

    initiateSubNavClose(): void {
        /**
         *
         */

        this.subNavCloseTimeout = setTimeout(() => {
            this.closeSubNav();
        }, 50);
    }

    /**
     * cancelSubNavCloseTimeout.
     */

    cancelSubNavCloseTimeout(): void {
        /**
         *
         */

        clearTimeout(this.subNavCloseTimeout);
    }

    /**
     * openSubNav.
     */

    openSubNav(forNavListItem: NavListItem): void {
        /**
         * Return early if we already have this area open.
         */

        if (this.getActiveNavListItem() == forNavListItem) return;

        /**
         *
         */

        this.cancelSubNavCloseTimeout();

        /**
         * Flag to detemine if the positional and sizing
         * changes should be animated.
         */

        let shouldAnimate = true;

        /**
         * We won't need to show the sub nav again because
         * it'll already be visible; therefore we check to
         * see if it's closed or closing, and then we will
         * show it.
         */

        if (this.subNavState == SubNavState.Closed || this.subNavState == SubNavState.Closing) {
            this.showSubNav();
            shouldAnimate = false;
            this.subNavState = SubNavState.Open;
        }

        /**
         *
         */

        if (this.subNavState != SubNavState.Open) this.subNavState = SubNavState.Opening;

        /**
         *
         */

        this.setSubNavPosition(forNavListItem.getLeft(true), shouldAnimate);

        /**
         *
         */

        this.setSubNavSize(
            forNavListItem.getSubNavArea().getWidth(),
            forNavListItem.getSubNavArea().getHeight(),
            shouldAnimate
        );

        /**
         *
         */

        this.setActiveNavListItem(forNavListItem);

        /**
         *
         */

        this.setActiveArea(forNavListItem.getSubNavArea());
        this.hideAllAreas(this.getActiveArea());
        this.getActiveArea().show();

        /**
         *
         */

        this.getSubNavArrow().alignToTopOfSubNav();
        this.getSubNavArrow().alignToNavListItem(forNavListItem, shouldAnimate);
        this.getSubNavArrow().show();
    }

    /**
     * closeSubNav.
     */

    closeSubNav(): void {
        /**
         *
         */

        this.subNavState = SubNavState.Closing;
        this.setActiveNavListItem(null);

        /**
         *
         */

        this.hideSubNav();
    }

    /**
     * setSubNavPosition.
     */

    private setSubNavPosition(left: Number, animate: boolean = true): void {
        /**
         *
         */

        let duration: number = 350;

        /**
         *
         */

        if (!animate) duration = 0;

        /**
         *
         */

        anime({
            targets: this.subNavigationWrapper,
            translateX: {
                value: left,
                duration: duration,
                easing: "easeInOutSine",
            },
        });
    }

    /**
     * setSubNavSize.
     */

    private setSubNavSize(width: Number, height: Number, animate: boolean = true): void {
        /**
         *
         */

        let duration: number = 350;

        /**
         *
         */

        if (!animate) duration = 0;

        /**
         *
         */

        anime({
            targets: this.subNavigationWrapper,
            width: width,
            height: height,
            duration: duration,
            easing: "easeInOutSine",
        });
    }

    /**
     * makeAllNavListItemsInactive.
     */

    private makeAllNavListItemsInactive(): void {
        this.areas.forEach((a) => {
            a.getNavListItem().setInactive();
        });
    }

    /**
     * onSubNavShow.
     */

    private onSubNavShow(): void {
        this.touchAreaBridge.showAlignAndResizeToMainNav();
    }

    /**
     * onSubNavHide.
     */

    private onSubNavHide(): void {
        this.makeAllNavListItemsInactive();
        this.touchAreaBridge.hide();
    }

    /**
     * onAreaShown.
     */

    onAreaShown(subNavArea: SubNavArea): void {
        this.makeAllNavListItemsInactive();
        subNavArea.getNavListItem().setActive();
    }
}
