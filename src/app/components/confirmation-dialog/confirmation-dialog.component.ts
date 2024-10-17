import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
})
export class ConfirmationDialogComponent {
  readonly data = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<ConfirmationDialogComponent>);

  onConfirm(result: boolean): void {
    this.dialogRef.close(result);
  }
}
