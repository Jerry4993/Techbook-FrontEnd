import { HttpClient, HttpHeaders } from '@angular/common/http';

export class GlobalConstants {
    public static apiURL: string = "https://itsolutionstuff.com/";
      
    public static siteTitle: string = "This is example of ItSolutionStuff.com";

    public static httpHeaders = new HttpHeaders({'Content-type':'application/json'})
}