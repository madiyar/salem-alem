import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NbSidebarService } from '@nebular/theme';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public constructor(
		private titleService: Title,
		private sidebarService: NbSidebarService
	) { }

	ngOnInit(): void {
		this.titleService.setTitle('Басты бет');
	}

	toggle() {
		this.sidebarService.toggle();
	}
}
