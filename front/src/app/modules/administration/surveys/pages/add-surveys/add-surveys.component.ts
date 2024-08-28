import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, UntypedFormArray, UntypedFormGroup, Validators } from '@angular/forms';
import { Survey } from '../../models/surveys.model';

@Component({
  selector: 'app-add-surveys',
  templateUrl: './add-surveys.component.html',
  styleUrl: './add-surveys.component.scss'
})
export class AddSurveysComponent implements OnInit {
  form!: UntypedFormGroup;
  @Input() survey: Survey = {};
  @Input() submitted: boolean = false;
  @Input() isDetail: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadQuestions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes[ 'survey' ] && changes[ 'survey' ].currentValue) {
      this.initializeForm();
      this.loadQuestions();
    }
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      date: [ this.survey.date || null, [ Validators.required ] ],
      name: [ this.survey.name || null, [ Validators.required, Validators.maxLength(120) ] ],
      description: [ this.survey.description || null, [ Validators.required, Validators.maxLength(255) ] ],
      is_active: [ this.survey.is_active !== undefined ? this.survey.is_active : true, [ Validators.required ] ],
      surveyQuestion: this.formBuilder.array([]),
    });
  }

  public loadQuestions(): void {
    if (!this.survey || !this.survey.surveyQuestion) return;
    const questionsArray = this.survey.surveyQuestion.map(surveyQuestion => ({
      code: surveyQuestion.code,
      description: surveyQuestion.description,
      minimun_scroe: surveyQuestion.minimun_scroe,
      maximun_score: surveyQuestion.maximun_score,
      question_order: surveyQuestion.question_order,
      is_active: surveyQuestion.is_active,
    }));
    this.setQuestionsForm(questionsArray, false);
  }

  get surveyQuestion(): UntypedFormArray {
    return this.form.controls[ 'surveyQuestion' ] as UntypedFormArray;
  }

  public addQuestions(firstLoad: boolean): void {
    const questionsArray = [ {
      code: null, description: null, minimun_scroe: null, maximun_score: null, question_order: null, is_active: true
    } ];
    this.setQuestionsForm(questionsArray, firstLoad);
    this.cdr.detectChanges();
  }

  public setQuestionsForm(questionsArray: any, firstLoad: boolean): void {
    if (!firstLoad) { this.surveyQuestion.clear(); }
    questionsArray.forEach((survey: any) => {
      const code = survey.code;
      const description = survey.description;
      const minimun_scroe = survey.minimun_scroe;
      const maximun_score = survey.maximun_score;
      const question_order = survey.question_order;
      const is_active = survey.is_active;

      const questionForm = this.formBuilder.group({
        code: [ code ],
        description: [ description ],
        minimun_scroe: [ minimun_scroe, [ Validators.required, Validators.min(1), Validators.max(10) ] ],
        maximun_score: [ maximun_score, [ Validators.required, Validators.min(minimun_scroe), Validators.max(10) ] ],
        question_order: [ question_order, [ Validators.required ] ],
        is_active: [ is_active, [ Validators.required ] ],
      });

      questionForm.get('minimun_scroe').valueChanges.subscribe(value => {
        questionForm.get('maximun_score').setValidators([ Validators.required, Validators.min(value), Validators.max(10) ]);
        questionForm.get('maximun_score').updateValueAndValidity();
      });
      this.surveyQuestion.push(questionForm);
    });
  }

  public deleteQuestion(i: number): void {
    if (this.surveyQuestion.length == 1) return;
    this.surveyQuestion.removeAt(i);
  }

  getFormData() {
    return this.form.valid ? this.form.value : null;
  }
}
