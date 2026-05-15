const flow = [
  { bot: "Hi! 👋 I'm Deepak's assistant. What brings you here today?", options: ["DevOps Training", "Hiring / Consulting", "BlockBuild Product", "Just browsing"] },
  {
    "DevOps Training":   { bot: "Great! Deepak offers DevOps courses and 1-on-1 mentoring. Would you like to know more?", options: ["Yes, tell me more", "I'm ready to get in touch"] },
    "Hiring / Consulting": { bot: "Deepak is available for consulting and contract roles. Shall I help you get in touch?", options: ["Yes please", "Tell me about his experience first"] },
    "BlockBuild Product":  { bot: "BlockBuild is a PropTech SaaS platform for managing projects, billing, and blockchain. Interested?", options: ["Yes, I'd like a demo", "I'm ready to get in touch"] },
    "Just browsing":       { bot: "No problem! Feel free to explore. Can I help with anything specific?", options: ["DevOps Training", "Hiring / Consulting", "BlockBuild Product"] }
  },
  {
    "Yes, tell me more":          { bot: "Deepak covers Kubernetes, CI/CD, cloud security, Terraform and more. Ready to reach out?", options: ["Get in touch"] },
    "I'm ready to get in touch":  { bot: "📧 Drop Deepak an email at <a href='mailto:contactme@deepak-tech.com'>contactme@deepak-tech.com</a> — he'll get back to you soon!", options: ["Start over"] },
    "Yes please":                 { bot: "📧 Drop Deepak an email at <a href='mailto:contactme@deepak-tech.com'>contactme@deepak-tech.com</a> — he'll get back to you soon!", options: ["Start over"] },
    "Tell me about his experience first": { bot: "Deepak has 25+ years across Java, cloud, DevOps, and security. He's currently Principal DevOps Engineer at Flooid Ltd.", options: ["Get in touch"] },
    "Yes, I'd like a demo":       { bot: "📧 Drop Deepak an email at <a href='mailto:contactme@deepak-tech.com'>contactme@deepak-tech.com</a> — he'll get back to you soon!", options: ["Start over"] },
    "Get in touch":               { bot: "📧 Drop Deepak an email at <a href='mailto:contactme@deepak-tech.com'>contactme@deepak-tech.com</a> — he'll get back to you soon!", options: ["Start over"] },
    "Start over":                 null // triggers restart
  }
];

function buildChatbot() {
  const widget = document.createElement('div');
  widget.id = 'chatbot-widget';
  widget.innerHTML = `
    <button id="chat-toggle" aria-label="Open chat">💬</button>
    <div id="chat-window" hidden>
      <div id="chat-header">
        <span>Chat with Deepak's Assistant</span>
        <button id="chat-close" aria-label="Close chat">✕</button>
      </div>
      <div id="chat-messages"></div>
      <div id="chat-options"></div>
    </div>
  `;
  document.body.appendChild(widget);

  const toggle = document.getElementById('chat-toggle');
  const win    = document.getElementById('chat-window');
  const msgs   = document.getElementById('chat-messages');
  const opts   = document.getElementById('chat-options');

  toggle.addEventListener('click', () => { win.hidden = !win.hidden; if (!win.hidden && !msgs.children.length) start(); });
  document.getElementById('chat-close').addEventListener('click', () => { win.hidden = true; });

  function addMsg(text, who) {
    const d = document.createElement('div');
    d.className = 'chat-msg ' + who;
    d.innerHTML = text;
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showOptions(choices) {
    opts.innerHTML = '';
    choices.forEach(c => {
      const b = document.createElement('button');
      b.className = 'chat-opt';
      b.textContent = c;
      b.addEventListener('click', () => pick(c));
      opts.appendChild(b);
    });
  }

  function start() {
    msgs.innerHTML = '';
    addMsg(flow[0].bot, 'bot');
    showOptions(flow[0].options);
  }

  function pick(choice) {
    addMsg(choice, 'user');
    opts.innerHTML = '';

    if (choice === 'Start over') { setTimeout(start, 400); return; }

    // search through flow levels 1 and 2
    for (let i = 1; i < flow.length; i++) {
      if (flow[i][choice]) {
        const next = flow[i][choice];
        setTimeout(() => {
          addMsg(next.bot, 'bot');
          showOptions(next.options);
        }, 400);
        return;
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', buildChatbot);
