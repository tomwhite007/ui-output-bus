import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InputBusEvent, outBusEmit, OutputBusEvent } from '@gyrus/ui-io-bus';
import { BooksEntity } from '../../+state/books.models';
import {
  InputEventNames,
  OutputEventNames,
} from '../../_shared/interfaces/bus-event-names.interface';

export type AddBookFormSubmitEvent = OutputBusEvent<BooksEntity>;

export type AddBookShowFormEvent = InputBusEvent<boolean>;
export type AddBookSelectedBookEvent = InputBusEvent<BooksEntity | null>;
export type AddBookInputEvents =
  | AddBookShowFormEvent
  | AddBookSelectedBookEvent;

@Component({
  selector: 'app-add-book-form',
  templateUrl: './add-book-form.component.html',
  styleUrls: ['./add-book-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBookFormComponent {
  @Input() set inBus(event: AddBookInputEvents) {
    if (event.name === InputEventNames.AddBookShowForm) {
      this.showForm = <boolean>event.payload;
    }

    if (event.name === InputEventNames.AddBookSelectedBook) {
      const book = <BooksEntity | null>event.payload;
      if (book) {
        this.formGroup.setValue(book);
        this.buttonText = 'Update book';
        this.formGroup.controls.id.disable();
      } else {
        this.formGroup.reset();
        this.buttonText = 'Add book';
        this.formGroup.controls.id.enable();
      }
    }
  }

  showForm: boolean;

  @Output() outBus: EventEmitter<AddBookFormSubmitEvent> = new EventEmitter();

  formGroup = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
  });

  buttonText = 'Add book';

  submit() {
    outBusEmit<BooksEntity>(
      this.outBus,
      OutputEventNames.AddBookFormSubmit,
      this.formGroup.getRawValue()
    );
  }
}
