# Agrimensore Landing Page

Professional construction site management platform landing page built with Next.js 16, React 19, and Tailwind CSS.

## Features

- ✅ Secure form submission via server actions
- ✅ Environment-based configuration
- ✅ SEO optimized with metadata
- ✅ Security headers configured
- ✅ Form validation with Zod
- ✅ Multilingual support (Italian, English, German, French, Spanish, Portuguese, Dutch, Polish)
- ✅ Responsive design
- ✅ Cookie consent management
- ✅ Accessibility improvements

## Setup

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Then edit `.env.local`:

```env
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_id
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Uncomment to enable Google Analytics
# NEXT_PUBLIC_FACEBOOK_PIXEL_ID=YOUR_PIXEL_ID  # Uncomment to enable Facebook Pixel
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 3. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── layout.tsx          # Root layout with metadata
├── page.tsx            # Main landing page
├── globals.css         # Global styles
├── actions/
│   └── contact.ts      # Server action for form submission
└── cookie/
    └── page.tsx        # Cookie policy page
├── privacy/
│   └── page.tsx        # Privacy policy page
└── partners/
    └── page.tsx        # Partners page

components/
├── ContactModal.tsx    # Form modal component
└── ui/                 # shadcn/ui components

lib/
└── metadata.ts         # SEO metadata configuration
```

## Form Submission

The contact form uses:

1. **Client-side validation**: Real-time feedback via form component
2. **Server-side validation**: Zod schema validation in server action
3. **Error handling**: Comprehensive error messages and retry logic
4. **Security**: CSRF protection via Next.js server actions

## Security

This project includes:

- ✅ XSS Protection headers
- ✅ CSRF Protection (server actions)
- ✅ Content Security Policy headers
- ✅ Secure form validation
- ✅ Rate limiting ready (implement with Redis)
- ✅ Environment variable protection

## Performance

- Server-side rendering (SSR)
- Optimized images
- CSS utility framework (Tailwind)
- Minimal JavaScript bundle
- Fast static generation

## SEO

- Metadata tags for all pages
- Open Graph tags
- Twitter Card support
- Structured data (JSON-LD)
- Canonical URLs
- Sitemap ready

## Analytics (Optional)

To enable tracking:

1. **Google Analytics**: Set `NEXT_PUBLIC_GA_ID` in `.env.local`
2. **Facebook Pixel**: Set `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` in `.env.local`

Uncomment the analytics section in `page.tsx` after setting environment variables.

## Deployment

### Vercel (Recommended)

```bash
npm run build
vercel deploy
```

### Docker

```bash
docker build -t agrimensore-landing .
docker run -p 3000:3000 agrimensore-landing
```

### Self-hosted

```bash
npm run build
npm start
```

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari 14+
- Mobile browsers

## Key Improvements Made

1. **Server Actions**: Form submission moved from exposed API to secure server action
2. **Validation**: Comprehensive input validation with Zod
3. **Error Handling**: Better error feedback to users
4. **SEO**: Full metadata, Open Graph, structured data
5. **Security**: Headers configured, CSRF protection enabled
6. **Accessibility**: Improved form labels, ARIA attributes
7. **Component Organization**: Extracted ContactModal for reusability
8. **Environment Config**: All sensitive URLs moved to environment variables

## Testing Pre-Launch

- [ ] Test form submission
- [ ] Test email validation
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit
- [ ] Test keyboard navigation
- [ ] Test with screen readers
- [ ] Test analytics (if enabled)
- [ ] Load test form submission

## Contributing

For changes, please create a pull request with a clear description of modifications.

## License

Proprietary © 2026 Agrimensore SRLS

## Support

For issues or questions, contact: support@agrimensore.com
