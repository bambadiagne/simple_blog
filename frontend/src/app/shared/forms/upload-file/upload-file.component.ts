import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBaseComponent } from '../formulaire-base';
import { MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css'
})
export class UploadFileComponent extends FormBaseComponent implements OnInit {
  @Input() files = [];
  @Input() maxFile = 2;
  @Output() fileEmitter: EventEmitter<File> = new EventEmitter<File>();
  totalSize: number = 0;

  totalSizePercent: number = 0;

  constructor(
    private config: PrimeNGConfig,
    private messageService: MessageService
  ) {
    super();
  }
  ngOnInit(): void {}
  choose(event, callback) {
    callback();
  }

  onRemoveTemplatingFile(event, file, removeFileCallback, index) {
    removeFileCallback(event, index);
    this.totalSize -= parseInt(this.formatSize(file.size));
    this.totalSizePercent = (this.files.length * 100) / this.maxFile;
  }

  onClearTemplatingUpload(clear) {
    clear();
    this.totalSize = 0;
    this.totalSizePercent = 0;
  }

  onTemplatedUpload() {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
  }

  onSelectedFiles(event) {
    this.files = event.currentFiles;
    this.fileEmitter.emit(this.files[this.files.length - 1]);

    this.files.forEach((file) => {
      this.totalSize += parseInt(this.formatSize(file.size));
    });
    this.totalSizePercent = (this.files.length * 100) / this.maxFile;
  }

  formatSize(bytes) {
    const k = 1024;
    const dm = 3;
    const sizes = this.config.translation.fileSizeTypes;
    if (bytes === 0) {
      return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
  }
}
