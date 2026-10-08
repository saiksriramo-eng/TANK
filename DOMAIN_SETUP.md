# Custom Domain Configuration Guide for TANK

This document provides step-by-step instructions for connecting a custom domain to your TANK deployment prior to production launch.

---

### 1. Configure Application Environment
In `.env.local` (or your hosting platform environment variables dashboard):
```env
NEXT_PUBLIC_SITE_URL="https://tank.yourdomain.com"
```

---

### 2. DNS Provider Configuration

#### Option A: Vercel Deployment
1. Navigate to your project on Vercel: **Project Settings > Domains**.
2. Enter your desired domain (e.g., `tank.yourdomain.com` or `yourdomain.com`).
3. Add the corresponding DNS record at your domain registrar (Namecheap, Cloudflare, GoDaddy):
   * **For apex domain (`yourdomain.com`):**
     * Type: `A`
     * Name: `@`
     * Value: `76.76.21.21`
   * **For subdomain (`tank.yourdomain.com`):**
     * Type: `CNAME`
     * Name: `tank`
     * Value: `cname.vercel-dns.com`

#### Option B: Cloudflare Pages / Workers
1. Navigate to **Workers & Pages > Custom Domains**.
2. Select your domain. Cloudflare will automatically configure the SSL/TLS certificate and proxy DNS records.

#### Option C: Self-Hosted / VPS (Nginx Reverse Proxy)
Configure your Nginx block to forward requests to the Node.js process:
```nginx
server {
    server_name tank.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/tank.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tank.yourdomain.com/privkey.pem;
}
```

---

### 3. Verification Checklist Prior to Launch
* [ ] DNS records propagated (verify via `dig tank.yourdomain.com` or `nslookup`).
* [ ] SSL/TLS certificate issued and active (HTTPS enforced).
* [ ] Favicon rendered in browser tab (`/icon.svg`).
* [ ] Privacy policy accessible at `/privacy`.
* [ ] Terms and conditions accessible at `/terms`.
* [ ] All three core routes accessible (`/`, `/arena`, `/report`).
