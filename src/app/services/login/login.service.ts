import { HttpBackend, HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/users/user';
import { AppConfigService } from '../app-config.service';


export class JwtResponse{
  constructor(
    public jwttoken:string,
     ) {}
  
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url:string;
  private httpClient : HttpClient;
    
  constructor( handler: HttpBackend , private appConfig:AppConfigService  ) { 
    this.httpClient = new HttpClient(handler);
  }
  

    authenticate( username: string, password: string ) {
      this.url = this.appConfig.apiBaseUrl;
      return this.httpClient.post<any>(`${this.url}`+"authenticate",{username,password}).pipe(
        map(
          userData => {
            sessionStorage.setItem('username',username);
            let roles=userData.roles.replace( '[', '' ).replace( ']', '' );
            
            sessionStorage.setItem('roles',roles);

            let tokenStr= 'Bearer '+userData.token;

            sessionStorage.setItem('token', tokenStr);

            sessionStorage.setItem('user', userData.user);

            // console.log( "USER : " + JSON.stringify(userData) );
            console.log( "USER DATA : " + JSON.stringify(userData.usr ) );

            return userData;

          }
        )
    
        );
    }

    isUserLoggedIn() {
      let user = sessionStorage.getItem('username')
      return !(user === null)
    }
  
    logOut() {
      sessionStorage.removeItem('username')
    }


    // Fetch user
    async getUser( fname:string ) : Promise<User> {

      this.url = this.appConfig.apiBaseUrl;
      const token = sessionStorage.getItem('token');

      const headerDict = {
        "Access-Control-Allow-Origin" : "*",
        Authorization: `${token}`,
      }
      
      const requestOptions = {                                                                                                                                                                                 
        headers: new HttpHeaders(headerDict)
      };

      return await this.httpClient.get<User>( `${this.url}`+ "get/fname/"+ fname, requestOptions ).pipe(
        map(
          userData => {
            return userData;
          }
        )
      ).toPromise();
    }

    getCurrentSessionUser() {
      return sessionStorage.getItem('username');
    }


    getCurrentSessionToken() {
      return sessionStorage.getItem('token');
    }

    /**
     * 
     * @param username Username
     * @param password Password
     * @param role Role of User
     */
    saveUser( user:User) {
      
      this.url = this.appConfig.apiBaseUrl;

      const token = sessionStorage.getItem('token');

      const headerDict = {
        "Access-Control-Allow-Origin" : "*",
        Authorization: `${token}`,
      }
      
      const requestOptions = {                                                                                                                                                                                 
        headers: new HttpHeaders(headerDict)
      };

      return this.httpClient.post<User>( `${this.url}`+ "register/" , user , requestOptions ).pipe(
        map(
          userData => {
            return userData;
          }
        )
      );
      
    }

    getUsers() : Observable<any>  {
      this.url = this.appConfig.apiBaseUrl;
      const token = sessionStorage.getItem('token');
      const headerDict = {
        "Access-Control-Allow-Origin" : "*",
        Authorization: `${token}`,
      }
      
      const requestOptions = {                                                                                                                                                                                 
        headers: new HttpHeaders(headerDict)
      };

      return this.httpClient.get( `${this.url}`+ "list/" , requestOptions );
    }

    updateUserPwd( usr:User ) : Observable<any>
    {
      this.url = this.appConfig.apiBaseUrl;
      const token = sessionStorage.getItem('token');
      const headerDict = {
        "Access-Control-Allow-Origin" : "*",
        Authorization: `${token}`,
      }
      const requestOptions = {                                                                                                                                                                                 
        headers: new HttpHeaders(headerDict)
      };
      return this.httpClient.post( `${this.url}`+ "password/reset/", usr , requestOptions );
    }


    changeUserPwd( id:number, newPwd:string ) : Observable<any>
    {
      this.url = this.appConfig.apiBaseUrl;
      const token = sessionStorage.getItem('token');
      const headerDict = {
        "Access-Control-Allow-Origin" : "*",
        Authorization: `${token}`,
      }
      const requestOptions = {                                                                                                                                                                                 
        headers: new HttpHeaders(headerDict)
      };
      return this.httpClient.post( `${this.url}`+ "password/change/"+id, newPwd , requestOptions );
    }

}
