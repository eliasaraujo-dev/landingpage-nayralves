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

Recomendacao:

- Gerar uma versao compilada do Tailwind para publicar os arquivos localmente.
- Evitar o carregamento em tempo de execucao do `cdn.tailwindcss.com`.
- Se um CDN continuar necessario, fixar uma versao especifica e adicionar Subresource Integrity.
- Adicionar uma Content Security Policy restritiva.

### 2. Dados sensiveis na URL do WhatsApp

O simulador monta uma mensagem com nome, cidade/bairro, idades, hospital, acomodacao e coparticipacao e coloca a mensagem inteira na query string do WhatsApp.

Esses dados podem aparecer no historico do navegador, logs de navegacao, previews de links e no servico externo do WhatsApp.

Recomendacao:

- Nao incluir dados pessoais ou de saude na URL.
- Preferir um backend com consentimento, politica de retencao e divulgacoes explicitas.
- Para o envio pelo WhatsApp, iniciar a conversa com o minimo necessario ou deixar o usuario revisar antes de compartilhar os dados.

## Problemas responsivos

| Arquivo | Linhas | Problema |
|---|---|---|
| `index.html` | 101-107 | Os links desktop usam `hidden md:flex`, mas nao existe menu mobile ou controle hamburguer. Os links desaparecem abaixo de `768px`. |
| `index.html` | 85-121 | O header combina bloco de marca, subtitulo e CTA em altura fixa de `h-20`, com risco de loteamento em celulares estreitos. |
| `index.html` | 620-657 | Os botoes de FAQ nao informam estado expandido por semantica ARIA, o que afeta navegacao assistiva. |

## Acoes pendentes

Os alertas desta auditoria nao foram corrigidos nesta etapa. O registro foi criado a pedido do usuario para documentar as conclusoes antes das correcoes.
