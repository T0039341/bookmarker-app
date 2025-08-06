import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  ValidatorFn,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { BookmarkFormValue, FieldConfig } from 'src/app/models/bookmarks.model';

@Component({
  selector: 'app-form-card',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './form-card.component.html',
  styleUrl: './form-card.component.scss',
})
export class FormCardComponent implements OnInit, OnChanges {
  @Input() title = '';
  @Input() description = '';
  @Input() icon = 'bookmark_border';
  @Input() buttonLabel = 'Save';
  @Input() fields: FieldConfig<BookmarkFormValue>[] = [];
  @Input() initialValue: Partial<BookmarkFormValue> = {};

  @Output() submitted = new EventEmitter<BookmarkFormValue>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const group: Record<string, [unknown, ValidatorFn[]]> = {};

    this.fields.forEach((field) => {
      group[field.name] = [
        this.initialValue?.[field.name] ?? '',
        field.validators || [],
      ];
    });
    this.form = this.fb.group(group);
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialValue'] && this.form) {
      this.form.patchValue(this.initialValue || {});
    }
  }
}
