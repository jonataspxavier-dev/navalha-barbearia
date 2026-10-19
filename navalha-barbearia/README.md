# Navalha Barbearia — Landing Page

Landing page responsiva para uma barbearia **fictícia**, construída como peça de portfólio. HTML, CSS e JavaScript puro, sem frameworks e sem build step.

![Desktop](assets/img/screenshot-desktop.jpg)
![Mobile](assets/img/screenshot-mobile.jpg)

## Funcionalidades

- Header fixo com menu hambúrguer no mobile
- Hero com chamada para agendamento
- Serviços renderizados a partir de `js/data.js`
- Galeria com lightbox acessível (teclado, setas, ESC) com fotos reais de barbearia
- Carrossel de depoimentos com autoplay, pausa no hover e transição em slide
- Formulário de agendamento com máscara de telefone, calendário customizado (bloqueia datas passadas e dias fechados) e grade de horários disponíveis conforme o expediente do dia, com gravação em `localStorage`
- Horário de funcionamento com status "Aberto agora / Fechado" calculado em tempo real
- Botão flutuante de WhatsApp com pulso sutil
- Modo escuro com preferência salva (respeita `prefers-color-scheme`)
- Animações on-scroll com `IntersectionObserver`, entrada animada do hero e header com sombra ao rolar

## Tecnologias

HTML5 semântico, CSS3 (variáveis, Flexbox, Grid) e JavaScript ES6+. Nenhuma dependência externa além de imagens (fotos de barbearia via Unsplash).

## Qualidade

Auditado com [Lighthouse](https://developer.chrome.com/docs/lighthouse/) via `npx lighthouse`:

| Categoria       | Nota |
| --------------- | ---- |
| Performance     | 100  |
| Acessibilidade  | 100  |
| Boas Práticas   | 100  |
| SEO             | 100  |

Também verificado manualmente: navegação só por teclado, skip link, foco visível e ausência de rolagem horizontal entre 320px e 1920px.

## Como rodar localmente

Qualquer servidor estático funciona. Por exemplo, com Python:

```bash
cd navalha-barbearia
python -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## Como publicar no GitHub Pages

1. No GitHub, abra o repositório e vá em **Settings → Pages**.
2. Em "Build and deployment", selecione **Deploy from a branch**.
3. Escolha a branch `main` e a pasta `/ (root)`.
4. Salve. O site ficará disponível em alguns minutos em:
   `https://<seu-usuário>.github.io/<nome-do-repo>/navalha-barbearia/`

> O GitHub Pages gratuito só funciona com repositórios **públicos**. Se o repositório estiver privado, torne-o público antes (Settings → General → Danger Zone → Change visibility) ou use um plano pago do GitHub que suporte Pages em repositórios privados.

Alternativamente, pelo GitHub CLI:

```bash
gh repo edit <seu-usuário>/<nome-do-repo> --visibility public
gh api -X POST repos/<seu-usuário>/<nome-do-repo>/pages -f "source[branch]=main" -f "source[path]=/"
```

## Link do deploy

_Adicione aqui a URL do GitHub Pages depois de publicar._
