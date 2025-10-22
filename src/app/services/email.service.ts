import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs.config';

export interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly SERVICE_ID = EMAILJS_CONFIG.SERVICE_ID;
  private readonly TEMPLATE_ID = EMAILJS_CONFIG.TEMPLATE_ID;
  private readonly PUBLIC_KEY = EMAILJS_CONFIG.PUBLIC_KEY;

  constructor() {
    // Inițializează EmailJS cu cheia publică
    emailjs.init(this.PUBLIC_KEY);
  }

  async sendEmail(emailData: EmailData): Promise<{ success: boolean; message: string }> {
    console.log('Sending email with data:', emailData);
    console.log('Using config:', { SERVICE_ID: this.SERVICE_ID, TEMPLATE_ID: this.TEMPLATE_ID, PUBLIC_KEY: this.PUBLIC_KEY });

    try {
      const templateParams = {
        from_name: emailData.name,
        from_email: emailData.email,
        to_email: 'stefanbalanica22@yahoo.com',
        subject: emailData.subject,
        message: emailData.message,
        reply_to: emailData.email
      };

      const response = await emailjs.send(
        this.SERVICE_ID,
        this.TEMPLATE_ID,
        templateParams
      );

      console.log('Email sent successfully:', response);
      return {
        success: true,
        message: 'Mesajul a fost trimis cu succes! Vă voi răspunde în cel mai scurt timp.'
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        success: false,
        message: 'A apărut o eroare la trimiterea mesajului. Te rog să încerci din nou sau să mă contactezi direct la stefanbalanica22@yahoo.com'
      };
    }
  }
}
