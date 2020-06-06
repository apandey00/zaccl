/**
 * Category of endpoints for Zoom meetings
 * @author Aryan Pandey
 * @namespace api.cloudRecording
 */

const EndpointCategory = require('../../EndpointCategory');
const utils = require('../../EndpointCategory/helpers/utils');

class CloudRecording extends EndpointCategory {
  constructor(config) {
    super(config, CloudRecording);
  }
}

/* -------------------------- Endpoints ------------------------- */

/**
 * Get all recordings of a meeting
 * @author Aryan Pandey
 * @async
 * @instance
 * @memberof api.cloudRecording
 * @method list
 * @param {object} options - object containing all arguments
 * @param {number} options.meetingId - the Zoom ID of the meeting
 * @return {Recording} Zoom meeting recording object {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/cloud-recording/recordingget#responses}
 */
CloudRecording.list = function (options) {
  return this.visitEndpoint({
    path: `/meetings/${options.meetingId}/recordings`,
    method: 'GET',
    errorMap: {
      400: {
        1010: 'User not found on this account',
      },
      404: {
        1001: 'User does not exist / belong to this account',
        3301: `There is no recording for the meeting ${options.meetingId}`,
      },
    },
    postProcessor: (response) => {
      // TODO: Add postprocessing operations if necessary
      return response;
    },
  });
};
CloudRecording.list.action = 'get all recordings of a meeting';
CloudRecording.list.requiredParams = ['meetingId'];
CloudRecording.list.scopes = [
  'recording:read:admin',
  'recording:read',
];

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

module.exports = CloudRecording;
