import http from "./httpService";
import { apiUrl } from "../config/config.json";

const apiEndpoint = `${apiUrl}/api/sample`;

const verifyEndpoint = `${apiUrl}/api/sample/verify`;
const ppvEndpoint = `${apiUrl}/api/sample/ppv`;

function sampleUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getSample(sampleId) {
  return http.get(sampleUrl(sampleId));
}

export function submitSample(sample) {
  return http.post(apiEndpoint, {
    labno: sample.labno,
    specimen_id: sample.specimen,
    submit_user_id: sample.user
  });
}

export function verifySample(sample) {
  return http.put(verifyEndpoint, {
    labno: sample.labno,
    preprocess_comment: sample.preprocessComment,
    preprocess_volume: sample.preprocessVolume,
    verify_user_id: sample.user,
    tube_color_id: sample.tubeColor,
    visual_inspect_id: sample.visualInspect
  });
}

export function ppvSample(sample) {
  return http.put(ppvEndpoint, sample);
}

export function editSample(sample) {
  return http.put(sampleUrl(sample.id), sample);
}

// export function saveMovie(movie) {
//   //return http.post(apiEndpoint, movie);
//   if (movie._id) {
//     const body = { ...movie };
//     delete body._id;
//     console.log(body);
//     return http.put(movieUrl(movie._id), body);
//   }

//   return http.post(apiEndpoint, movie);
// }

export default {
  getSample,
  submitSample,
  verifySample,
  ppvSample
};
