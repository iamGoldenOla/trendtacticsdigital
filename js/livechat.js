// Flowise Chatbot Embed Integration
// Replaces the old Jotform-style chat widget
(function() {
  const script = document.createElement('script');
  script.type = 'module';
  script.innerHTML = `
    import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js"
    Chatbot.init({
      chatflowid: "05be139b-4222-4177-8091-703298521b7a",
      apiHost: "https://trendtacticsdigital.com",
      theme: {
        button: {
          backgroundColor: "#0047FF",
          iconColor: "#ffffff",
          bottom: 20,
          right: 20,
          customIconSrc: "https://trendtacticsdigital.com/img/trendy_chatlive_image.jpg"
        },
        chatWindow: {
          title: "Trendy AI",
          titleAvatarSrc: "https://trendtacticsdigital.com/img/trendy_chatlive_image.jpg",
          welcomeMessage: "Hi! I am Trendy, your AI Growth Agent. How can I assist you with your digital marketing today?",
          backgroundColor: "#0A1E3F",
          textColor: "#ffffff",
          userMessage: {
            backgroundColor: "#0047FF",
            textColor: "#ffffff"
          },
          botMessage: {
            backgroundColor: "#0D2347",
            textColor: "#ffffff",
            showAvatar: true,
            avatarSrc: "https://trendtacticsdigital.com/img/trendy_chatlive_image.jpg"
          },
          fontSize: 14
        }
      }
    })
  `;
  document.body.appendChild(script);
})();
