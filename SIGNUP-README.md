# Sistema de Cadastro Multi-Etapas - Euro Luxe

## 📋 Arquivos Criados

✅ **signup.html** - Página de cadastro com 5 etapas + tela de conversão
✅ **signup.css** - Estilos premium e responsivos
✅ **signup.js** - Lógica completa com integração Supabase
✅ **database-setup.sql** - Schema do banco de dados

## 🗄️ Configuração do Supabase

### Passo 1: Criar a Tabela

1. Acesse seu projeto no Supabase Dashboard
2. Vá em **SQL Editor**
3. Cole o conteúdo do arquivo `database-setup.sql`
4. Clique em **RUN** para executar

### Passo 2: Criar Storage Bucket

1. Vá em **Storage** no menu lateral
2. Clique em **Create a new bucket**
3. Nome: `profile-photos`
4. Deixe **Public** desmarcado (privado)
5. Clique em **Create bucket**

### Passo 3: Configurar Políticas de Storage

1. Dentro do bucket `profile-photos`, clique em **Policies**
2. As políticas já estão no SQL, mas você pode verificar:
   - Permitir uploads públicos
   - Permitir leituras autenticadas

## ✨ Funcionalidades Implementadas

### Formulário Multi-Etapas
- ✅ 5 etapas de cadastro progressivo
- ✅ Barra de progresso visual
- ✅ Navegação entre etapas (Avançar/Voltar)
- ✅ Validação em tempo real
- ✅ Auto-save no localStorage

### Etapas do Formulário

**Etapa 1: Dados Básicos**
- Nome, Idade, Email, Estado/País, WhatsApp

**Etapa 2: Perfil Pessoal**
- Descrição pessoal, Objetivos, Idiomas

**Etapa 3: Preferências de Interação**
- Checkboxes múltiplos para tipos de interação

**Etapa 4: Perfil Visual**
- Upload de 2-4 fotos
- Drag & drop
- Preview de imagens
- Validação de tamanho (max 5MB)

**Etapa 5: Confirmação**
- Checkbox de 18+ anos
- Termos de uso

### Tela de Conversão

Após envio bem-sucedido, o usuário vê:

**Opção 1: Análise Padrão** (Gratuita)
- Fila de 6-8 meses
- Design simples, cinza

**Opção 2: Análise Prioritária** (US$5)
- 15min-24h de análise
- Design destacado, dourado
- Badge "Recomendado"

### Integração Supabase

✅ Salvamento de dados na tabela `profiles`
✅ Upload de imagens para `profile-photos` bucket
✅ Tratamento de erros
✅ IDs únicos por perfil

## 🚀 Como Usar

### Para Testar

1. Abra `signup.html` no navegador
2. Preencha o formulário etapa por etapa
3. Após enviar, escolha tipo de análise

### Para Ir ao Vivo

1. Configure o domínio personalizado
2. Adicione certificado SSL
3. Integre Mercado Pago (veja abaixo)

## 💳 Integração Mercado Pago (Pendente)

O botão "Análise Prioritária" está preparado para integração com Mercado Pago.

### O que fazer:

1. Obtenha credenciais do Mercado Pago em: https://www.mercadopago.com.br/developers
2. No arquivo `signup.js`, localize a função `submitAnalysisChoice`
3. Substitua o comentário `// TODO: Integrate with Mercado Pago` pela integração real

### Exemplo de integração:

```javascript
if (tipo === 'prioritária') {
    const mp = new MercadoPago('YOUR_PUBLIC_KEY');
    
    // Create preference
    const response = await fetch('/create-payment', {
        method: 'POST',
        body: JSON.stringify({
            items: [{
                title: 'Análise Prioritária - Euro Luxe',
                unit_price: 5,
                quantity: 1,
            }],
            back_urls: {
                success: 'https://euroluxe.com/payment-success',
                failure: 'https://euroluxe.com/payment-failure',
            }
        })
    });
    
    const preference = await response.json();
    mp.checkout({
        preference: {
            id: preference.id
        }
    });
}
```

## 📊 Visualizar Dados

### No Supabase Dashboard

1. Vá em **Table Editor**
2. Selecione a tabela `profiles`
3. Veja todos os cadastros com filtros e ordenação

### Campos Disponíveis

- `id` - UUID único
- `nome`, `idade`, `email`, `estado_pais`, `whatsapp`
- `descricao`, `busca`, `idiomas`
- `preferencias` - Array de preferências
- `fotos` - Array de URLs das fotos
- `tipo_analise` - 'padrão' ou 'prioritária'
- `status_analise` - 'pendente', 'em_analise', 'aprovado', 'recusado'
- `created_at` - Data de cadastro

## 🎨 Customização

### Cores

As cores seguem o padrão da landing page (definidas em `style.css`):
- Dourado: `--color-primary`
- Roxo: `--color-secondary`
- Fundo escuro: `--color-dark`

### Textos

Todos os textos podem ser editados diretamente no `signup.html`

## 🔒 Segurança

- ✅ Validação de idade (18+)
- ✅ Validação de email
- ✅ Sanitização de inputs
- ✅ RLS (Row Level Security) no Supabase
- ✅ Fotos armazenadas em bucket privado
- ✅ Credenciais não expostas no frontend

## 📱 Responsividade

O formulário é totalmente responsivo e otimizado para:
- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 767px)

## 🐛 Debugging

### Se as imagens não aparecerem:

1. Verifique se o bucket `profile-photos` foi criado
2. Verifique as políticas de acesso
3. Teste upload manual no Supabase Dashboard

### Se os dados não salvarem:

1. Abra o Console do navegador (F12)
2. Veja erros na aba **Console**
3. Verifique conexão com Supabase
4. Confirme que a tabela foi criada corretamente

### Se a validação não funcionar:

1. Verifique se todos os campos `required` estão preenchidos
2. Confirme idade >= 18
3. Verifique formato do email

## 📞 Próximos Passos

- [ ] Integrar Mercado Pago para análise prioritária
- [ ] Criar painel administrativo para curadoria
- [ ] Implementar sistema de notificações por email
- [ ] Adicionar dashboard para usuárias aprovadas
- [ ] Criar sistema de matching com europeus

## 🎉 Pronto!

O sistema de cadastro está completo e funcional. Basta configurar o Supabase e está pronto para receber cadastros!
