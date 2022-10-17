import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side2',
  templateUrl: './side2.component.html',
  styleUrls: ['./side2.component.scss']
})
export class Side2Component implements OnInit {
  files: File[] = [];
  constructor() { }

  ngOnInit(): void {
  }

	onSelect(event: { addedFiles: any; }) {
		console.log(event);
		this.files.push(...event.addedFiles);
	}

	onRemove(event: File) {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
	}
}
