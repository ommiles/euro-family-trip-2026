// Google Analytics 4 (GA4) and Google Tag Manager (GTM) tracking utility

// Get the measurement ID or container ID from environment variable
// Supports both GA4 (G-XXXXXXXXXX) and GTM (GTM-XXXXXXX) formats
// Set this in your .env file: VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX or GTM-XXXXXXX
const TAG_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "";

let isInitialized = false;
let isGTM = false;

// Initialize Google Analytics or Google Tag Manager
export const initGA = () => {
  // Only initialize in production mode
  if (import.meta.env.DEV) {
    console.log("Google Analytics: Skipped in development mode");
    return;
  }

  if (!TAG_ID || TAG_ID === "") {
    console.warn(
      "Google Analytics: No tag ID provided. Set VITE_GA_MEASUREMENT_ID in your .env file."
    );
    return;
  }

  if (isInitialized) {
    return;
  }

  // Detect if it's GTM (starts with GTM-) or GA4 (starts with G-)
  isGTM = TAG_ID.startsWith("GTM-");

  if (isGTM) {
    // Initialize Google Tag Manager
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      "gtm.start": new Date().getTime(),
      event: "gtm.js",
    });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${TAG_ID}`;
    document.head.appendChild(script);

    // Add noscript fallback to body
    const noscript = document.createElement("noscript");
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${TAG_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.insertBefore(noscript, document.body.firstChild);

    isInitialized = true;
    console.log("Google Tag Manager initialized:", TAG_ID);
  } else {
    // Initialize Google Analytics 4 (gtag.js)
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${TAG_ID}`;
    document.head.appendChild(script1);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag("js", new Date());
    gtag("config", TAG_ID, {
      page_path: window.location.pathname,
    });

    isInitialized = true;
    console.log("Google Analytics initialized:", TAG_ID);
  }
};

// Track a page view
export const trackPageView = (path, title) => {
  if (!isInitialized) {
    return;
  }

  if (isGTM) {
    // For GTM, push to dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "page_view",
      page_path: path,
      page_title: title,
    });
  } else if (window.gtag) {
    // For GA4, use gtag
    window.gtag("config", TAG_ID, {
      page_path: path,
      page_title: title,
    });
  }
};

// Track an event
export const trackEvent = (eventName, eventParams = {}) => {
  if (!isInitialized) {
    return;
  }

  if (isGTM) {
    // For GTM, push to dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    });
  } else if (window.gtag) {
    // For GA4, use gtag
    window.gtag("event", eventName, eventParams);
  }
};
