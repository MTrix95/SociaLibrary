import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatButton, MatFabButton, MatIconButton, MatMiniFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {CdkDrag, CdkDragHandle} from '@angular/cdk/drag-drop';


export interface DialogData {
  title: string;
}

@Component({
  selector: 'app-modal',
  imports: [
    MatDialogContent,
    MatIcon,
    CdkDrag,
    CdkDragHandle,
    MatDialogActions,
    MatIconButton,
    MatFabButton,
    MatMiniFabButton,
    MatButton
  ],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
  standalone: true
})
export class Modal {
  private minimized = false;
  private startPosition = { bottom: '0', left: '0', right: '0', top: '0' };

  protected readonly dialogRef = inject(MatDialogRef<Modal>);
  protected readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  close(): void {
    this.dialogRef.close();
  }

  doMinimized(): void {
    this.minimized = true;
    this.dialogRef.updatePosition({ bottom: '0', left: '0' })
  }

  doRestore(): void {
    this.minimized = false;
    this.dialogRef.updatePosition();
  }

  get isMinimized(): boolean {
    return this.minimized;
  }
}
