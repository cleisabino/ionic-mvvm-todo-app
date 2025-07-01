import { AbstractControl, ValidationErrors } from '@angular/forms';

export function reminderDateValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (!value) return null;

  const selectedDate = new Date(value);
  const now = new Date();

  if (selectedDate <= now) {
    return { pastDate: true };
  }

  return null;
}