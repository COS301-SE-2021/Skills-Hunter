import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { User } from '../../classes/User';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user: User;
  userTypes:String[] = ["Candidate","Project Owner","Organisation","Admin"];
  @Output() onDeleteUser: EventEmitter<User> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onDelete(user): void{
    this.onDeleteUser.emit(user);
  }

}
