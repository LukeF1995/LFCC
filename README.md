Built with Angular 16, TypeScript, and RxJS

## Getting Started

### 1. Clone the repository, install dependencies and run the app

```bash
    git clone https://github.com/LukeF1995/LFCC.git
    cd LFCC
    npm install
    ng serve
```

## Tech Stack

    Angular 16
    TypeScript
    RxJS
    SCSS
    Hacker News API

## Features

    Displays Top, New, and Best stories from the Hacker News API
    Individual story cards show titles, URLs, and points.
    Clicking a story navigates to a dedicated comments page using Angular routing.
    Nested comments can be expanded and collapsed dynamically.
    Includes loading and error states for a smooth user experience.
    Implemented infinite scrolling on the home page.
    Dry principles applied through out the application, where possible.
    Unit test with coverage of over 80%.

## To simulate API error, to see error state

    To see the custom error screen, paste the below code into your browser console while the app runs, once the page is refreshed, this forced error will clear:

        (function() {
        const originalOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function(method, url) {
            if (url.includes("hacker-news.firebaseio.com")) {
            console.warn("❌ Blocking API call:", url);
            this.abort();
            this.onerror && this.onerror(new Error("Simulated network error"));
            return;
            }
            return originalOpen.apply(this, arguments);
        };
        console.warn("🚫 Hacker News API calls are now blocked. Refresh to restore normal behavior.");
        })();

## Assumptions

    Routing for decoupling:
        Each post’s ID is passed via Angular routing (/comments/:postId) to fetch that post and its comments independently.
        This prevents the comments page from being tightly coupled to the posts page, matching the original Hacker News behavior where you can directly navigate to a comment thread without selecting a story first.

    Performance:
        Stories and comments are fetched in batches for better responsiveness.
        Infinite scroll is implemented for feed loading.

    API Structure and limitations
       The Hacker News API exposes ID lists (topstories, beststories) and individual items at /item/:id. Because items must be fetched individually to determine type (story, comment, job, etc.) and comments are retrieved by traversing kids, a single “bulk query” would either be inefficient or require many chained requests. Due to this API structure, it was decided to focused on design clarity and code reusability, and forgo a query feature.
