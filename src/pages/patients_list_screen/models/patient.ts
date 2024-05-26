import { format, parseISO } from 'date-fns';

/**
 * Interface for the patient
 */
export interface Patient{
    id: string;
    name: string | undefined;
    age: number | undefined;
    gender: string | undefined;
    createdAt: string;
}

/**
 * Generates Patients from json object
 * 
 * Parses the date into `yyyy-mm-dd` and creates new Patient object from the json and the parsed date
 * 
 * @param patientJsonObject json object contains all patient fields
 * @returns Patient object
 */
function generatePatientFromJson(patientJsonObject: any): Patient{
    const date = parseISO(patientJsonObject.created_at);
    const formattedDate = format(date, 'yyyy-MM-dd');

    let patientObject: Patient = {
        id: patientJsonObject._id,
        name: patientJsonObject.name,
        age: patientJsonObject.age,
        gender: patientJsonObject.gender,
        createdAt: formattedDate
    };

    return patientObject;
}

export default generatePatientFromJson;