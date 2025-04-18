# InterviewAI Animation System

This document explains how to use the global animation system implemented across the InterviewAI website.

## Implementation

The animation system consists of two main files:

- `css/animations.css`: Contains all animation styles and keyframes
- `js/animations.js`: Provides JavaScript functionality for animations and smooth scrolling

## Including Animation Files

Add these files to every HTML page:

```html
<!-- In <head> section -->
<link href="css/animations.css" rel="stylesheet">

<!-- Before closing </body> tag -->
<script src="js/animations.js"></script>
```

Adjust paths as needed based on the file's location in the directory structure.

## Available Animation Features

### 1. Smooth Scrolling

All anchor links (links with hashes `#`) automatically get smooth scrolling behavior. 
The system handles offsets for fixed headers and updates the URL without causing page jumps.

### 2. Scroll-Triggered Animations

Elements with the class `.animate-on-scroll` will animate when they come into view:

```html
<div class="animate-on-scroll" data-animation="fade-in-up">
  Content to animate
</div>
```

#### Available Animation Types

Add these as values for the `data-animation` attribute:

- `fade-in` (default)
- `fade-in-up`
- `fade-in-down`
- `fade-in-left`
- `fade-in-right`
- `scale-in`

#### Animation Delay

Add a custom delay:

```html
<div class="animate-on-scroll" data-animation="fade-in-up" data-delay="0.3s">
  Content with delayed animation
</div>
```

### 3. Staggered List Animations

For lists or grids where you want items to animate in sequence:

```html
<div class="stagger-list animate-on-scroll">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### 4. Button and Card Animations

All buttons and cards automatically get hover animations:

- All elements with `.btn` class get hover and ripple effects
- All elements with `.card` class get hover lift and shadow effects (add `.no-hover` to disable)

### 5. Image Hover Effects

For images that should zoom slightly on hover:

```html
<div class="img-hover-zoom">
  <img src="..." alt="...">
</div>
```

### 6. Page Loading Animation

A loading spinner appears automatically while the page loads.

## Accessibility

The animation system respects the user's "prefers-reduced-motion" setting in their browser. When this is enabled:

- All animations are disabled
- Smooth scrolling is disabled
- Page transitions are instantaneous

## Automatic Application

The JavaScript applies animations to common elements automatically:

- Section headings
- Cards in grid layouts
- Images within sections

You don't need to manually add animation classes to these elements.

## Example Usage

See `templates/animation_template.html` for examples of how to use the animation system in different layouts.

## Creating Custom Animations

To add a custom animation:

1. Define the animation in `animations.css` using keyframes
2. Add the classes in appropriate selectors
3. If needed, extend the JavaScript to support new animation types

## Troubleshooting

- If animations don't trigger, check if the element is visible when the page loads
- For performance reasons, avoid animating very large elements
- If there are conflicts with other animations, increase CSS specificity 