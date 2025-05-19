import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
 
})
export class TestComponent {
  form : FormGroup;
  submmited = false;
  flightSubmit = false;
  currentDate : any = new Date();
  endDateStart : any;
  constructor(private formbuilder : FormBuilder) {
    this.form = new FormGroup ({
      selectedOption : new FormControl ('station'),
      startDate : new FormControl('', Validators.required),
      endDate : new FormControl('', Validators.required),
      startTime : new FormControl('', Validators.required),
      endTime : new FormControl('', Validators.required),
      flightNumber : new FormControl(''),
      flightDate : new FormControl('')
      
    })
  }
  
  ngOnInit() {
    this.form.get('endDate')?.disable()
    this.form.get('startTime')?.disable()
    this.form.get('endTime')?.disable()
  }

  startDateChanged() {
    this.endDateStart = this.form.get('startDate')?.value; 
    if(this.endDateStart)
      this.form.get('endDate')?.enable()
    this.enableTimes();
  }

  enableTimes(){
    const startDate = this.form.get('startDate');
    const endDate = this.form.get('endDate'); 
    const endTime = this.form.get('endTime');
    const startTime = this.form.get('startTime');
    console.info(startDate,' ',endDate)
    if(endDate?.valid)
      startTime?.enable()
    if(startTime?.valid)
        endTime?.enable()
    if(startDate===endDate?.value){
      endTime?.addValidators(Validators.min(startTime?.value));
      this.form.updateValueAndValidity();
    }
  }

  startTimeChanged(){
    const startTime = this.form.get('startTime');
    if(startTime?.valid){
      const endTime = this.form.get('endTime')
      endTime?.enable();  
      console.info(this.form.get('endTime')?.valid)
    }
  }

  endDateChanged(){
    this.enableTimes();

  }


  isEndTimeValid(){
    if(this.endTime.valid){
      if(this.endDate.value===this.startDate.value){
        if(this.startTime.value<=this.endTime.value)
          return true;
        else  
          return false;
      }
      return true;
    }
    return false;
  }

  

  toggleOptions() {
    const selectedOption = this.form.get('selectedOption')?.value;
    
    if (selectedOption === 'station') {
      this.form.get('flightNumber')?.clearValidators();
      this.form.get('flightDate')?.clearValidators();
  
      this.form.get('startDate')?.setValidators([Validators.required]);
      this.form.get('endDate')?.setValidators([Validators.required]);
      this.form.get('startTime')?.setValidators([Validators.required]);
      this.form.get('endTime')?.setValidators([Validators.required]);
    } else if (selectedOption === 'flight') {
      this.form.get('startDate')?.clearValidators();
      this.form.get('endDate')?.clearValidators();
      this.form.get('startTime')?.clearValidators();
      this.form.get('endTime')?.clearValidators();
  
      this.form.get('flightNumber')?.setValidators([Validators.required]);
      this.form.get('flightDate')?.setValidators([Validators.required]);
    }
  
    // Update validity after adjusting validators
    this.form.get('startDate')?.updateValueAndValidity();
    this.form.get('endDate')?.updateValueAndValidity();
    this.form.get('startTime')?.updateValueAndValidity();
    this.form.get('endTime')?.updateValueAndValidity();
    this.form.get('flightNumber')?.updateValueAndValidity();
    this.form.get('flightDate')?.updateValueAndValidity();
  }

  submit() {
    this.submmited = true;
  }
  save() {
    this.flightSubmit = true;
  }

  get startDate(): AbstractControl{
    return this.form.get('startDate') as AbstractControl;
  }
  get endDate(): AbstractControl{
    return this.form.get('endDate') as AbstractControl;
  }
  get startTime(): AbstractControl{
    return this.form.get('startTime') as AbstractControl;
  }
  get endTime(): AbstractControl{
    return this.form.get('endTime') as AbstractControl;
  }
  get flightNumber(): AbstractControl{
    return this.form.get('flightNumber') as AbstractControl;
  }
  get flightDate(): AbstractControl{
    return this.form.get('flightDate') as AbstractControl;
  }
}