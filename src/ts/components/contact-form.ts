/**
 *
 */

declare const grecaptcha: ReCaptchaV2.ReCaptcha;

/**
 * inteface FormData.
 */

interface FormData {
    firstName: string;
    surname: string;
    email: string;
    phone: string;
    website: string;
    country: string;
    message: string;
    token: string;
}

/**
 * Forms.
 */

export class ContactForm {
    /**
     * constructor.
     */

    constructor() {}

    /**
     * start.
     */

    start(): void {
        /**
         *
         */

        const contactForm: HTMLFormElement = document.querySelector(".contact-form");

        /**
         *
         */

        if (contactForm) {
            /**
             *
             */

            contactForm.addEventListener("submit", (ev: Event) => {
                /**
                 *
                 */

                ev.preventDefault();

                /**
                 *
                 */

                let formData : FormData = this.grabSubmittedData(contactForm)

                /**
                 *
                 */

                this.postReCaptcha(formData);

            });
        }
    }

    /**
     * showSuccessResponse.
     */

    showSuccessResponse(): void {
        const responseContainer: HTMLElement = this.getResponseContainer();
        responseContainer.classList.add("show");
        responseContainer.classList.add("success");
    }

    /**
     * showFailResponse.
     */

    showFailResponse(): void {
        const responseContainer: HTMLElement = this.getResponseContainer();
        responseContainer.classList.add("show");
        responseContainer.classList.add("fail");
    }

    /**
     * getResponseContainer.
     */

    getResponseContainer(): HTMLElement {
        const contactForm: HTMLFormElement = document.querySelector(".contact-form");
        const responseContainer: HTMLElement = contactForm.querySelector(".response-container");
        return responseContainer;
    }

    /**
     * getHubSpotFormAPIURLEndpoint.
     */

    getHubSpotFormAPIURLEndpoint() {
        /**
         * 
         */

        let endpoint : string = 'https://api.hsforms.com/submissions/v3/integration/submit/:portalId/:formGuid'
        
        /**
         *
         */

        endpoint = endpoint.replace(':portalId', '4975376')
        endpoint = endpoint.replace(':formGuid', '5ea128f0-9a63-4904-b293-7ba62aa31d08')

        /**
         *
         */

        return endpoint
    }

    /**
     * postDataToHubSpot.
     */

    postDataToHubSpot(formData: FormData): void {
        /**
         * 
         */

        let hubSpotData = this.packageDataForHubSpot(formData)

        /**
         * 
         */

        let xhr = new XMLHttpRequest();
        xhr.open("POST", this.getHubSpotFormAPIURLEndpoint(), true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(hubSpotData));

        /**
         *
         */

        xhr.addEventListener(
            "readystatechange",
            () => {
                /**
                 * 4 = Done.
                 */

                if (xhr.readyState == 4) {
                    /**
                     *
                     */

                    if (xhr.status == 200) {
                        /**
                         *
                         */

                        let response = JSON.parse(xhr.responseText);

                    }
                }
            },
            false
        );
    }

    /**
     * postData.
     */

    postData(formData: FormData): void {
        /**
         *
         */

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/send", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(formData));

        /**
         *
         */

        xhr.addEventListener(
            "readystatechange",
            () => {
                /**
                 * 4 = Done.
                 */

                if (xhr.readyState == 4) {
                    /**
                     *
                     */

                    if (xhr.status == 200) {
                        /**
                         *
                         */

                        let response = JSON.parse(xhr.responseText);

                        /**
                         * Do some logic with the response here...
                         */

                        let successfulResponse: boolean = true;

                        /**
                         *
                         */

                        if (successfulResponse) {
                            /**
                             *
                             */

                            this.showSuccessResponse();
                        } else {
                            /**
                             *
                             */

                            this.showFailResponse();
                        }
                    } else {
                        /**
                         *
                         */

                        this.showFailResponse();
                    }
                }
            },
            false
        );

        /**
         *
         */

        this.postDataToHubSpot(formData)

    }

    /**
     * grabSubmittedData
     */

    grabSubmittedData(contactForm: HTMLFormElement): FormData {
        /**
         *
         */

        let submittedFormData = {} as FormData;

        /**
         *
         */

        submittedFormData.firstName = (
            contactForm.querySelector("#firstname") as HTMLInputElement
        ).value;
        submittedFormData.surname = (
            contactForm.querySelector("#surname") as HTMLInputElement
        ).value;
        submittedFormData.email = (
            contactForm.querySelector("#emailaddress") as HTMLInputElement
        ).value;
        submittedFormData.phone = (
            contactForm.querySelector("#workphone") as HTMLInputElement
        ).value;
        submittedFormData.website = (
            contactForm.querySelector("#companywebsite") as HTMLInputElement
        ).value;
        submittedFormData.country = (
            contactForm.querySelector("#country") as HTMLInputElement
        ).value;
        submittedFormData.message = (
            contactForm.querySelector("#message") as HTMLInputElement
        ).value;

        /**
         *
         */

        return submittedFormData
    }

    /**
     * packageDataForHubSpot.
     */

    packageDataForHubSpot(data : FormData): {} {
        /**
         * 
         */

        let dataForHubSpot = {} as any

        /**
         * 
         */

        let fieldData = []

        /**
         *
         */

        fieldData.push({ name: 'firstname', value: data.firstName })
        fieldData.push({ name: 'lastname',  value: data.surname })
        fieldData.push({ name: 'email',     value: data.email })
        fieldData.push({ name: 'phone',     value: data.phone })
        fieldData.push({ name: 'website',   value: data.website})
        fieldData.push({ name: 'country',   value: data.country })
        fieldData.push({ name: 'message',   value: data.message })

        /**
         *
         */

        dataForHubSpot['fields'] = fieldData

        /**
         *
         */

        return dataForHubSpot

    }

    
    /**
     * postReCaptcha.
     */

    postReCaptcha(submittedFormData : FormData) {
        /**
         *
         */

        grecaptcha.ready(() => {
            grecaptcha
                .execute(window.ROSETTA_CONFIG.recaptcha_key, { action: "contact_form" })
                .then((token: string) => {
                    /**
                     *
                     */

                    submittedFormData.token = token;
                    this.postData(submittedFormData);
                });
        });
    }
}
