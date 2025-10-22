// Configurare EmailJS
// Pentru a configura EmailJS, urmează acești pași:

// 1. Creează un cont pe https://www.emailjs.com/
// 2. Creează un serviciu de email (Gmail, Yahoo, etc.)
// 3. Creează un template de email cu următoarele variabile:
//    - {{from_name}} - numele expeditorului
//    - {{from_email}} - email-ul expeditorului
//    - {{to_email}} - email-ul destinatarului (stefanbalanica22@yahoo.com)
//    - {{subject}} - subiectul mesajului
//    - {{message}} - conținutul mesajului
//    - {{reply_to}} - email-ul pentru răspuns

// 4. Înlocuiește valorile de mai jos cu ID-urile tale din EmailJS:

export const EMAILJS_CONFIG = {
  SERVICE_ID: 'YOUR_SERVICE_ID', // Înlocuiește cu ID-ul serviciului tău
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID', // Înlocuiește cu ID-ul template-ului tău
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY' // Înlocuiește cu cheia ta publică
};

// Template de email recomandat pentru EmailJS:
/*
Subiect: {{subject}}

Mesaj de la: {{from_name}}
Email: {{from_email}}

Mesaj:
{{message}}

---
Acest mesaj a fost trimis prin formularul de contact de pe site-ul personal.
Răspunde la: {{reply_to}}
*/
