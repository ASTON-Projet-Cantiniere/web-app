import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})


export class HeaderService {
  constructor() {}
    
    header() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjoxLCJ3YWxsZXQiOjkuOTMsInJlZ2lzdHJhdGlvbkRhdGUiOlsyMDIyLDIsMTUsMTEsMzQsNTFdLCJlbWFpbCI6InRvdG9AZ21haWwuY29tIiwiaXNMdW5jaExhZHkiOnRydWUsIm5hbWUiOiJCcnVuZWwiLCJmaXJzdG5hbWUiOiJMb3VpcyIsInBob25lIjoiMjI3ODcyMDIxMCIsInNleCI6Miwic3RhdHVzIjowLCJpbWFnZUlkIjoxfSwicm9sZXMiOlsiUk9MRV9MVU5DSExBRFkiXSwiaXNzIjoic2VjdXJlLWFwaSIsImF1ZCI6InNlY3VyZS1hcHAiLCJzdWIiOiJ0b3RvQGdtYWlsLmNvbSIsImV4cCI6MTY3MjU2MzYzNX0.aZ_ibVqzeu-LPZ3e4JpXqwh7oePaAvhnXholP8akiChHTnqLUe6TSdaY2_43PfknPkqtlmgCvz212zZpsVqVtg"
      })
    };
    return httpOptions;

  }
}
