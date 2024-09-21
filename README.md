# ⏱️ Bloqueador de Distrações

O **Descrição** O Bloqueador de Distrações é uma extensão do Chrome projetada para ajudar os usuários a gerenciar seu tempo de forma eficiente, evitando distrações durante o trabalho ou estudo. Com funcionalidades como um temporizador Pomodoro, bloqueio de sites e modo escuro, a extensão visa melhorar a produtividade e a concentração..

## 🌟 Funcionalidades

- **⏳ Temporizador**: Uma contagem regressiva perfeita para seus ciclos de foco.
- **🚫 Bloqueio de Sites**: Adicione sites à lista de bloqueio para evitar distrações enquanto trabalha.
- **🌕☀️ Modo Escuro**:  Alternar entre o modo claro e escuro para uma experiência visual mais confortável.

## 📂 Estrutura do Projeto

```bash
EXTENSÃO FOCUS/
├── css/
│   ├── popup.css          # Estilos do popup da extensão
│   └── styles.css         # Estilos gerais, se houver
├── js/
│   ├── background.js      # Lógica de background da extensão (gerenciamento de sites bloqueados e          temporizador)
│   ├── content.js         # Script que aplica o modo escuro e escuta mensagens do popup
│   └── popup.js           # Lógica do popup (interação do usuário e gerenciamento de tarefas)
├── images/
│   │   ├── icon16.png
│   │   ├── icon48.png
│   │   └── icon128.png    # Ícone da extensão
├── popup.html             # Interface do popup da extensão
├── manifest.json          # Configurações e permissões da extensão
└── README.md              # Documentação sobre a extensão e instruções de uso

```

## 🚀 Como Instalar Localmente

1. Faça o download ou clone este repositório no seu computador.
2. Abra o **Google Chrome** e navegue até `chrome://extensions/`.
3. Ative o **Modo do Desenvolvedor** (localizado no canto superior direito).
4. Clique em **Carregar sem compactação** e selecione a pasta onde o projeto da extensão está localizado.
5. A extensão será carregada e aparecerá na lista de extensões do Chrome.

## 🎯 Como Usar

1. Abra a extensão e defina o tempo desejado para o temporizador.
2. Clique em "Iniciar" para começar o ciclo.
3. Insira o URL do site que deseja bloquear na caixa de entrada e clique em "Adicionar
4. Tente acessar o site para confirmar que ele foi bloqueado.
5. Clique no botão de modo escuro para alternar entre os modos.


## 🚧 Melhorias Futuras

- Lembretes ao tentar acessar um Site Bloqueado.
- Melhor Estilo de Botoes
-  Implementar configuração onde o Usuario decide o tempo necessario

## 📜 Licença

Este projeto está licenciado sob a licença MIT. Para mais detalhes, consulte o arquivo [LICENSE](LICENSE).

---

Feito com por **Gabriel de Morais Rodrigues**
