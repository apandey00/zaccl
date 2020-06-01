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
 * Get all recordings from a meeting
 * @author Aryan Pandey
 * @async
 * @instance
 * @memberof api.cloudRecording
 * @method list
 * @param {number} meetingId - the Zoom id of the meeting (int64 format)
 * @return {Recording} Zoom meeting recording object {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/cloud-recording/recordingget#responses}
 */
CloudRecording.list = function (options) {

  // TODO: write core function

};
CloudRecording.list.action = 'get all recordings from a meeting';
CloudRecording.list.requiredParams = ['meetingId'];
CloudRecording.list.scopes = [
  'recording:read:admin',
  'recording:read',
];
