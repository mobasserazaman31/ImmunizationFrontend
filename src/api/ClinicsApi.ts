import axios from "axios";

export function getClinics(){
    return axios.get("http://localhost:8080/api/clinics");

}