import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(3)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  isSubmitting = false;
  submitMessage = '';

  constructor() {}

  getFieldError(field: string): string | null {
    const control = this.contactForm.get(field);
    if (!control || !control.touched && !control.dirty) return null;
    if (control.hasError('required')) return 'Câmp obligatoriu';
    if (control.hasError('email')) return 'Email invalid';
    if (control.hasError('minlength')) return 'Prea scurt';
    return null;
  }

  async onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitMessage = '';

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          from_name: this.contactForm.value.name,
          from_email: this.contactForm.value.email,
          subject: this.contactForm.value.subject,
          message: this.contactForm.value.message,
        },
        {
          publicKey: 'YOUR_PUBLIC_KEY',
        }
      );
      this.submitMessage = 'Mesajul a fost trimis cu succes!';
      this.contactForm.reset();
    } catch (e) {
      this.submitMessage = 'A apărut o eroare. Încearcă din nou.';
    } finally {
      this.isSubmitting = false;
    }
  }
}
