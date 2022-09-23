/**
 * Utils.
 */

import { Ready } from "./utils/ready";

/**
 * Layouts.
 */

import { Body } from "./layouts/common/body";
import { Header } from "./layouts/common/header";
import { Footer } from "./layouts/common/footer";
import { MobileNav } from "./layouts/common/mobile-nav";
import { CoreDiagram } from "./layouts/pages/governance-core-diagram";
import { HeaderSubNavigation } from "./layouts/common/header-sub-navigation";
import { PricingTable } from "./layouts/pages/pricing-table";
import { PricingBlocks } from "./layouts/pages/pricing-blocks";

/**
 * Components.
 */

import { LinkWithGraphics } from "./components/link-with-graphics";
import { BodyCurves } from "./components/body-curves";
import { GraphicHeaders } from "./components/graphic-headers";
import { BasicForms } from "./components/basic-forms";
import { ContactForm } from "./components/contact-form";

/**
 * Effects.
 */

import { AnimatedIcons } from "./effects/animated-icons";
import { ScrollsIntoView } from "./effects/scolls-into-view";
import { NumberCountUp } from "./effects/number-count-up";
import { LottieAnimations } from "./effects/lottie-animations";
import { MediumZoom } from "./effects/medium-zoom";
import { UrlHash } from "./effects/url-hash";

/**
 * App.
 */

export class App {
    /**
     * Layouts.
     */

    private body: Body;
    private header: Header;
    private footer: Footer;
    private mobileNav: MobileNav;
    private coreDiagram: CoreDiagram;
    private headerSubNavigation: HeaderSubNavigation;
    private pricingTable: PricingTable;
    private pricingBlocks: PricingBlocks;

    /**
     * Components.
     */

    private linkWithGraphics: LinkWithGraphics;
    private bodyCurves: BodyCurves;
    private graphicHeaders: GraphicHeaders;
    private basicForms: BasicForms;
    private contactForm: ContactForm;

    /**
     * Effects.
     */

    private animatedIcons: AnimatedIcons;
    private scrollsIntoView: ScrollsIntoView;
    private numberCountUp: NumberCountUp;
    private lottieAniations: LottieAnimations;
    private mediumZoom: MediumZoom;
    private urlHash: UrlHash;

    /**
     * constructor.
     */

    constructor() {
        /**
         * Layouts.
         */

        this.body = new Body();
        this.header = new Header();
        this.footer = new Footer();
        this.mobileNav = new MobileNav();
        this.coreDiagram = new CoreDiagram();
        this.headerSubNavigation = new HeaderSubNavigation();
        this.pricingTable = new PricingTable();
        this.pricingBlocks = new PricingBlocks();

        /**
         * Components.
         */

        this.linkWithGraphics = new LinkWithGraphics();
        this.bodyCurves = new BodyCurves();
        this.graphicHeaders = new GraphicHeaders();
        this.basicForms = new BasicForms();
        this.contactForm = new ContactForm();

        /**
         * Effects.
         */

        this.animatedIcons = new AnimatedIcons();
        this.scrollsIntoView = new ScrollsIntoView();
        this.numberCountUp = new NumberCountUp();
        this.lottieAniations = new LottieAnimations();
        this.mediumZoom = new MediumZoom();
        this.urlHash = new UrlHash();
    }

    /**
     * start.
     */

    start(): void {
        /**
         * When document is ready.
         */

        new Ready(() => {
            /**
             * Start layouts.
             */

            this.body.start();
            this.footer.start();
            this.mobileNav.start();
            this.coreDiagram.start();
            this.headerSubNavigation.start();
            this.pricingTable.start();
            this.pricingBlocks.start();

            /**
             * Start components.
             */

            this.linkWithGraphics.start();
            this.bodyCurves.start();
            this.graphicHeaders.start();
            this.basicForms.start();
            this.contactForm.start();

            /**
             * Start effects.
             */

            this.scrollsIntoView.start();
            this.numberCountUp.start();
            this.animatedIcons.start();
            this.lottieAniations.start();
            this.mediumZoom.start();
            this.urlHash.start();
        });
    }
}
