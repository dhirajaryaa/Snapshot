# Snapshot 📸

**Snapshot** is a beautiful, free, and incredibly fast screenshot beautifier. 
Turn your ordinary browser captures, code snippets, and product visuals into stunning, share-ready graphics in seconds.

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black.svg?logo=next.js)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-4F46E5.svg?logo=tailwind-css)](#)

## Features ✨

* **Beautiful Device Mockups:** Wrap screenshots natively in highly detailed macOS windows, Windows borders, interactive Browser address bars, iPhone portraits, iPad portraits, or landscape device chassis.
* **Advanced Backgrounds:** Choose from 18 built-in premium mesh gradients, solid colors, a custom Linear & Radial Gradient Builder, or generate modern contextual blurred backplates with adjustable blur radius and brightness.
* **Granular Layout & Position Controls:** Tweak custom horizontal (X) and vertical (Y) padding independently. Adjust border radius, select from 6 drop-shadow depths, and scale/zoom the screenshot inside the frame.
* **Smart Cropping:** Crop custom margins (top, bottom, left, right) directly inside the editor to slice out unwanted window borders or taskbars.
* **Dynamic Window Titles:** Customize the window chrome title text dynamically for macOS, Windows, and Browser mockup frames.
* **Social Media Presets:** Auto-scale aspect ratios perfectly for X (Twitter), LinkedIn, Instagram (1:1), Product Hunt (4:3), and Dribbble.
* **High-Res Crisp Export:** Render your creations natively as PNG or JPEG at up to `3x` resolution scales for ultra-crisp social feeds, or write them directly to your clipboard.
* **Double-theme system**: Seamless Light and Dark mode UI based on a unified `shadcn/ui`-like semantic CSS variables configuration.
* **Zero distraction**: Fully clean workspace canvas with export triggers relocated to the global top header.

## Tech Stack 🛠

Snapshot is meticulously crafted utilizing modern web primitives:

* **Framework**: [Next.js](https://nextjs.org/) App Router (React 19)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Icons**: [Tabler Icons](https://tabler.io/icons)
* **Capture Engine**: `html-to-image` for high-fidelity DOM-to-Canvas exports.

## Getting Started 🚀

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dhirajaryaa/snapshot.git
   cd snapshot
   ```

2. **Install dependencies:**
   We recommend using [Bun](https://bun.sh/) for ultra-fast package management:
   ```bash
   bun install
   ```

3. **Start the development server:**
   ```bash
   bun dev
   ```

4. **Open the App:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser. The landing page allows you to preview features, and the Editor is accessible at `/create`.

## Author & Credit 🎨

Made with ❤️ and developed by **[dhirajaryaa](https://dhirajarya.in/)**. 

*Feel free to star ⭐️ the project if you find it helpful for your indie hacking and developer workflow!*
