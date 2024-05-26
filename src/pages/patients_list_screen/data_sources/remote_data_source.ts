import { Patient } from "../models/patient";
import generatePatientFromJson from '../models/patient';

import { FilterState } from '../state_mangement/filters_slice'

/**
 * Class act as remote data source for patients list screen
 */
export class RemoteDataSource{
  // const property contains the base url of the backend Apis
  readonly BASE_URL: string = "https://admin-be.api-dev.vpax-nonprod.com/";
  
  /** Gets and Parses all the patients
   * 
   * It gets the patients from the api and converts them into json after that for each patient object it parses it to our patient interface
   * 
   * @returns parsed patients list 
   */
  async getAllPatients (){
    // Gets all of the patients
    let response: Response = await fetch(this.BASE_URL + 'patients');
    // Converts the patient into json object
    let responseJson = await response.json();
    
    //Initializes array contains parsed patients
    let patientsList: Array<Patient> = [];

    // Iterates on all patients in jso object to parse it to our Patient interface
    responseJson.forEach((responseElement: unknown) => {
        let patientObject = generatePatientFromJson(responseElement);
        patientsList.push(patientObject); 
    });

    return patientsList;
  }

  /** Gets patient image url using its id
   * 
   * Calls patient details api then after and convert it into json, after that it returns the patient photo url
   * 
   * @returns string contains patient's image url 
   */
  async getPatientImageUrl(patientId: string): Promise<string>{
    // Calls patients details Api
    let patientDetailsResponse = await fetch(this.BASE_URL + "patients/" + patientId);
    
    // Converts patient details into json object
    let patientDetailsJson = await patientDetailsResponse.json();

    // Gets patient photo's url
    let patientPhotoUrl = patientDetailsJson.imageUrl;

    return patientPhotoUrl; 
    
  }

  /**
   * Downloads patient Image
   * 
   * Calls get image url procedure and checks if string is not undefined (happens in error state) it starts
   * the download initialization procedure
   * 
   * @param patientId string contains id of the patient
   * @returns 
   */
  async downloadPatientImage(patientId: string){
    // Gets the image url
    let patientPhotoUrl: string | undefined = await this.getPatientImageUrl(patientId);

    // Checks if image url is undefined, this happened on error happened while fetching image url
    if(patientPhotoUrl == undefined) return;

    // Gets the image
    fetch(patientPhotoUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'images/png',
        },
      })
      .then((response) => response.blob())
      .then((blob) => {
        // Creates blob link to download
        const url = window.URL.createObjectURL(
          new Blob([blob]),
        );

        // Creates `a` element to be clicked
        const link = document.createElement('a');
        // Sets `a` element url
        link.href = url;
        // Creates filename
        let fileName: string = patientId + ".png";
        // Sets `a` attributes
        link.setAttribute(
          'download',
          fileName,
        );
    
        // Appends to html `a` element page
        document.body.appendChild(link);
    
        // Starts download
        link.click();
    
        // Cleans up and removes the `a` element
        link.parentNode!.removeChild(link);
      });
  }

  /**
   * Calls pagination Api
   * 
   * Calculates the offset and calls the pagination API, then it parses the response
   * 
   * @param pageNumber number describes the current page number
   * @param filters FilterState contains the filters applied on the entities
   * @param pageSize number describes the number rows in each page
   * @returns 
   */
  async getPatientsWithPagination (pageNumber:number, filters: FilterState, pageSize: number){
    // Calculates the start offset
    let startAt = pageSize * pageNumber;
    // Calls the pagination Api, This is not an actual api it is just to simulate the Api response
    let response = await paginationApi(startAt, pageSize, filters);
    // Converts the response into json object
    let responseJson = await response.json();
    
    // Gets the total number of patients
    let totalNumberOfPatients = responseJson.totalNumberOfPatients;
    
    // Initializes array of our Patient interface
    let patientsList: Array<Patient> = [];
    // Convert each patient to our patient interface
    responseJson.patients.forEach((responseElement: unknown) => {
        let patientObject = generatePatientFromJson(responseElement);
        patientsList.push(patientObject); 
    });
    
    // Returns the patient list and total number of patients
    return [patientsList, totalNumberOfPatients];
  }
}

// Just a simulation for pagination Api discard it.
async function paginationApi(startAt: number, limit: number, filters: FilterState): Promise<Response>{
  interface Patient {
    name: string;
    _id: string;
    age: number;
    gender:string;
    created_at: string;
  }
  
  let patients: Patient[] =  [
    {
      "_id": "66095837eba1f2927d23eec5",
      "name": "Alex",
      "age": 35,
      "gender": "male",
      "created_at": "2024-05-26T05:23:24.009Z"
    },
    {
        "_id": "66095849eba1f2927d23f14a",
        "name": "Amber",
        "age": 30,
        "gender": "female",
        "created_at": "2024-05-26T05:23:24.009Z"
    },
    {
        "_id": "6609585beba1f2927d23f2ef",
        "name": "Sara",
        "age": 31,
        "gender": "female",
        "created_at": "2024-05-26T05:23:24.009Z"
    },
    {
        "_id": "66095869eba1f2927d23f43b",
        "name": "John",
        "age": 45,
        "gender": "male",
        "created_at": "2024-05-26T05:23:24.009Z"
    },
    {
        "_id": "66095898eba1f2927d23f8e3",
        "name": "James",
        "age": 18,
        "gender": "male",
        "created_at": "2024-05-26T05:23:24.009Z"
    },
    {
      "_id": "66095898eba1f2927d23",
      "name": "Emmanuel",
      "age": 25,
      "gender": "male",
      "created_at": "2024-05-26T05:23:24.009Z"
    },
    {
      "_id": "66095898eba1f2927d231212s",
      "name": "Mohammed",
      "age": 40,
      "gender": "male",
      "created_at": "2024-05-26T05:23:24.009Z"
    },
    {
      "_id": "66095898eba1f2927d231dsa",
      "name": "Shimaa",
      "age": 34,
      "gender": "female",
      "created_at": "2024-05-26T05:23:24.009Z"
    },
    {
      "_id": "66095898eba1f2927d12ds123",
      "name": "Fatma",
      "age": 30,
      "gender": "female",
      "created_at": "2024-05-26T05:23:24.009Z"
    },
    {
      "_id": "66095898eba1f2927d12sw123",
      "name": "Ahmed",
      "age": 31,
      "gender": "male",
      "created_at": "2024-05-26T05:23:24.009Z"
    },
  ];
  let patientsResponse = patients;
  if(filters.name !== undefined){
    patientsResponse = patientsResponse.filter(patient => patient.name.toLowerCase().includes(filters.name!.toLowerCase()));
  }
  if(filters.gender !== undefined){
    patientsResponse = patientsResponse.filter(patient => patient.gender.toLowerCase() === filters.gender!.toLowerCase());
  }
  patientsResponse = patientsResponse.filter(patient => (patient.age <= filters.age[1] && patient.age >= filters.age[0]));
  let totalNumberOfPatients = patientsResponse.length;

  patientsResponse=  patientsResponse.slice(startAt, startAt + limit);

  let responseBody = {
    'patients': patientsResponse,
    'totalNumberOfPatients': totalNumberOfPatients
  }
  var blob = new Blob([JSON.stringify(responseBody, null, 2)], {type : 'application/json'});
  var init = { "status" : 200 , "statusText" : "SuperSmashingGreat!" };

  return new Response(blob, init);
}