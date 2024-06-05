import { Component, OnInit } from '@angular/core';
import {TagService} from "../services/tag.service";
import {TagModel} from "../entities/tag.model";

@Component({
  selector: 'app-tag-create',
  templateUrl: './tag-create.component.html',
  styleUrls: ['./tag-create.component.scss']
})
export class TagCreateComponent implements OnInit {
  newTagName: string = '';

  constructor(private tagService: TagService) { }

  ngOnInit(): void {
    this.newTagName = ''
  }

  addTag(): void {
    let tag: TagModel = new TagModel();
    tag.text = this.newTagName;
    this.tagService.insertTag(tag).subscribe(
      () => {
        console.log('Tag added successfully!');
        this.newTagName = '';
      },
      error => {
        console.error('Error adding tag:', error);
      }
    );
  }
}
