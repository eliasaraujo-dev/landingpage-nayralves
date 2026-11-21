# Auditoria de seguranca e responsividade

Data: 2026-11-20

## Resumo executivo

A auditoria encontrou um problema de seguranca de severidade alta relacionado ao Tailwind carregado por CDN em tempo de execucao e um problema de severidade media relacionado ao envio de dados pessoais e de saude pela URL do WhatsApp.

Tambem foram identificados problemas responsivos no navbar em telas menores que o breakpoint `md`.

## Vulnerabilidades

| Severidade | Arquivo | Linhas | Vulnerabilidade | Confianca |
|---|---|---|---|---|
| HIGH | `index.html` | 29 | Tailwind JavaScript carregado de um CDN mutavel sem Subresource Integrity e sem Content Security Policy. | 9/10 |
| MEDIUM | `index.html` | 805-820 | Nome, cidade/bairro, idades e preferencias de plano enviados diretamente em uma URL do WhatsApp. | 9/10 |

### 1. Dependencia JavaScript mutavel por CDN

O arquivo `index.html` executa `https://cdn.tailwindcss.com` sem SRI e sem CSP. Uma resposta comprometida do CDN ou de sua cadeia de entrega pode executar JavaScript arbitrario no contexto do site.

Correção aplicada:

- O Tailwind foi compilado localmente em `tailwind.css`.
- O carregamento em tempo de execucao do `cdn.tailwindcss.com` foi removido.
- A versão compilada é gerada com `npm run build:css`.

Correções adicionais:

- Recursos externos de JavaScript e fontes foram removidos.
- Uma Content Security Policy foi adicionada ao HTML.
- Subresource Integrity não é necessária no estado atual, pois não há dependências carregadas por CDN.
- Se uma dependencia futura precisar de CDN, ela deve usar versao fixa e SRI.

### 2. Dados sensiveis na URL do WhatsApp

O simulador monta uma mensagem com nome, cidade/bairro, idades, hospital, acomodacao e coparticipacao e coloca a mensagem inteira na query string do WhatsApp.

Esses dados podem aparecer no historico do navegador, logs de navegacao, previews de links e no servico externo do WhatsApp.

Correção aplicada:

- Dados pessoais e de saude deixaram de ser incluidos na URL do WhatsApp.
- O usuário fornece consentimento explicito antes de preparar a cotacao.
- A cotacao fica visivel em uma area editavel para revisão antes do compartilhamento.
- O WhatsApp abre apenas com o número de contato, sem dados preenchidos na URL.
- O usuário pode copiar a cotacao e envia-la manualmente.

## Problemas responsivos

| Arquivo | Linhas | Problema |
|---|---|---|
| `index.html` | 64-107 | Corrigido: menu mobile com hamburguer, links acessiveis abaixo de `md` e fechamento ao selecionar uma secao. |
| `index.html` | 85-121 | Corrigido: marca compacta em telas pequenas, subtitulo oculto no mobile e CTA sem texto excessivo. |
| `index.html` | 608-646 | Corrigido: botoes de FAQ usam `aria-expanded` e `aria-controls`, atualizados pelo JavaScript. |

## Verificação de SQL Injection

Nao foi encontrada vulnerabilidade de SQL Injection no estado atual.

- O projeto atual não possui backend, endpoint de API ou conexão com banco de dados.
- Os dados do formulário são processados exclusivamente no navegador.
- Não existem queries SQL ou bibliotecas de banco de dados no código próprio.
- Se um backend futuramente receber os dados do simulador, todas as consultas SQL devem usar parâmetros preparados e validação no servidor.
