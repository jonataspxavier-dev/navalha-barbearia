# Projeto 1 — Landing Page Responsiva "Navalha Barbearia"

> Plano para rodar no Claude Code. Cole este arquivo na raiz de uma pasta vazia como `PLANO.md` e siga as fases em ordem.

## Objetivo

Criar uma landing page profissional para uma barbearia **fictícia**, usando só HTML, CSS e JavaScript puro. É o tipo de projeto mais pedido no Workana (sites institucionais e landing pages), então é a peça de portfólio com maior retorno.

**Tempo estimado:** 1 a 2 dias
**Stack:** HTML5, CSS3 (Flexbox/Grid, variáveis CSS), JavaScript (ES6+), sem frameworks
**Deploy:** GitHub Pages (gratuito)

## Funcionalidades (escopo fechado)

1. **Header fixo** com logo, menu e botão "Agendar". Vira menu hambúrguer no celular.
2. **Hero** com título, subtítulo, botão de chamada e imagem de fundo.
3. **Serviços**: cards com nome, descrição, duração e preço (dados vindos de um array em JS).
4. **Galeria** com lightbox (clicar na foto abre em tela cheia, setas para navegar, ESC fecha).
5. **Depoimentos** em carrossel automático com pausa ao passar o mouse. Usar textos claramente fictícios.
6. **Formulário de agendamento** com validação em JS (nome, telefone com máscara, serviço, data e horário). Na hora de enviar, mostra mensagem de sucesso e salva em `localStorage`.
7. **Mapa e horário de funcionamento**, com destaque "Aberto agora / Fechado" calculado pela hora atual.
8. **Botão de WhatsApp flutuante** (número fictício).
9. **Modo escuro** com alternância e preferência salva.
10. **Animações on-scroll** com `IntersectionObserver`.

## Requisitos de qualidade

- Mobile-first, sem rolagem horizontal entre 320px e 1920px
- Nota ≥ 90 no Lighthouse em Performance, Acessibilidade, Boas Práticas e SEO
- HTML semântico (`header`, `nav`, `main`, `section`, `footer`), `alt` em todas as imagens, contraste AA
- Meta tags de SEO e Open Graph, favicon
- Imagens otimizadas (WebP, `loading="lazy"`)
- Nenhum erro no console

## Estrutura de pastas

```
navalha-barbearia/
├── index.html
├── css/
│   ├── reset.css
│   ├── variables.css
│   └── style.css
├── js/
│   ├── data.js          # serviços, depoimentos, horários
│   ├── menu.js
│   ├── gallery.js
│   ├── carousel.js
│   ├── form.js
│   ├── theme.js
│   └── main.js
├── assets/img/
├── README.md
└── PLANO.md
```

## Fases — prompts para colar no Claude Code

**Fase 0 — Setup**
```
Leia o PLANO.md. Crie a estrutura de pastas, inicialize um repositório git, crie um .gitignore e um CLAUDE.md resumindo as regras do projeto (só HTML/CSS/JS puro, mobile-first, acessibilidade AA). Não escreva código ainda.
```

**Fase 1 — Estrutura e estilo base**
```
Implemente o index.html semântico com todas as seções do PLANO.md (conteúdo provisório) e o CSS base: reset, variáveis de cor/tipografia (tema claro e escuro), header fixo e layout responsivo mobile-first. Use imagens de placeholder livres de direitos.
```

**Fase 2 — Seções de conteúdo**
```
Implemente as seções Serviços (renderizada a partir de js/data.js), Galeria com lightbox acessível (teclado e ESC), Depoimentos em carrossel com pausa no hover e o bloco de horário com status "Aberto agora/Fechado".
```

**Fase 3 — Formulário e interações**
```
Implemente o formulário de agendamento com validação, máscara de telefone, bloqueio de datas passadas e de horários fora do expediente, mensagem de sucesso e gravação em localStorage. Adicione o menu hambúrguer, o botão de WhatsApp, o modo escuro e as animações on-scroll com IntersectionObserver.
```

**Fase 4 — Qualidade**
```
Revise o projeto inteiro: rode uma auditoria Lighthouse (via npx lighthouse ou explique como eu rodo), corrija o que estiver abaixo de 90, confira contraste, alt, foco visível e navegação só por teclado. Otimize as imagens para WebP. Liste o que mudou.
```

**Fase 5 — Publicação**
```
Escreva um README.md profissional (descrição, prints, tecnologias, funcionalidades, como rodar, link do deploy). Me passe o passo a passo para publicar no GitHub Pages.
```

## Critérios de pronto

- [ ] Todas as 10 funcionalidades funcionando no celular e no desktop
- [ ] Lighthouse ≥ 90 nas quatro categorias
- [ ] Publicado no GitHub Pages com link funcionando
- [ ] README com prints de desktop e celular

## Como cadastrar no Workana

- **Título:** Landing Page Responsiva para Barbearia
- **Habilidades:** JavaScript, HTML, CSS
- **Descrição:** Landing page completa e responsiva com agendamento online validado, galeria com lightbox, carrossel de depoimentos, modo escuro e nota acima de 90 no Google Lighthouse. Desenvolvida com HTML, CSS e JavaScript puro, focada em velocidade e conversão.
- **Imagens:** print do desktop, print do celular e print da nota do Lighthouse
- **Link:** URL do GitHub Pages
