# Google Analytics 4 - Guia de Configuração

Este projeto está configurado com Google Analytics 4 (GA4) para tracking completo de eventos e comportamento do usuário.

## 📋 Configuração Inicial

### 1. Obter o ID do Google Analytics

1. Acesse [Google Analytics](https://analytics.google.com/)
2. Crie uma nova propriedade GA4 (ou use uma existente)
3. Copie o **Measurement ID** (formato: `G-XXXXXXXXXX`)

### 2. Configurar Variável de Ambiente

Adicione a seguinte variável de ambiente no seu projeto:

\`\`\`env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
\`\`\`

**Importante:** 
- O Google Analytics **só funciona em produção** (não em desenvolvimento)
- A variável deve começar com `NEXT_PUBLIC_` para ser acessível no cliente
- Substitua `G-XXXXXXXXXX` pelo seu Measurement ID real

### 3. Deploy

Após adicionar a variável de ambiente, faça o deploy do projeto. O Google Analytics começará a coletar dados automaticamente.

## 📊 Eventos Rastreados

### Eventos Automáticos

- **Pageviews**: Rastreamento automático de visualizações de página
- **Scroll Depth**: 25%, 50%, 75%, 100% da página
- **Time on Page**: 30s, 1min, 3min

### Eventos de Conversão

- **CTA Clicks**: Todos os botões de call-to-action
  - "Iniciar Projeto" (Hero Section)
  - "Ver Nosso Trabalho" (Hero Section)
  - "Começar Agora" (CTA Section)
  - "Agendar Reunião" (CTA Section)

- **Form Submissions**: 
  - Sucesso no envio do formulário de contato
  - Erros no envio do formulário

### Eventos de Contato

- **Email Click**: Clique no email no footer
- **Phone Click**: Clique no telefone no footer
- **WhatsApp Click**: Clique no botão do WhatsApp (se implementado)

### Eventos de Engajamento

- **Portfolio View**: Visualização de projetos no portfólio
- **File Download**: Download de materiais

## 🔧 Como Usar nos Componentes

### Hook useGoogleAnalytics

\`\`\`tsx
import { useGoogleAnalytics } from "@/hooks/use-google-analytics"

function MyComponent() {
  const { trackCTA, trackEvent } = useGoogleAnalytics()

  return (
    <button onClick={() => trackCTA("Nome do Botão", "Localização")}>
      Clique Aqui
    </button>
  )
}
\`\`\`

### Métodos Disponíveis

\`\`\`tsx
const {
  trackEvent,        // Evento genérico
  trackCTA,          // Clique em CTA
  trackForm,         // Envio de formulário
  trackWhatsApp,     // Clique no WhatsApp
  trackContact,      // Clique em email/telefone
  trackFileDownload, // Download de arquivo
  trackPortfolio,    // Visualização de portfólio
} = useGoogleAnalytics()
\`\`\`

### Tracking de Scroll e Tempo

\`\`\`tsx
import { useScrollTracking } from "@/hooks/use-scroll-tracking"

function MyPage() {
  useScrollTracking() // Adicione no componente da página
  
  return <div>...</div>
}
\`\`\`

## 🔒 GDPR/LGPD Compliance

O Google Analytics está configurado com:

- ✅ **IP Anonymization**: IPs dos usuários são anonimizados
- ✅ **Cookie Flags**: Cookies configurados com `SameSite=None;Secure`
- ✅ **Production Only**: Não coleta dados em desenvolvimento

### Adicionar Consent Banner (Opcional)

Para total compliance com GDPR/LGPD, considere adicionar um banner de consentimento de cookies. Bibliotecas recomendadas:

- [react-cookie-consent](https://www.npmjs.com/package/react-cookie-consent)
- [cookieyes](https://www.cookieyes.com/)
- [onetrust](https://www.onetrust.com/)

## 📈 Visualizar Dados

1. Acesse [Google Analytics](https://analytics.google.com/)
2. Selecione sua propriedade
3. Navegue para **Relatórios** > **Eventos** para ver todos os eventos customizados

### Eventos Customizados no GA4

Todos os eventos aparecem em:
- **Relatórios** > **Engajamento** > **Eventos**
- **Explorar** > **Análise de eventos**

## 🧪 Testar em Desenvolvimento

Para testar o Google Analytics localmente:

1. Temporariamente remova a verificação de produção em `lib/gtag.ts`:

\`\`\`ts
// Antes
export const isGAEnabled = (): boolean => {
  return process.env.NODE_ENV === 'production' && !!GA_TRACKING_ID
}

// Para testar (REMOVER DEPOIS)
export const isGAEnabled = (): boolean => {
  return !!GA_TRACKING_ID
}
\`\`\`

2. Use a extensão [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger) no Chrome
3. **IMPORTANTE**: Reverta a mudança antes do deploy

## 📝 Estrutura de Arquivos

\`\`\`
lib/
  └── gtag.ts                    # Funções helper do GA
hooks/
  ├── use-google-analytics.ts    # Hook para tracking
  └── use-scroll-tracking.ts     # Hook para scroll/tempo
components/
  └── google-analytics.tsx       # Componente do GA4
\`\`\`

## 🆘 Troubleshooting

### Eventos não aparecem no GA4

1. Verifique se a variável `NEXT_PUBLIC_GA_ID` está configurada
2. Confirme que está em produção (não em localhost)
3. Aguarde 24-48h para os dados aparecerem nos relatórios
4. Use o **DebugView** no GA4 para ver eventos em tempo real

### Como acessar o DebugView

1. No GA4, vá em **Admin** > **DebugView**
2. Instale a extensão [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger)
3. Ative a extensão e navegue no site
4. Veja os eventos em tempo real no DebugView

## 📚 Recursos

- [Documentação GA4](https://developers.google.com/analytics/devguides/collection/ga4)
- [Next.js Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
- [gtag.js Reference](https://developers.google.com/tag-platform/gtagjs/reference)
