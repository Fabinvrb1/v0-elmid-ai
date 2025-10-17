# SEO Setup Guide - Elmid AI

## Variáveis de Ambiente Necessárias

Adicione as seguintes variáveis de ambiente no seu projeto Vercel ou arquivo `.env.local`:

\`\`\`env
# Site URL (OBRIGATÓRIO)
NEXT_PUBLIC_SITE_URL=https://elmid.ai

# Google Analytics (opcional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google Search Console Verification (opcional)
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-verification-code
\`\`\`

## Estrutura de Arquivos Implementada

### 1. Metadata Dinâmico
- ✅ `app/layout.tsx` - Metadata global com Open Graph e Twitter Cards
- ✅ `app/page.tsx` - Metadata específico da home
- ✅ `app/contato/page.tsx` - Metadata específico da página de contato

### 2. Structured Data (JSON-LD)
- ✅ `components/structured-data.tsx` - Componente com todos os schemas:
  - Organization Schema
  - WebSite Schema
  - LocalBusiness Schema
  - BreadcrumbList Schema

### 3. SEO Files
- ✅ `app/sitemap.ts` - Sitemap dinâmico XML
- ✅ `app/robots.ts` - Robots.txt configurado
- ✅ `public/manifest.json` - PWA manifest

### 4. Icons e Favicons
- ✅ `public/favicon.ico` - Favicon padrão
- ✅ `public/icon.jpg` - Icon 32x32
- ✅ `public/icon-192.jpg` - Icon 192x192 (PWA)
- ✅ `public/icon-512.jpg` - Icon 512x512 (PWA)
- ✅ `public/apple-touch-icon.jpg` - Apple touch icon 180x180
- ✅ `public/images/og-image.jpg` - Open Graph image 1200x630
- ✅ `public/images/twitter-image.jpg` - Twitter card image 1200x630

## Como Testar

### 1. Structured Data
Teste seus schemas em:
- https://search.google.com/test/rich-results
- https://validator.schema.org/

### 2. Open Graph
Teste suas meta tags em:
- https://www.opengraph.xyz/
- https://developers.facebook.com/tools/debug/

### 3. Twitter Cards
Teste seus cards em:
- https://cards-dev.twitter.com/validator

### 4. Sitemap
Acesse: `https://elmid.ai/sitemap.xml`

### 5. Robots.txt
Acesse: `https://elmid.ai/robots.txt`

## Próximos Passos

1. **Google Search Console**
   - Adicione seu site: https://search.google.com/search-console
   - Verifique a propriedade usando a meta tag no layout.tsx
   - Envie o sitemap: `https://elmid.ai/sitemap.xml`

2. **Google Analytics**
   - Configure GA4 e adicione o ID em `NEXT_PUBLIC_GA_ID`

3. **Bing Webmaster Tools**
   - Adicione seu site: https://www.bing.com/webmasters

4. **Atualize Informações**
   - Edite `components/structured-data.tsx` com informações reais:
     - Endereço completo
     - Telefone real
     - Coordenadas GPS corretas
     - Links de redes sociais

5. **Imagens Personalizadas**
   - Substitua as imagens geradas por versões profissionais:
     - `/images/og-image.jpg` - 1200x630px
     - `/images/twitter-image.jpg` - 1200x630px
     - Todos os favicons com logo real

## Checklist de SEO

- ✅ Meta tags básicas (title, description, keywords)
- ✅ Open Graph tags (Facebook)
- ✅ Twitter Cards
- ✅ Canonical URLs
- ✅ Structured Data (JSON-LD)
- ✅ Sitemap XML
- ✅ Robots.txt
- ✅ Favicons e app icons
- ✅ PWA manifest
- ✅ Responsive meta viewport
- ✅ Language declaration (pt-BR)
- ✅ Breadcrumb navigation
- ⏳ Google Search Console verification
- ⏳ Google Analytics setup
- ⏳ Performance optimization (Core Web Vitals)

## Dicas Adicionais

1. **Performance**: Use Next.js Image component para otimizar imagens
2. **Acessibilidade**: Garanta alt text em todas as imagens
3. **Mobile-First**: Teste em dispositivos móveis
4. **Core Web Vitals**: Monitore LCP, FID, CLS
5. **Content**: Atualize conteúdo regularmente
6. **Backlinks**: Construa links de qualidade
7. **Local SEO**: Otimize para buscas locais (Google My Business)

## Recursos Úteis

- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org Documentation](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)
- [Web.dev SEO Guide](https://web.dev/learn/seo/)
