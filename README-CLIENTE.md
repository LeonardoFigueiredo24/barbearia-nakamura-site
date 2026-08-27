# Barbearia Nakamura — Site institucional

## O que tem aqui
```
index.html
robots.txt
sitemap.xml
site.webmanifest
favicon.ico
assets/
  css/styles.css
  js/main.js
  fonts/       → Anton, Oswald, Poppins (self-hosted, ~104KB total)
  img/         → fotos tratadas + logo + favicons + og-image.jpg
```
Site estático puro (HTML/CSS/JS, sem build step, sem framework) — sobe direto no
Cloudflare Pages arrastando a pasta, ou via Git.

## ⚠️ Antes de publicar — trocar o domínio placeholder
Usei `https://www.barbearianakamura.com.br/` como placeholder em 4 lugares
(ele não existe ainda, é só um espaço reservado). Busque por
`barbearianakamura.com.br` e troque pelo domínio real em:
- `index.html` → `<link rel="canonical">`, tags `og:url`/`og:image`/`twitter:image`, e o bloco JSON-LD no final do `<head>`
- `robots.txt` → linha `Sitemap:`
- `sitemap.xml` → `<loc>`

## Decisões de conteúdo (nada foi inventado)
- **Preços**: vieram direto da tabela oficial que estava nas fotos (print da
  Barbearia Nakamura). Estão em `assets/img/tabela-oficial.webp` caso queira
  usar em algum post — não usei essa imagem no site, recriei os dados em HTML
  (melhor pra SEO/acessibilidade), mas os valores são exatamente os mesmos.
- **Horário de funcionamento**: não veio no briefing nem nas fotos, então não
  inventei nada — o site direciona pra confirmar horário pelo WhatsApp. Se o
  cliente passar os horários depois, é só me falar que eu adiciono uma seção.
- **Avaliações**: só a nota (5,0, 2 avaliações no Google) estava disponível,
  sem texto de depoimento — por isso o site mostra o selo da nota com link
  pra página do Google, em vez de depoimentos inventados.
- **Mapa**: embed por endereço (sem precisar de API key do Google). Testei e
  funciona; só não carrega no meu ambiente de testes porque bloqueia domínios
  do Google — vai funcionar normal no domínio real.

## Identidade visual (extraída da logomarca real)
Paleta tirada por amostragem de pixel do emblema e da tabela de preços que
vieram nas fotos — nada de paleta genérica de IA:
- Preto `#0B0906` / `#14100C` (fundo)
- Dourado `#C49046` / `#E7B667` (destaque)
- Vermelho-carimbo `#A8040B` / `#D4141C` (o mesmo vermelho do selo circular da logo)
- Creme `#F1E6CC` (texto)
- Verde WhatsApp `#25D366` (só nos botões de WhatsApp, por convenção)

Tipografia: **Anton** (título de impacto do hero) + **Oswald** (títulos/menu/
botões, ecoa a fonte condensada que já é usada no logotipo "NAKAMURA") +
**Poppins** (texto corrido).

## Testado
- Sem erros de console, sem overflow horizontal em mobile (390px), tablet
  (820px) e desktop (1440px)
- Contraste de texto verificado (WCAG AA em todo o site)
- Navegação por teclado (Tab, Enter, Esc, setas na galeria) e leitor de tela
  (skip-link, aria-labels, alt em todas as imagens)
- Peso da página: ~166KB no caminho crítico (HTML+CSS+JS+fontes+hero),
  ~1,3MB no total com a galeria inteira

## Próximo passo combinado
Depois que você validar o site com o cliente, me chama que a gente monta o
PDF de proposta personalizado (aquele modelo que você desenhou: como a
empresa aparece hoje → oportunidade → prints do site → mobile → recursos →
investimento → QR code).
