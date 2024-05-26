export class RemoteDataSource{
    readonly BASE_URL: string = "https://admin-be.api-dev.vpax-nonprod.com/";

    async getPatientImageUrl(patientId: string): Promise<string>{
      let patientDetailsResponse = await fetch(this.BASE_URL + "patients/" + patientId);

      let patientDetailsJson = await patientDetailsResponse.json();
      
      let patientPhotoUrl = patientDetailsJson.imageUrl;

      return patientPhotoUrl; 
      
    }
}
