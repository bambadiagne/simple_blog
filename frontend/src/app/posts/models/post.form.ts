import { FormGroup, Validators } from '@angular/forms';
import { CustomFormControl } from 'src/app/shared/forms/custom-control';
import { FormBase } from 'src/app/shared/forms/form-base';
import { Post } from './post';

export class CreatePostForm extends FormBase {
  public titleFormControl: CustomFormControl;
  public contentFormControl: CustomFormControl;
  public imageFormControl: CustomFormControl;
  public constructor() {
    super();
    this.titleFormControl = new CustomFormControl<string>('', [Validators.required], 'title', 'title');
    this.contentFormControl = new CustomFormControl<string>('', [Validators.required], 'content', 'content');
    this.imageFormControl = new CustomFormControl<any>(null, [Validators.required], 'image', 'image');
    this.form = new FormGroup({
      title: this.titleFormControl,
      content: this.contentFormControl,
      image: this.imageFormControl
    });
  }
  init(post: Post) {
    this.titleFormControl.setValue(post.title);
    this.contentFormControl.setValue(post.content);
    this.imageFormControl.setValue(post.image);
  }
}
