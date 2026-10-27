# Prime Muscle — final website

A fast, responsive, static website for **Prime Muscle Fitness Club, Jind, Haryana**. No build tools, Node installation, backend, or paid dependencies required. Designed to deploy directly to GitHub Pages.

## Upload to GitHub Pages

1. Create a new GitHub repository, for example `prime-muscle`.
2. On your computer, unzip `prime-muscle-final-website.zip` and open the `prime-muscle-final` folder.
3. Upload **all of the CONTENTS** of that folder to the **repository root** (not an extra subfolder). At the top level you should see: `index.html`, `styles.css`, `script.js`, `README.md`, `.nojekyll`, and `assets/`.
4. Commit the files to the default branch (`main`).
5. In the GitHub repo open **Settings → Pages → Build and deployment**. Choose **Deploy from a branch**, `main`, `/ (root)`; save.
6. GitHub Pages will show your public URL after deployment, normally `https://YOUR-USERNAME.github.io/prime-muscle/` for this example repo name.
7. Test the gallery buttons, menu, Instagram, phone number, Maps and WhatsApp on mobile and desktop.

### If you prefer Git commands

```bash
cd prime-muscle-final
git init
git add .
git commit -m "Launch Prime Muscle website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/prime-muscle.git
git push -u origin main
```

Create the empty GitHub repository before running these commands. If you're updating an existing repository, copy the files into it, then use your existing remote and regular `git add`, `git commit`, `git push` workflow instead of reinitializing.

## Image paths — exact original filenames

**Every image uses its actual uploaded name**, including spaces and parentheses. They are stored at `assets/images/` so you do not need to rename them.

| Website use | Image file |
| --- | --- |
| Gym logo everywhere | `assets/images/logo(20261027-085151).png` |
| Homepage hero (strength) | `assets/images/Image (7)(20261027-093854).jpeg` |
| About Prime Muscle | `assets/images/Image (15)(20261027-093838).jpeg` |
| Cardio training zone | `assets/images/Image (13)(20261027-093836).jpeg` |
| Strength training zone | `assets/images/Image (6)(20261027-093858).jpeg` |
| CrossFit rooftop zone | `assets/images/Image (1)(20261027-093905).jpeg` |
| Full-width statement banner | `assets/images/Image (12)(2).jpeg` |
| Gallery | `assets/images/Image (7)(20261027-093854).jpeg`, `Image (12)(2).jpeg`, `Image (2)(20261027-093905).jpeg`, `Image (8)(20261027-093853).jpeg`, `Image (14)(20261027-093837).jpeg`, `Image (11)(20261027-093859).jpeg`, `Image (1)(20261027-093905).jpeg`, `Image (13)(20261027-093836).jpeg`, `Image(20261027-093905).jpeg` |

The other supplied photos are retained in `assets/images/` so you can switch them in later.

**Example HTML:**

```html
<img src="assets/images/Image (7)(20261027-093854).jpeg" alt="Prime Muscle strength gym" />
```

**Important:** GitHub Pages uses case-sensitive paths. Keep the original filename exactly as shown (including capital `I`, spaces, and parentheses). These paths are **relative**, so they work on a GitHub Pages project URL without a custom domain.

## Business details

- **Name:** Prime Muscle (unisex fitness club)
- **Address:** Safidon Road, opposite HP Petrol Pump, Krishna Colony, Jind, Haryana 126102
- **Phone / WhatsApp:** +91 72067 09285
- **Instagram:** https://www.instagram.com/prime_musclejind/
- **Known regular hours:** Monday–Saturday, 5:30–10:00 AM and 4:00–9:30 PM (IST)
- **Sunday:** The supplied screenshot marks a Sunday for *Haryana Foundation Day* as closed. That may be holiday-only, so this website **does not assume every Sunday is closed**; the site says “Please confirm.” Verify with the gym and update after confirmation.
- No membership plans or prices are shown.

### Before publishing to your client

- Confirm the gym's **regular Sunday schedule**, and the holiday policy. If Sunday is routinely closed, change the Sunday row in `index.html` from “PLEASE CONFIRM” to “CLOSED” and the status logic in `script.js` accordingly.
- Confirm the gym permits these photos for public website use, especially any recognizable people.
- Test the WhatsApp destination on a real phone and verify the account uses +91 72067 09285.
- Check the Google Maps button points to the correct Prime Muscle listing; this uses a name-and-address search, not unverified coordinates.
- Add a real live domain in Open Graph image URL and canonical tags when one is known. Current relative Open Graph image reference may not show previews on all social platforms; for best sharing set `og:image` to its public absolute URL after going live.
- Optional: locally convert the JPGs to optimized WebP for faster mobile loads, but if you do, update their paths in `index.html` to match.

## Editing

- Change text, image `<img src="...">`, social links, contact and address in `index.html`.
- Change colors, typography, responsive layout in `styles.css` (`:root` variables).
- Change gallery filtering, clickable training-zone cards, lightbox, mobile menu, WhatsApp form and opening-status functionality in `script.js`.
- The WhatsApp enquiry form only **opens a draft** in WhatsApp. Visitors must press Send. There is no backend and no form messages are stored by this website.

## Structure

```text
prime-muscle-final/
├── index.html
├── styles.css
├── script.js
├── README.md
├── .nojekyll
└── assets/
    └── images/
        ├── logo(20261027-085151).png
        ├── Image (1)(20261027-093905).jpeg
        ├── Image (2)(20261027-093905).jpeg
        └── ... 13 other original images
```
