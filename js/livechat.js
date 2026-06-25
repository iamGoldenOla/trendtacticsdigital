// Flowise Chatbot Embed Integration
// Replaces the old Jotform-style chat widget
(function() {
  const script = document.createElement('script');
  script.type = 'module';
  script.innerHTML = `
    import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js"
    Chatbot.init({
      chatflowid: "05be139b-4222-4177-8091-703298521b7a",
      apiHost: "https://flowise.trendtacticsdigital.com",
      theme: {
        button: {
          backgroundColor: "#00E5FF",
          iconColor: "#0A1E3F",
          bottom: 20,
          right: 20
        },
        chatWindow: {
          title: "Trendy AI",
          titleAvatarSrc: "https://trendtacticsdigital.com/logo.png",
          welcomeMessage: "Hi! I am Trendy, your AI Growth Agent. How can I assist you with your digital marketing today?",
          backgroundColor: "#0A1E3F",
          textColor: "#ffffff",
          userMessage: {
            backgroundColor: "#00E5FF",
            textColor: "#0A1E3F"
          },
          botMessage: {
            backgroundColor: "#0D2347",
            textColor: "#ffffff"
          },
          fontSize: 14
        }
      }
    })
  `;
  document.body.appendChild(script);
})();
