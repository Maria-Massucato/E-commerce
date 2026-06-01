# 🛍️ E-commerce de Cosméticos

**Trabalho Prático de Desenvolvimento Front-End**

> Template profissional de e-commerce de cosméticos, desenvolvido com HTML, CSS, JavaScript e Bootstrap.

🔗 **[Acesse o deploy do projeto aqui](https://e-commerce-jet-ten-27.vercel.app/)**

---

## 👩‍💻 Autora

**Maria Eduarda Machado Massucato**

---

## 📌 Sobre o Projeto

Este projeto é um template de e-commerce voltado para o segmento de cosméticos, desenvolvido como trabalho prático da disciplina de Desenvolvimento Front-End. O site é totalmente responsivo e utiliza Bootstrap como base em todas as páginas.

---

## 🗂️ Páginas

| Página | Descrição |
|---|---|
| `index.html` | Página inicial com navbar, carrossel de imagens, cards de produtos, carrossel de feedbacks e footer com newsletter |
| `catalogo.html` | Catálogo com filtros laterais de produtos e opção de adicionar ao carrinho |
| `produto.html` | Detalhes do produto: preço, descrição, quantidade, adicionar ao carrinho e efetuar compra |
| `carrinho.html` | Carrinho com até 4 produtos, com opções de remover itens e alterar quantidades |
| `duvidas.html` | Perguntas frequentes organizadas por categorias |

---

## 🧱 Estrutura de Arquivos

```
E-commerce/
│   carrinho.html
│   catalogo.html
│   duvidas.html
│   index.html
│   produto.html
│   README.md
│
├───css/
│       catalogo.css     # Estilos exclusivos do catálogo
│       produto.css      # Estilos exclusivos da página de produto
│       style.css        # Estilos globais compartilhados
│
├───img/
│       boosterazura.png
│       boosterilumini.png
│       breeze.png
│       carrossel1.jpg
│       carrossel2.jpg
│       carrossel3.jpg
│       clean.png
│       clean1.png
│       img1.png ~ img6.jpg   # Imagens de produtos e feedbacks
│       logo.png
│       mask.png
│       palheta.png      # Paleta de cores base do projeto
│
└───js/
        filtros.js       # Lógica de filtros do catálogo
        script.js        # Validação de formulário (newsletter e carrinho)
```

---

## 🛠️ Tecnologias Utilizadas

- **HTML5**
- **CSS3**
- **JavaScript**
- **[Bootstrap](https://getbootstrap.com/)** — utilizado em todas as páginas

---

## ✨ Funcionalidades

- Navbar com navegação entre todas as páginas
- Carrossel de banners na página inicial
- Cards de produtos com link para página de detalhes
- Carrossel de feedbacks de clientes
- Footer com formulário de newsletter (com validação JS)
- Filtros de produtos no catálogo
- Carrinho com adição e remoção de itens
- FAQ com perguntas divididas por categorias
- Layout **100% responsivo**

---

## 📝 Observações

- O arquivo `palheta.png` na pasta `img/` foi usado como referência para a paleta de cores do projeto e não é exibido no site.
- Os arquivos `catalogo.css` e `produto.css` são estilizações individuais, pois essas páginas possuem layouts distintos do padrão global.
- O botão "Adicionar ao carrinho" no catálogo é visual (não funcional).
- O botão de compra na página de produto é visual (não funcional).
