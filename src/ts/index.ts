/**
 * Global variables.
 */
declare global {
    interface Window {
        ROSETTA_CONFIG: any;
    }
}

/**
 * Import App.
 */

import { App } from "./app";

/**
 * Instantiate and run.
 */

const app = new App();
app.start();
