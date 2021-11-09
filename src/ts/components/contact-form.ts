/**
 * 
 */

declare const grecaptcha: ReCaptchaV2.ReCaptcha;

/**
 * inteface FormData.
 */

interface FormData {
    firstName : string,
    surname   : string,
    email     : string,
    phone     : string,
    website   : string,
    country   : string,
    message   : string,
    token     : string
}

/**
 * Forms.
 */

export class ContactForm {

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

        const contactForm : HTMLFormElement = document.querySelector('.contact-form')

        /**
         * 
         */

        if (contactForm) {

            /**
             * 
             */

            contactForm.addEventListener('submit', (ev : Event) => {

                /**
                 * 
                 */

                 ev.preventDefault()

                /**
                 * 
                 */

                 this.postReCaptcha(contactForm)

            })

        }

    }
    
    /**
     * showSuccessResponse.
     */

    showSuccessResponse(): void {
        const responseContainer : HTMLElement = this.getResponseContainer()
        responseContainer.classList.add('show')
        responseContainer.classList.add('success')
    }

    /**
     * showFailResponse.
     */

    showFailResponse(): void {
        const responseContainer : HTMLElement = this.getResponseContainer()
        responseContainer.classList.add('show')
        responseContainer.classList.add('fail')
    }

    /**
     * getResponseContainer.
     */

    getResponseContainer(): HTMLElement {
        const contactForm : HTMLFormElement = document.querySelector('.contact-form')
        const responseContainer : HTMLElement = contactForm.querySelector('.response-container')
        return responseContainer
    }

    /**
     * postData.
     */

    postData(formData : FormData): void {

        /**
         * 
         */

        let xhr = new XMLHttpRequest()
        xhr.open('POST', '/api/send', true)
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(formData))

        /**
         * 
         */

        xhr.addEventListener("readystatechange", () => {

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

                    let response = JSON.parse(xhr.responseText)

                    /**
                     * Do some logic with the response here...
                     */

                    let successfulResponse : boolean = true

                    /**
                     * 
                     */

                    if (successfulResponse) {

                        /**
                         * 
                         */

                        this.showSuccessResponse()

                    } else {

                        /**
                         * 
                         */

                        this.showFailResponse()

                    }

                } else {

                    /**
                     * 
                     */

                    this.showFailResponse()

                }

            }
        
        }, false)

    }

    /**
     * postReCaptcha.
     */

    postReCaptcha(contactForm : HTMLFormElement) {

        /**
         * 
         */

        let submittedFormData = {} as FormData

        /**
         * 
         */

        submittedFormData.firstName = (contactForm.querySelector('#firstname') as HTMLInputElement).value
        submittedFormData.surname   = (contactForm.querySelector('#surname') as HTMLInputElement).value
        submittedFormData.email     = (contactForm.querySelector('#emailaddress') as HTMLInputElement).value
        submittedFormData.phone     = (contactForm.querySelector('#workphone') as HTMLInputElement).value
        submittedFormData.website   = (contactForm.querySelector('#companywebsite') as HTMLInputElement).value
        submittedFormData.country   = (contactForm.querySelector('#country') as HTMLInputElement).value
        submittedFormData.message   = (contactForm.querySelector('#message') as HTMLInputElement).value

        /**
         * 
         */

        grecaptcha.ready(() => {
            grecaptcha.execute('6LfCIeIcAAAAAKgTKA9QGstV6kusnO3mD29SWspz', {action: 'demo'})
                .then((token: string) =>  {

                    /**
                     * 
                     */

                    submittedFormData.token = token
                    this.postData(submittedFormData)
                });
        });
    }

}
