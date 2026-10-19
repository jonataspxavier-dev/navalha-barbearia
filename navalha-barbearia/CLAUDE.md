# Navalha Barbearia — regras do projeto

Landing page de portfólio para barbearia fictícia. Ver `../Plano.md` para o escopo completo e as fases.

## Regras fixas

- Só HTML5, CSS3 e JavaScript puro (ES6+). Sem frameworks, sem bibliotecas externas, sem build step.
- Mobile-first: layout correto de 320px a 1920px, sem rolagem horizontal.
- Acessibilidade AA: HTML semântico, `alt` em todas as imagens, contraste AA, foco visível, navegável só com teclado.
- SEO/Open Graph: meta tags e favicon no `index.html`.
- Imagens otimizadas em WebP com `loading="lazy"`.
- Zero erros no console.
- Meta: nota ≥ 90 no Lighthouse em Performance, Acessibilidade, Boas Práticas e SEO.

## Estrutura

```
index.html
css/{reset,variables,style}.css
js/{data,menu,gallery,carousel,form,theme,main}.js
assets/img/
```

Dados de serviços, depoimentos e horários ficam em `js/data.js` (array de objetos), nunca hardcoded no HTML.
