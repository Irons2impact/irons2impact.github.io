# IRONS2IMPACT SPORTS MANAGEMENT — GitHub Pages Website

Complete responsive static website with 3 athlete photos. No paid hosting, website builder, install step, database, or build process needed.

## Included pages

- `index.html` — home
- `nil.html` — NIL & endorsement guidance
- `tour.html` — 14-day college exposure program
- `development.html` — 7v7 football + speed training
- `about.html` — brand mission
- `apply.html` — working client-side inquiry form
- `privacy.html` — starter privacy notice
- `404.html` — page-not-found
- `assets/` — shared styles, JavaScript, favicon, and all 3 submitted photos

## BEFORE PUBLISHING: Set your email

Open `assets/js/config.js` and replace:

```js
CONTACT_EMAIL: '',
```

with an email you control, for example:

```js
CONTACT_EMAIL: 'contact@yourdomain.com',
```

The Inquiry page will then open a prepared email in the visitor's mail app. **The visitor must press Send.** This approach does not collect personal information on your GitHub website and doesn't require a backend. Some devices without a mail application may not open the message. Visitors can always click **Download inquiry** to save a completed text file. **Do not describe the form as automatically submitting.**

## Upload to GitHub Pages using a phone or computer

1. Create a **new public GitHub repository** (example name: `irons2impact`).
2. On the repository, choose **Add file > Upload files**. Upload all the HTML files and the **entire assets folder** from inside the ZIP (not the ZIP itself). On mobile, if GitHub doesn't allow uploading folders, use the GitHub web browser in desktop mode or an app that supports uploading a folder, or upload files within each folder separately.
3. Commit changes to the `main` branch.
4. Open **Settings > Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/(root)`, then **Save**.
5. GitHub will show the live site URL, usually `https://USERNAME.github.io/irons2impact/`.
6. Open the site. Test every navigation link, the mobile menu, and the inquiry-email workflow.

For a custom domain: in **Settings > Pages** add the custom domain, then follow GitHub's displayed DNS instructions. Do not change DNS until ready.

## Easy edits

- Brand colors: `assets/css/styles.css`, at the top under `:root`.
- Contact email: `assets/js/config.js`.
- Page wording: the relevant `.html` file.
- Football images: `assets/images/` (names are referenced in HTML).

## Important marketing / compliance notes

- The 30+ schools / two-week exposure language is based on information supplied by the site requester and is presented as a planned goal. A confirmed itinerary is not included.
- Georgia, Kentucky, Mississippi State, and Kansas are **examples supplied by the requester** of athletes' past reported offer outcomes; this website does not claim an official relationship with these colleges and does not guarantee offers. Verify and obtain permission for any claim about a specific athlete's outcomes before launch.
- Nike, adidas, and Under Armour are examples of brands; no affiliation or guaranteed endorsement is claimed.
- Underdog Mentality 7v7 is mentioned as a potential opportunity, not a guaranteed roster spot or formal partnership claim.
- Review NIL rules, youth-athlete marketing, representation/agent licensing rules, tour safety procedures, business contact information, and privacy practices before publication. A formal privacy policy may be needed based on actual operations.

## Technical notes

The site is made of HTML, CSS, and JavaScript only. It needs no frameworks. Fonts load from Google Fonts, with fallback fonts. This package does not include a payment system or backend. Website content is readable with JavaScript disabled, while the inquiry helper and mobile navigation require JavaScript.
