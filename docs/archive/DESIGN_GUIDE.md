# 🎨 aashiyana Landing Page - Design Guide

## Brand Identity

**Brand Name:** aashiyana  
**Tagline:** Premium Homes. Smart Investments.  
**Target Audience:** High-net-worth individuals, serious property investors, premium home buyers  
**Market:** India (Delhi, Bangalore, Mumbai focus)

---

## 🎨 Complete Color Palette Reference

### Primary Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Gold Primary** | #C9A961 | rgb(201, 169, 97) | Highlights, accents, buttons, icons |
| **Gold Light** | #D4AF37 | rgb(212, 175, 55) | Gradients, hover states |
| **Navy Primary** | #1B3A6B | rgb(27, 58, 107) | Headings, main text, dark backgrounds |
| **Navy Dark** | #0F2847 | rgb(15, 40, 71) | Deep accents, footer |
| **Sage Green** | #8FA489 | rgb(143, 164, 137) | Secondary accent, growth symbol |

### Neutral Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **Charcoal** | #2A2A2A | Body text, strong contrast |
| **Off-White** | #F8F7F5 | Section backgrounds, premium feel |
| **White** | #FFFFFF | Card backgrounds, main background |
| **Light Gray** | #F3F1F0 | Subtle backgrounds |
| **Dark Gray** | #4A4A4A | Secondary text, muted content |

### Semantic Colors

| Color | Hex | Purpose |
|-------|-----|---------|
| **Success** | #10B981 | Growth, positive indicators |
| **Warning** | #F59E0B | Alerts, important info |
| **Danger** | #EF4444 | Errors, hot deals |
| **Info** | #3B82F6 | Information, links |

---

## 📐 Typography System

### Font Family
**Primary:** Poppins (Google Fonts)
**Fallback:** 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif

### Font Weights Used
- **Light (300):** Secondary text, subtle content
- **Regular (400):** Body text, paragraphs
- **Medium (500):** Subheadings, labels
- **Semibold (600):** Feature titles, emphasis
- **Bold (700):** Section headings, strong emphasis
- **Extrabold (800):** Page title, hero heading
- **Black (900):** Large headlines, brand impact

### Size Scale
```
H1: 3.5rem (56px)    → Hero title
H2: 2.5rem (40px)    → Section headers
H3: 1.3rem (20px)    → Card titles
H4: 1.1rem (18px)    → Subheadings
P:  1rem (16px)      → Body text
Small: 0.9rem (14px) → Secondary text
```

---

## 🎭 Visual Components

### Buttons

**Primary Button**
- Background: Linear gradient (Gold → Light Gold)
- Color: Charcoal
- Padding: 16px 40px
- Border Radius: 10px
- Hover: Translate Y(-3px), shadow elevation

**Secondary Button**
- Background: Navy Primary
- Color: White
- Border: 2px Navy
- Hover: Transparent background, Navy text

**Outline Button**
- Background: Transparent
- Border: 2px Navy
- Color: Navy
- Hover: Navy background, White text

### Cards

**Feature Card**
- Background: Off-White
- Border: 1px light gray
- Border Radius: 12px
- Padding: 40px
- Hover: Shadow elevation, gold border, Y translate(-8px)
- Icon: 60x60px gold gradient background

**Property Card**
- Background: White
- Border Radius: 12px
- Box Shadow: Medium
- Image Height: 250px
- Hover: Y translate(-8px), image zoom (1.1x)
- Badge: Gold or colored pill
- Specs: 3-column grid

**Testimonial Card**
- Background: Off-White
- Border-Left: 4px gold
- Border Radius: 12px
- Padding: 35px
- Stars: Gold color
- Author Avatar: Gold gradient background

### Badges & Pills

**Standard Badge**
- Background: Gold
- Color: Charcoal
- Padding: 8px 16px
- Border Radius: 20px
- Font Weight: 700
- Font Size: 0.8rem

**Variant Badges**
- New: Success green background, white text
- Hot Deal: Danger red background, white text

### Shadows

| Level | Value |
|-------|-------|
| **SM** | 0 1px 2px rgba(0,0,0,0.05) |
| **MD** | 0 4px 6px rgba(0,0,0,0.1) |
| **LG** | 0 10px 25px rgba(0,0,0,0.15) |
| **XL** | 0 20px 40px rgba(0,0,0,0.2) |

---

## 🎬 Animation & Transitions

### Transitions
- **Default:** all 0.3s ease
- **Fast:** 0.15s ease (micro-interactions)
- **Slow:** 0.6s ease (page load animations)

### Animations

**Fade In Up**
```css
From: opacity 0, transform translateY(30px)
To: opacity 1, transform translateY(0)
Duration: 0.6s
```

**Slide Up**
```css
From: translateY(20px)
To: translateY(0)
Duration: 0.3s
```

**Hover Lift**
```css
Hover: translateY(-8px)
Duration: 0.3s
```

**Image Zoom**
```css
Hover: scale(1.1)
Duration: 0.3s
```

**Counter Animation**
- Duration: 2 seconds
- Uses RequestAnimationFrame for 60fps
- Formats with K+, B+, L+ suffixes

---

## 📏 Spacing Scale (8px base)

| Scale | Value | Usage |
|-------|-------|-------|
| **xs** | 4px | Micro spacing |
| **sm** | 8px | Small gaps |
| **md** | 16px | Regular gaps |
| **lg** | 24px | Large spacing |
| **xl** | 32px | Extra large |
| **2xl** | 48px | Section padding |
| **3xl** | 60px | Large sections |
| **4xl** | 80px | Section top/bottom |

---

## 📱 Responsive Breakpoints

```css
Desktop:  1024px+  (Full layout)
Tablet:   768px-1023px (Adjusted layout)
Mobile:   480px-767px (Single column)
Small:    < 480px (Optimized touch)
```

### Breakpoint Rules

**Desktop**
- Full 2-column hero
- 3-column feature grid
- Full navigation visible
- Extended spacing

**Tablet**
- 1-2 column layouts
- 2-column feature grid
- Full nav or hamburger menu
- Reduced padding

**Mobile**
- 1-column everything
- Hamburger menu required
- Touch-friendly (44px min height)
- Optimized image sizes

---

## 🎯 Section-by-Section Design Details

### Navigation Bar
- Height: 60px + padding
- Sticky positioning
- Shadow appears on scroll (100px+)
- Mobile: Hamburger menu overlay

### Hero Section
- Padding: 120px 0 80px
- 2-column layout: 1fr 1fr
- Image aspect ratio: ~1:1 (500x500px+)
- Gap between columns: 60px

### Feature Cards
- Grid: repeat(auto-fit, minmax(320px, 1fr))
- Gap: 40px
- 6 cards total
- Icon size: 60x60px

### Property Cards
- Grid: repeat(auto-fit, minmax(300px, 1fr))
- Image height: 250px
- Card padding: 25px
- Badge position: Top-right (15px offset)

### Testimonials
- Grid: repeat(auto-fit, minmax(300px, 1fr))
- Gap: 30px
- Left border: 4px gold
- Author avatar: 50x50px circle

### Trust Badges
- Grid: 4 columns (auto-fit, minmax(200px, 1fr))
- Background: Navy gradient with transparency
- Border: 1px semi-transparent white

### Footer
- Background: Charcoal (#2A2A2A)
- Grid: 5 columns
- Link color: Light gray (#C0C0C0)
- Hover: Gold (#C9A961)

---

## 🎨 Real Estate Brand Psychology

**Why Gold?**
- Signals luxury, wealth, premium quality
- Associated with precious metals & high value
- Warmth appeals to emotional decision-making
- Complements property imagery

**Why Navy?**
- Trust, stability, professionalism
- Strong contrast for readability
- Used in finance/banking (professional)
- Calming effect for high-value decisions

**Why Sage Green?**
- Growth, expansion, future value
- Nature, sustainability, harmony
- Perfect for "investment" messaging
- Less aggressive than pure green

---

## ✨ Design Philosophy

1. **Luxury First** — Every element should feel premium
2. **Trust & Stability** — Navy + gold = financial confidence
3. **Clean & Modern** — Minimal clutter, maximum impact
4. **Performance** — Beautiful but fast
5. **Accessible** — Inclusive design for all users
6. **Professional** — Suit high-net-worth individuals

---

## 🔄 Design Patterns Used

1. **Hero Pattern** — Large image + compelling text (proven conversion)
2. **Card Pattern** — Scannable feature/property cards
3. **Trust Badges** — Social proof & confidence building
4. **Testimonials** — Real feedback from satisfied customers
5. **CTA Pattern** — Multiple calls-to-action in strategic locations
6. **Gradient Accents** — Visual interest without clashing

---

## 📊 Design Metrics

- **Line Height:** 1.6 (body), 1.2 (headings)
- **Letter Spacing:** Default (no excessive spacing)
- **Min Touch Target:** 44px × 44px
- **Color Contrast:** WCAG AA (4.5:1 minimum)
- **Max Content Width:** 1200px
- **Gutter Width:** 30px (both sides)

---

## 🚀 Optimization Tips

1. **Image Optimization** — Use Pexels/Unsplash with compression params
2. **Font Loading** — Preload Poppins font family
3. **CSS Organization** — Group by component
4. **JavaScript** — Event delegation, debouncing on scroll
5. **Performance** — Lazy load, minimize repaints

---

## 📄 Usage Rights

This design is custom-created for the aashiyana brand.  
All colors, patterns, and design elements are proprietary.

---

**Design Guide Version:** 1.0  
**Last Updated:** November 29, 2024  
**Status:** Complete & Ready for Implementation
