# Configurare Template EmailJS pentru Formular de Contact

## Template-ul corect pentru EmailJS Dashboard:

### 1. Mergi la EmailJS Dashboard
- [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/)
- Email Templates → Editează `template_oxmbmpl`

### 2. Configurează template-ul exact așa:

**Subiect:**
```
Contact Form: {{subject}}
```

**Conținut:**
```
Ai primit un mesaj nou prin formularul de contact:

Nume: {{from_name}}
Email: {{from_email}}
Subiect: {{subject}}

Mesaj:
{{message}}

---
Pentru a răspunde, folosește butonul "Reply" din clientul de email.
Email-ul expeditorului: {{reply_to}}
```

### 3. Variabilele din template trebuie să fie:
- `{{from_name}}` - numele persoanei
- `{{from_email}}` - email-ul persoanei  
- `{{subject}}` - subiectul completat
- `{{message}}` - mesajul completat
- `{{reply_to}}` - email-ul pentru răspuns (același cu from_email)

### 4. Configurarea serviciului de email:
- Asigură-te că serviciul `service_1mzvp58` este configurat cu contul `stefanbalanica22@yahoo.com`
- Verifică că serviciul este activ

## Rezultatul final:
Când cineva completează formularul, tu vei primi un email la `stefanbalanica22@yahoo.com` cu toate datele persoanei și vei putea răspunde direct.
