# SEO Optimizer

Comprehensive SEO assistance for the fitness website including meta tags, content optimization, and technical SEO.

## Triggers

- /seo
- /optimize
- /meta

## Instructions

### Meta Tags & Open Graph

When generating meta tags for a page:

```html
<!-- Primary Meta Tags -->
<title>{Page Title} | FitTrack - Your Fitness Journey</title>
<meta name="description" content="{150-160 char description with keywords}">
<meta name="keywords" content="{relevant, comma, separated, keywords}">
<meta name="author" content="FitTrack">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="{page URL}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{description}">
<meta property="og:image" content="{image URL - 1200x630px recommended}">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="{page URL}">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{description}">
<meta name="twitter:image" content="{image URL}">

<!-- Mobile -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#FF6B00">
```

### Content Optimization

When analyzing or creating content:

1. **Keyword Strategy**
   - Primary keyword in title, H1, first paragraph
   - Secondary keywords in H2s and body content
   - Keyword density: 1-2% (natural usage)
   - LSI (related) keywords throughout

2. **Heading Structure**
   - One H1 per page (include primary keyword)
   - Logical H2-H6 hierarchy
   - Descriptive, keyword-rich headings

3. **Content Guidelines**
   - Minimum 300 words for standard pages
   - 1000+ words for blog/article content
   - Short paragraphs (2-3 sentences)
   - Bullet points and lists for scannability
   - Internal links to related content

4. **Image Optimization**
   - Descriptive file names: `workout-tracking-dashboard.png`
   - Alt text with keywords: `alt="Fitness tracking dashboard showing weekly progress"`
   - Compressed images (WebP preferred)
   - Lazy loading for below-fold images

### Technical SEO

#### Schema Markup (JSON-LD)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "FitTrack",
  "description": "Track your workouts and fitness progress",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
</script>
```

#### Robots.txt Template

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/

Sitemap: https://yoursite.com/sitemap.xml
```

#### Sitemap Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yoursite.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- Add all public pages -->
</urlset>
```

#### Performance Checklist

- [ ] Core Web Vitals optimized (LCP, FID, CLS)
- [ ] Images optimized and lazy loaded
- [ ] CSS/JS minified and bundled
- [ ] Gzip/Brotli compression enabled
- [ ] CDN for static assets
- [ ] Preconnect to required origins
- [ ] Critical CSS inlined

### Fitness-Specific Keywords

Primary keywords to target:
- workout tracker, fitness app, exercise log
- progress tracking, fitness goals, habit tracker
- workout planner, gym tracker, health tracking

Long-tail keywords:
- track daily workouts online
- free fitness progress tracker
- workout streak tracker app

## Example Usage

User: /seo generate meta tags for the dashboard page
Assistant: Creates complete meta tags with fitness-focused keywords

User: /optimize analyze this page content for SEO
Assistant: Reviews content structure, keyword usage, and provides improvement suggestions

User: /meta add schema markup for an exercise page
Assistant: Generates appropriate JSON-LD schema for exercise/workout content
