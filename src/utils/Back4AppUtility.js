// Back4AppUtility.js

import axios from 'axios';
// import Parse from 'parse';

// Initialize Parse with your App ID and JavaScript Key
// Parse.initialize(
//   'O2cQPMSZ12n9xv3eu5O4BLm76BaTYJMsrJbTBsuQ',
//   'uFlPvTl2CIqEQDVRodCsDHcyfPLdozMGw1o5N4eY',
// );
// Parse.serverURL = 'https://parseapi.back4app.com'; // Replace with your Back4App API URL

const API_BASE_URL = 'https://parseapi.back4app.com'; // Replace with your Back4App API URL
const APP_ID = 'O2cQPMSZ12n9xv3eu5O4BLm76BaTYJMsrJbTBsuQ'; // Replace with your Back4App App ID
const API_KEY = 'tIdKsGJpwp4Wp5AS6RwBIUelXX9K8nsxaZ7qio9L'; // Replace with your Back4App API Key

class Back4AppUtility {
  constructor() {
    axios.defaults.baseURL = API_BASE_URL;
    axios.defaults.headers.common['X-Parse-Application-Id'] = APP_ID;
    axios.defaults.headers.common['X-Parse-REST-API-Key'] = API_KEY;
  }

  // Create operation
  async createRecord(className, data) {
    try {
      const response = await axios.post(`/classes/${className}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Read operation
  async getRecord(className, objectId) {
    try {
      const response = await axios.get(`/classes/${className}/${objectId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  // Read operation
  async getAllRecord(className) {
    try {
      const response = await axios.get(`/classes/${className}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Update operation
  async updateRecord(className, objectId, data) {
    try {
      const response = await axios.put(
        `/classes/${className}/${objectId}`,
        data,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Delete operation
  async deleteRecord(className, objectId) {
    try {
      const response = await axios.delete(`/classes/${className}/${objectId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async queryRecords(className, queryConditions) {
    try {
      // Construct the query parameters based on queryConditions
      const queryParams = [];
      const nnnn = [];
      //   for (const key in queryConditions) {
      //     if (Object.hasOwnProperty.call(queryConditions, key)) {
      //       //   queryParams.push(`where={"${key}":"${queryConditions[key]}"}`);
      //       queryParams.push(`{${key}:${queryConditions[key]}}`);
      //     }
      //   }
      //   console.log(queryParams, 'queryParams');
      // Join the query parameters with commas to create a valid where clause
      //   const whereClause = queryParams.join(',');
      //   nnnn.push(whereClause);
      // Construct the final query URL
      //   const queryURL = `/classes/${className}?where=${encodeURIComponent(
      //     `{${whereClause}}`,
      //   )}`;
      //   const result = {};

      //   for (const obj of whereClause) {
      //     for (const key in obj) {
      //       if (obj.hasOwnProperty(key)) {
      //         result[key] = obj[key];
      //       }
      //     }
      //   }
      const whereClause = combineObjects(queryConditions);
      console.log(whereClause, 'combinedObject');

      console.log(whereClause, 'whereClause');
      const queryURL = `/classes/${className}?where=${JSON.stringify(
        whereClause,
      )}`;
      //   const queryURL = `/classes/${className}?${whereClause}`;
      console.log(queryURL, 'queryURL');
      // Make a GET request using Axios with defaults
      const response = await axios.get(queryURL);

      // Return the data from the response
      return response.data.results;
    } catch (error) {
      // Handle errors as needed
      throw error;
    }
  }
}
function combineObjects(bbb2) {
  let bbb = [{studentId: 'T487uyo99899'}, {password: '5668888'}];
  //   let mmmmmmmm = ['{studentId:T487uyo99899}', '{password:5668888}'];
  //   mmmmmmmm = JSON.parse(mmmmmmmm);
  const result = {};

  for (const obj of bbb2) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = obj[key];
      }
    }
  }

  return result;
}
export default new Back4AppUtility();
