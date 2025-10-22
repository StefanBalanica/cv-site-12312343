import { Component } from '@angular/core';
import { EmailService } from './services/email.service';

@Component({
  selector: 'app-test-email',
  template: `
    <div style="padding: 20px; border: 1px solid #ccc; margin: 20px;">
      <h3>Test Email Configuration</h3>
      <button (click)="testEmail()" [disabled]="isLoading">
        {{ isLoading ? 'Testing...' : 'Test Email Send' }}
      </button>
      <div *ngIf="result" [style.color]="result.success ? 'green' : 'red'">
        {{ result.message }}
      </div>
    </div>
  `
})
export class TestEmailComponent {
  isLoading = false;
  result: any = null;

  constructor(private emailService: EmailService) {}

  async testEmail() {
    this.isLoading = true;
    this.result = null;

    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Email from CV Site',
      message: 'This is a test message to verify email functionality.'
    };

    try {
      this.result = await this.emailService.sendEmail(testData);
    } catch (error) {
      this.result = {
        success: false,
        message: 'Error: ' + error
      };
    } finally {
      this.isLoading = false;
    }
  }
}
