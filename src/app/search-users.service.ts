import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchUsersService {

    private allUsers = "https://api.github.com/users";
    private searchUsersEndPoint = "https://api.github.com/search/users?q=";
    private getUserDetailsEndPoint = "https://api.github.com/users/";
    constructor(private http: Http) { }

    getUserRepos(login: string) {
        let url = `${this.getUserDetailsEndPoint}${login}/repos`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getAllUsers() {
        let url = `${this.allUsers}`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getUserByLogin(name: string) {
        let url;
        if(name) {
            url = `${this.searchUsersEndPoint}${name}in:login`;
        }

        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getUsersByPlaceAndLanguage(place: string, language: string) {
        let url;
        if (place && !language) {
            url = `${this.searchUsersEndPoint}location:${place}`;
        } else if (!place && language) {
            url = `${this.searchUsersEndPoint}language:${language}`;
        } else {
            url = `${this.searchUsersEndPoint}location:${place}+language:${language}`;
        }

        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getDetailsByUserName(username: string) {
        if (username) {
            let url = `${this.getUserDetailsEndPoint}${username}`;
            return this.http.get(url)
                .map((res: Response) => res.json())
                .catch(this.handleError);
        }
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.items || {};
    }

    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}