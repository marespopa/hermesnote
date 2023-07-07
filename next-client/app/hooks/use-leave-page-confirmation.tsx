import SingletonRouter, { Router } from "next/router";
import { useEffect } from "react";

const defaultConfirmationDialog = async (msg?: string) => window.confirm(msg);

/**
 * Inspiration from: https://stackoverflow.com/a/70759912/2592233
 */
export const useLeavePageConfirmation = (
  shouldPreventLeaving: boolean,
  message: string = "Changes you made may not be saved.",
  confirmationDialog: (
    msg?: string
  ) => Promise<boolean> = defaultConfirmationDialog
) => {
  useEffect(() => {
    // @ts-ignore because "change" is private in Next.js
    if (!SingletonRouter.router?.change) {
      return;
    }

    // @ts-ignore because "change" is private in Next.js
    const originalChangeFunction = SingletonRouter.router.change;
    const originalOnBeforeUnloadFunction = window.onbeforeunload;

    /*
     * Modifying the window.onbeforeunload event stops the browser tab/window from
     * being closed or refreshed. Since it is not possible to alter the close or reload
     * alert message, an empty string is passed to trigger the alert and avoid confusion
     * about the option to modify the message.
     */
    if (shouldPreventLeaving) {
      window.onbeforeunload = () => "";
    } else {
      window.onbeforeunload = originalOnBeforeUnloadFunction;
    }

    /*
     * Overriding the router.change function blocks Next.js route navigations
     * and disables the browser's back and forward buttons. This opens up the
     * possibility to use the window.confirm alert instead.
     */
    if (shouldPreventLeaving) {
      // @ts-ignore because "change" is private in Next.js
      SingletonRouter.router.change = async (...args) => {
        const [historyMethod, , as] = args;
        // @ts-ignore because "state" is private in Next.js
        const currentUrl = SingletonRouter.router?.state.asPath.split("?")[0];
        const changedUrl = as.split("?")[0];
        const hasNavigatedAwayFromPage = currentUrl !== changedUrl;
        const wasBackOrForwardBrowserButtonClicked =
          historyMethod === "replaceState";
        let confirmed = false;

        if (hasNavigatedAwayFromPage) {
          confirmed = await confirmationDialog(message);
        }

        if (confirmed) {
          // @ts-ignore because "change" is private in Next.js
          Router.prototype.change.apply(SingletonRouter.router, args);
        } else if (
          wasBackOrForwardBrowserButtonClicked &&
          hasNavigatedAwayFromPage
        ) {
          /*
           * The URL changes even if the user clicks "false" to navigate away from the page.
           * It is necessary to update it to reflect the current URL.
           */
          await SingletonRouter.router?.push(
            // @ts-ignore because "state" is private in Next.js
            SingletonRouter.router?.state.asPath
          );

          /*
           * @todo
           *   I attempted to determine if the user clicked the forward or back button on the browser,
           *   but was unable to find a solution after several hours of effort. As a result, I temporarily
           *   hardcoded it to assume the back button was clicked, since that is the most common scenario.
           *   However, this may cause issues with the URL if the forward button is actually clicked.
           *   I hope that a solution can be found in the future.
           */
          const browserDirection = "back";

          browserDirection === "back"
            ? history.go(1) // back button
            : history.go(-1); // forward button
        }
      };
    }

    /*
     * When the component is unmounted, the original change function is assigned back.
     */
    return () => {
      // @ts-ignore because "change" is private in Next.js
      SingletonRouter.router.change = originalChangeFunction;
      window.onbeforeunload = originalOnBeforeUnloadFunction;
    };
  }, [shouldPreventLeaving, message, confirmationDialog]);
};
