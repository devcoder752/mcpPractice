import { LightningElement, wire } from 'lwc';
import getCurrentUserDetails from '@salesforce/apex/UserDisplayController.getCurrentUserDetails';

export default class UserDisplayCard extends LightningElement {
    userName;
    userUsername;
    currentDate;
    error;
    isLoading = true;

    @wire(getCurrentUserDetails)
    wiredUser({ error, data }) {
        this.isLoading = false;
        if (data) {
            this.userName = data.Name;
            this.userUsername = data.Username;
            this.error = undefined;
        } else if (error) {
            this.error = error.body?.message || 'An error occurred while fetching user details';
            this.userName = undefined;
            this.userUsername = undefined;
        }
    }

    connectedCallback() {
        this.setCurrentDate();
    }

    setCurrentDate() {
        const today = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        this.currentDate = today.toLocaleDateString('en-US', options);
    }
}
