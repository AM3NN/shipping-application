import { Component } from '@angular/core';
import {OrderechatbotService} from "./orderechatbot.service";
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Avatar} from "primeng/avatar";
import {Panel} from "primeng/panel";
import {InputText} from "primeng/inputtext";
import {ButtonDirective} from "primeng/button";

@Component({
    selector: 'app-orderchatbot',
    imports: [
        FormsModule,
        NgClass,
        NgForOf,
        Avatar,
        Panel,
        NgIf,
        InputText,
        ButtonDirective,
        NgOptimizedImage
    ],
    templateUrl: './orderchatbot.component.html',
    styleUrl: './orderchatbot.component.scss',
    standalone: true,
    providers: [OrderechatbotService]
})
export class OrderchatbotComponent {
    value: string = '';
    messages = [{ author: 'bot', content: 'Welcome to ChatCat!' }];


    constructor(private chatService: OrderechatbotService) {}

    sendMessage() {
        if (this.value.trim()) {
            this.messages.push({ author: 'user', content: this.value });
            this.chatService.generateResponse(this.value).subscribe(
                (response) => {
                    this.messages.push({ author: 'bot', content: response.response });
                },
                (error) => {
                    console.error('Error fetching response from backend:', error);
                }
            );
            this.value = '';
        }
    }
}
