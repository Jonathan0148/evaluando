import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, UntypedFormArray, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-surveys-answers',
  templateUrl: './add-surveys-answers.component.html',
  styleUrl: './add-surveys-answers.component.scss'
})
export class AddSurveysAnswersComponent implements OnChanges {
  form!: UntypedFormGroup;
  @Input() surveyAnswer: any = {};
  @Input() submitted: boolean = false;
  @Input() isDetail: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      names: [ '' ],
      document: [ '' ],
      surveysAnswer: this.formBuilder.array([])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes[ 'surveyAnswer' ] && changes[ 'surveyAnswer' ].currentValue) {
      this.surveyAnswer = changes[ 'surveyAnswer' ].currentValue;
      this.updateForm();
    }
  }

  get surveysAnswerControls(): FormGroup[] {
    const array = this.form.get('surveysAnswer') as FormArray;
    return array.controls as FormGroup[];
  }

  get surveysAnswerArray(): FormArray {
    return this.form.get('surveysAnswer') as FormArray;
  }

  private updateForm(): void {
    if (this.surveyAnswer) {
      this.form.patchValue({
        names: this.surveyAnswer.names,
        document: this.surveyAnswer.document
      });

      const surveysArray = this.form.get('surveysAnswer') as FormArray;
      if (surveysArray) {
        surveysArray.clear();

        if (this.surveyAnswer.surveysAnswer && Array.isArray(this.surveyAnswer.surveysAnswer)) {
          this.surveyAnswer.surveysAnswer.forEach((item: any) => {
            surveysArray.push(this.formBuilder.group({
              score: [ item.score || '', Validators.required ],
              created: [ item.created || '' ],
              survey: this.formBuilder.group({
                name: [ item.survey?.name || '' ],
                date: [ item.survey?.date || '' ]
              }),
              surveyQuestion: this.formBuilder.group({
                description: [ item.surveyQuestion?.description || '' ],
                maximun_score: [ item.surveyQuestion?.maximun_score || '' ],
                minimun_scroe: [ item.surveyQuestion?.minimun_scroe || '' ],
              })
            }));
          });
        }
      }
    }
  }

  calculateStars(question: FormGroup): number {
    const minScore = parseFloat(question.get('surveyQuestion.minimun_scroe')?.value || '0');
    const maxScore = parseFloat(question.get('surveyQuestion.maximun_score')?.value || '0');
    if (isNaN(minScore) || isNaN(maxScore) || minScore > maxScore) {
      console.error('Invalid score range:', { minScore, maxScore });
      return 5;
    }
    return maxScore - minScore + 1;
  }
}
