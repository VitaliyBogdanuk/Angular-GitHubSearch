import { Component, OnInit } from '@angular/core';
import { SearchUsersService } from '../search-users.service';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {
    name: string;
    place: string;
    language: string;

    results: any[] = []; // This will hold the data coming from the service
    allResults: any[] = [];
    selected: boolean = false; // Flag to check if a user is clicked or not
    selectedUser: any; // presently Selected user details
    error_text: string = ""; // So called error reporing text to the end user

    constructor(private searchService: SearchUsersService) {}
    ngOnInit() {
        this.selected = false;
        this.error_text = "";
        this.searchService.getAllUsers().subscribe(
            users => {
                this.allResults = users;
            },
            error => {
                this.allResults = [];
                this.error_text = "Sorry! No Users found. Try again";
                console.error(error);
            }
        )
    }

    search(place: string, language: string) {
        this.selected = false;
        this.error_text = "";
        if (place || language) {
            this.place = place;
            this.language = language;
            this.searchService.getUsersByPlaceAndLanguage(place, language).subscribe(
                users => {
                    this.results = users;
                },
                error => {
                    this.results = [];
                    this.error_text = "Sorry! No Users found. Try again";
                    console.error(error);
                }
            )
        }
    }

    searchUser(name: string) {
        this.selected = false;
        this.error_text = "";
        if (name) {
            this.name = name;
            this.searchService.getUserByLogin(name).subscribe(
                users => {
                    this.allResults = users;
                },
                error => {
                    this.results = [];
                    this.error_text = "Sorry! No Users found. Try again";
                    console.error(error);
                }
            )
        }
    }

    getDetails(username: string) {
        this.searchService.getDetailsByUserName(username).subscribe(
            userDetails => {
                this.selectedUser = userDetails;
                this.selected = true;
            },
            error => {
                this.selected = false;
                console.error(error);
            }
        )
    }
}
