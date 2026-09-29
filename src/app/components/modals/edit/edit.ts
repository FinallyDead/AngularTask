import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiTextfield, TuiLabel } from '@taiga-ui/core';
import { TuiButton } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { TuiDialogContext, TuiInput, TuiError, TUI_VALIDATION_ERRORS } from '@taiga-ui/core';

@Component({
  imports: [
    ReactiveFormsModule,
    TuiTextfield,
    TuiInput,
    TuiLabel,
    TuiButton,
    TuiError
  ],
  selector: 'app-edit',
  styleUrl: './edit.less',
  templateUrl: './edit.html',
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Required field',
        pattern: 'Only digits are allowed',
      },
    },
  ],
})
export class Edit {

  private readonly context = inject<TuiDialogContext<any, any>>(POLYMORPHEUS_CONTEXT);

  form = new FormGroup({
    productName: new FormControl(this.context.data.name, Validators.required),
    productPrice: new FormControl(this.context.data.price, [Validators.required, Validators.pattern('^[0-9]+$')]),
    productVat: new FormControl(this.context.data.vat, [Validators.required, Validators.pattern('^[0-9]+$')])
  });

  submit() {
    this.context.completeWith(this.form.value);
  }

  cancel() {
    this.context.completeWith(null);
  }
}
