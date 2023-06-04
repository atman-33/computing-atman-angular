import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector } from '@angular/core';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@Injectable()
export class DialogService {
    private dialogComponentRef: ComponentRef<ConfirmationDialogComponent> | null = null;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) { }

    openConfirmationDialog(message: string): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ConfirmationDialogComponent);
            const componentRef: ComponentRef<ConfirmationDialogComponent> = componentFactory.create(this.injector);
            const componentInstance: ConfirmationDialogComponent = componentRef.instance;

            componentInstance.message = message;
            componentInstance.confirmed.subscribe((result: boolean) => {
                resolve(result);
                this.closeConfirmationDialog();
            });

            this.appRef.attachView(componentRef.hostView);
            const domElement: HTMLElement = componentRef.location.nativeElement;
            document.body.appendChild(domElement);

            this.dialogComponentRef = componentRef;
        });
    }

    private closeConfirmationDialog(): void {
        if (this.dialogComponentRef) {
            this.appRef.detachView(this.dialogComponentRef.hostView);
            this.dialogComponentRef.destroy();
            this.dialogComponentRef = null;
        }
    }
}
