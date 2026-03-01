import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Textarea} from 'primeng/textarea';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-contact-form',
  imports: [
    ReactiveFormsModule,
    Textarea,
    InputText
  ],
  templateUrl: './contact-form.html',
})
export class ContactForm implements OnInit {
  private fb = inject(FormBuilder);

  protected contactForm!: FormGroup;

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      message: new FormControl({ value: 'Ciao! Potrei avere in prestito questo libro?', disabled: false }, { validators: [Validators.required] }),
    });
  }
}
