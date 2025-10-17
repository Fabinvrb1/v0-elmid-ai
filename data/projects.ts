export interface Project {
  id: string
  slug: string
  title: string
  tagline: string
  description: string
  client?: string
  year: number
  category: "web" | "mobile" | "system" | "ai"
  image: string
  images: string[] // galeria
  technologies: string[]
  challenge: string
  solution: string
  results: {
    metric: string
    value: string
  }[]
  testimonial?: {
    text: string
    author: string
    role: string
    company: string
  }
  link?: string
  github?: string
  featured: boolean
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "plataforma-ecommerce-ia",
    title: "Plataforma E-commerce com IA",
    tagline: "Recomendações personalizadas que aumentaram vendas em 85%",
    description:
      "Plataforma completa de e-commerce com sistema de recomendação baseado em IA, análise de comportamento do usuário e checkout otimizado.",
    client: "Fashion Store Brasil",
    year: 2024,
    category: "ai",
    image: "/modern-ecommerce-dashboard.png",
    images: [
      "/ecommerce-product-listing.png",
      "/ecommerce-checkout.png",
      "/ecommerce-admin-dashboard-analytics.jpg",
      "/ecommerce-mobile-app-interface.jpg",
    ],
    technologies: ["Next.js", "TypeScript", "TensorFlow", "PostgreSQL", "Stripe", "Tailwind CSS", "Vercel"],
    challenge:
      "O cliente tinha uma taxa de conversão baixa (1.2%) e os usuários abandonavam o carrinho frequentemente. A navegação era confusa e não havia personalização na experiência de compra.",
    solution:
      "Desenvolvemos uma plataforma moderna com sistema de recomendação baseado em IA que analisa o comportamento do usuário em tempo real. Implementamos checkout em uma página, otimização de performance e interface intuitiva com design system consistente.",
    results: [
      { metric: "Aumento nas Vendas", value: "+85%" },
      { metric: "Taxa de Conversão", value: "3.8%" },
      { metric: "Tempo de Carregamento", value: "0.8s" },
      { metric: "Satisfação do Cliente", value: "4.9/5" },
    ],
    testimonial: {
      text: "A Elmid AI transformou completamente nosso negócio. A plataforma é incrivelmente rápida e as recomendações de IA realmente funcionam. Nossos clientes adoram a nova experiência.",
      author: "Maria Silva",
      role: "CEO",
      company: "Fashion Store Brasil",
    },
    link: "https://example.com",
    featured: true,
  },
  {
    id: "2",
    slug: "app-gestao-financeira",
    title: "App de Gestão Financeira",
    tagline: "Controle financeiro inteligente para PMEs",
    description:
      "Aplicativo mobile completo para gestão financeira de pequenas e médias empresas com dashboards em tempo real, relatórios automáticos e integração bancária.",
    client: "FinControl",
    year: 2024,
    category: "mobile",
    image: "/financial-management-mobile-app.jpg",
    images: [
      "/financial-dashboard-mobile.jpg",
      "/expense-tracking-interface.jpg",
      "/financial-report-charts.png",
      "/bank-integration-screen.jpg",
    ],
    technologies: ["React Native", "TypeScript", "Node.js", "MongoDB", "AWS", "Plaid API"],
    challenge:
      "PMEs gastavam em média 15 horas por semana em tarefas financeiras manuais. Falta de visibilidade em tempo real sobre o fluxo de caixa causava problemas de gestão.",
    solution:
      "Criamos um app mobile nativo com sincronização automática de contas bancárias, categorização inteligente de despesas usando ML, e dashboards personalizáveis. Implementamos notificações proativas para alertas financeiros importantes.",
    results: [
      { metric: "Economia de Tempo", value: "12h/semana" },
      { metric: "Usuários Ativos", value: "5.000+" },
      { metric: "Rating na Store", value: "4.8/5" },
      { metric: "Redução de Erros", value: "95%" },
    ],
    testimonial: {
      text: "Finalmente conseguimos ter controle total das nossas finanças. O app é intuitivo e as integrações bancárias funcionam perfeitamente. Recomendo para qualquer empresa.",
      author: "João Santos",
      role: "Diretor Financeiro",
      company: "FinControl",
    },
    github: "https://github.com",
    featured: true,
  },
  {
    id: "3",
    slug: "sistema-erp-industria",
    title: "Sistema ERP para Indústria",
    tagline: "Gestão completa de produção e estoque",
    description:
      "Sistema ERP customizado para indústria de manufatura com controle de produção, estoque, compras, vendas e relatórios gerenciais integrados.",
    client: "Indústria TechParts",
    year: 2023,
    category: "system",
    image: "/industrial-erp-system-dashboard.jpg",
    images: [
      "/production-management-interface.jpg",
      "/inventory-control-system.jpg",
      "/erp-analytics-dashboard.jpg",
      "/supply-chain-network.png",
    ],
    technologies: ["Next.js", "PostgreSQL", "Prisma", "Redis", "Docker", "TypeScript"],
    challenge:
      "A empresa usava múltiplos sistemas desconectados, causando retrabalho e falta de visibilidade. Processos manuais geravam atrasos na produção e erros no estoque.",
    solution:
      "Desenvolvemos um ERP completo e integrado com módulos de produção, estoque, compras e vendas. Implementamos automações para processos repetitivos e dashboards em tempo real para tomada de decisão.",
    results: [
      { metric: "Redução de Custos", value: "40%" },
      { metric: "Aumento de Produtividade", value: "+60%" },
      { metric: "Acurácia de Estoque", value: "99.5%" },
      { metric: "ROI", value: "8 meses" },
    ],
    testimonial: {
      text: "O sistema revolucionou nossa operação. Agora temos visibilidade completa de toda a cadeia produtiva e conseguimos tomar decisões baseadas em dados reais.",
      author: "Carlos Mendes",
      role: "Gerente de Operações",
      company: "Indústria TechParts",
    },
    featured: false,
  },
  {
    id: "4",
    slug: "portal-educacional",
    title: "Portal Educacional Interativo",
    tagline: "Plataforma de ensino com gamificação",
    description:
      "Portal educacional completo com sistema de cursos, gamificação, acompanhamento de progresso e ferramentas de interação entre alunos e professores.",
    client: "EduTech Academy",
    year: 2024,
    category: "web",
    image: "/educational-platform-interface.png",
    images: [
      "/online-course-player.jpg",
      "/student-dashboard-progress.jpg",
      "/gamification-badges-achievements.jpg",
      "/teacher-admin-panel.jpg",
    ],
    technologies: ["Next.js", "Supabase", "Tailwind CSS", "Vercel", "Stripe", "WebRTC"],
    challenge:
      "A plataforma anterior tinha baixo engajamento dos alunos (35% de conclusão) e falta de ferramentas para professores acompanharem o progresso individual.",
    solution:
      "Criamos uma plataforma moderna com sistema de gamificação (pontos, badges, rankings), videoaulas interativas, quizzes adaptativos e dashboard completo para professores. Implementamos sistema de notificações e comunidade integrada.",
    results: [
      { metric: "Taxa de Conclusão", value: "78%" },
      { metric: "Alunos Ativos", value: "12.000+" },
      { metric: "Tempo Médio na Plataforma", value: "+150%" },
      { metric: "NPS", value: "85" },
    ],
    testimonial: {
      text: "A nova plataforma superou todas as expectativas. Os alunos estão muito mais engajados e os professores adoram as ferramentas de acompanhamento.",
      author: "Ana Paula",
      role: "Diretora Pedagógica",
      company: "EduTech Academy",
    },
    link: "https://example.com",
    featured: true,
  },
  {
    id: "5",
    slug: "chatbot-atendimento-ia",
    title: "Chatbot de Atendimento com IA",
    tagline: "Atendimento 24/7 com 95% de resolução automática",
    description:
      "Sistema de chatbot inteligente com processamento de linguagem natural, integração com CRM e capacidade de escalar para atendimento humano quando necessário.",
    client: "ServicePro",
    year: 2024,
    category: "ai",
    image: "/ai-chatbot-interface.png",
    images: [
      "/chatbot-conversation-interface.jpg",
      "/chatbot-analytics-dashboard.jpg",
      "/chatbot-training-interface.jpg",
      "/placeholder.svg?height=800&width=1200",
    ],
    technologies: ["Next.js", "OpenAI GPT-4", "Vercel AI SDK", "PostgreSQL", "WebSocket", "TypeScript"],
    challenge:
      "A empresa recebia 500+ tickets diários, com tempo médio de resposta de 4 horas. Custos com equipe de atendimento eram altos e satisfação do cliente estava em queda.",
    solution:
      "Desenvolvemos um chatbot inteligente usando GPT-4 com conhecimento específico do negócio. Implementamos sistema de escalação inteligente para casos complexos e dashboard de analytics para monitoramento contínuo.",
    results: [
      { metric: "Resolução Automática", value: "95%" },
      { metric: "Tempo de Resposta", value: "<30s" },
      { metric: "Redução de Custos", value: "70%" },
      { metric: "CSAT", value: "4.7/5" },
    ],
    testimonial: {
      text: "O chatbot da Elmid AI transformou nosso atendimento. Conseguimos atender muito mais clientes com qualidade superior e custos menores.",
      author: "Roberto Lima",
      role: "Head de Customer Success",
      company: "ServicePro",
    },
    featured: false,
  },
]

// Helper functions
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getProjectsByCategory(category: Project["category"]): Project[] {
  return projects.filter((project) => project.category === category)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured)
}

export function getRelatedProjects(currentProjectId: string, category: Project["category"], limit = 3): Project[] {
  return projects.filter((project) => project.id !== currentProjectId && project.category === category).slice(0, limit)
}
