import { Component, OnInit } from '@angular/core';
import { ISkills } from '../../../core/interfaces/iskills';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SkillsApiService } from '../../../core/services/skills-api.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-edit-skills',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-skills.component.html',
  styleUrl: './edit-skills.component.scss'
})
export class EditSkillsComponent implements OnInit{
  skillId !: number;
  oldSkill : ISkills = {} as ISkills;
  newSkill !: ISkills;
  editSkillForm !: FormGroup;

  constructor(
    private fb : FormBuilder,
    private activeRoute : ActivatedRoute,
    private skillsService : SkillsApiService,
    private notifier : NotifierService,
    private router : Router
  ){}

  ngOnInit(): void {
    const idParam = this.activeRoute.snapshot.paramMap.get("skillId");

    if (idParam) {
      this.skillId = Number(idParam);
    }

    this.skillsService.getSkillById(this.skillId).subscribe({
      next:(res)=>{
        this.oldSkill = res;
        this.editSkillForm.patchValue({
          name:res.name,
          level:res.level,
        })
      }
    })
    this.editSkillForm = this.fb.group({
      name: [this.oldSkill.name, Validators.required],
      level: [this.oldSkill.level, Validators.required],
    })

  }

  onSubmit(){
    this.newSkill = {...this.editSkillForm.value, id: this.skillId};

    this.skillsService.updateSkillById(this.skillId, this.newSkill).subscribe({
      next:()=>{
        this.skillsService.getAllSkills();
        this.notifier.show({
          type: 'success',
          message:"Skill Updated Successfully",
        });
        this.router.navigateByUrl("/skills")
      },
      error:()=>{
        this.notifier.show({
          type: 'error',
          message:"Something Went Wrong",
        });
      }
    })

  }

  deleteSkill(){
    this.skillsService.deleteSkill(this.skillId).subscribe({
      next:()=>{
        this.skillsService.getAllSkills();
        this.notifier.show({
          type: 'success',
          message:"Skill Deleted Successfully",
        });
        this.router.navigateByUrl("/skills")
      },
      error:()=>{
        this.notifier.show({
          type: 'error',
          message:"Something Went Wrong",
        });
      }
    })
  }
}

