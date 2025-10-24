import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { EmailService, EmailData } from '../../services/email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private emailService = inject(EmailService);
  
  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(3)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  isSubmitting = false;
  submitMessage = '';
  isSuccess = false;

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
    this.isSuccess = false;

    const emailData: EmailData = {
      name: this.contactForm.value.name || '',
      email: this.contactForm.value.email || '',
      subject: this.contactForm.value.subject || '',
      message: this.contactForm.value.message || ''
    };

    try {
      const result = await this.emailService.sendEmail(emailData);
      this.submitMessage = result.message;
      this.isSuccess = result.success;
      
      if (result.success) {
        this.contactForm.reset();
      }
    } catch (error) {
      this.submitMessage = 'A apărut o eroare neașteptată. Te rog să încerci din nou.';
      this.isSuccess = false;
    } finally {
      this.isSubmitting = false;
    }
  }
}
