import { Component,OnInit, Output, EventEmitter} from '@angular/core';
import { environment } from 'src/environments/environment';
declare const google: any;

@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.html',
  styleUrl: './google-auth.css'
})
export class GoogleAuthComponent implements OnInit {
  @Output() googleAuthToken = new EventEmitter<string>(); 
  ngOnInit(): void {
    this.initializeGoogleSignIn();
  }
  initializeGoogleSignIn() {
       google.accounts.id.initialize({
         client_id: environment.googleClientId,
         callback: (response: any) => this.googleAuthToken.emit(response.credential)
       });

      google.accounts.id.renderButton(
  document.getElementById('google-signin-button'),
  { type: 'standard', theme: 'outline', size: 'large' } // added 'type'
),
       google.accounts.id.prompt(); // also display the One Tap dialog
     }
}
