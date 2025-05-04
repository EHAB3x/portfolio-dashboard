import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ISkills } from '../../../core/interfaces/iskills';
import { SkillsApiService } from '../../../core/services/skills-api.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-skills',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-skills.component.html',
  styleUrl: './add-skills.component.scss'
})
export class AddSkillsComponent {
  newSkill !: ISkills;
  skillForm !: FormGroup;
  constructor(
    private fb : FormBuilder,
    private skillService : SkillsApiService,
    private notifier: NotifierService,
    private router : Router
  ){}

  ngOnInit(): void {
    this.skillForm = this.fb.group({
      name:['', Validators.required],
      level:['', Validators.required],
    })
  }

  onSubmit(){
    if (this.skillForm.valid) {
      const newSkill: ISkills = this.skillForm.value;

      this.skillService.addSkill(newSkill).subscribe({
        next:()=>{
          this.router.navigateByUrl('/skills');
          this.notifier.show({
            type: 'success',
            message:"Skill Added Successfully",
          });
        }
      });

    } else {
      this.notifier.show({
        type: 'error',
        message:"Please Check All Inputs Again",
      });
    }
  }
}
