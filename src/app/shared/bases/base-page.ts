import { inject, OnInit } from '@angular/core';
import { IViewModel } from '../contracts/viewmodel.interface'
import { Router } from '@angular/router';
import { RefresherEventDetail } from '@ionic/core';

export abstract class BasePage<T extends IViewModel> {

    public router = inject(Router);

    constructor(public vm: T) {}

    init() {
        this.vm.load();
    }

    async doRefresh(event: CustomEvent<RefresherEventDetail>) {
        console.log('Recarregando...');
        await this.vm.load();
        event.detail.complete();
    }
}