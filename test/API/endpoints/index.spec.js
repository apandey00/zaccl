const assert = require('assert');

// import classes to test
const API = require('../../../API');
const genStubAPIRequest = require('../helpers/stubAPIRequest');

// import helper classes
const utils = require('../../../EndpointCategory/helpers/utils');

// Create API instance
const testAPI = new API({
  key: 'fakeKey',
  secret: 'fakeSecret',
  sendZoomRequest: genStubAPIRequest(),
});

// Set up the default date value to use for comparision later
let defaultDate = new Date();
defaultDate.setMonth(defaultDate.getMonth() - 6);
defaultDate = utils.formatDate(defaultDate);

describe('Meeting Endpoints', async function () {
  it('gets Meeting with only required params', async function () {
    const ret = await testAPI.meeting.get({ meetingId: 12345 });
    assert.deepEqual(ret.path, '/meetings/12345');
    assert.deepEqual(ret.method, 'GET');
    assert.deepEqual(ret.params, { show_previous_occurrences: false });
  });

  it('gets Meeting with showAllOccurrences as string', async function () {
    const ret = await testAPI.meeting.get({ meetingId: '12345', showAllOccurrences: 'true' });
    assert.deepEqual(ret.path, '/meetings/12345');
    assert.deepEqual(ret.method, 'GET');
    // Check if string converted to boolean
    assert.deepEqual(ret.params, { show_previous_occurrences: true });
  });

  it('gets Meeting with showAllOccurrences as boolean', async function () {
    const ret = await testAPI.meeting.get({ meetingId: '12345', showAllOccurrences: true });
    assert.deepEqual(ret.path, '/meetings/12345');
    assert.deepEqual(ret.method, 'GET');
    assert.deepEqual(ret.params, { show_previous_occurrences: true });
  });

  it('gets Meeting with only occurrenceId as string', async function () {
    const ret = await testAPI.meeting.get({ meetingId: '12345', occurrenceId: '5555' });
    assert.deepEqual(ret.path, '/meetings/12345');
    assert.deepEqual(ret.method, 'GET');
    assert.deepEqual(ret.params, { show_previous_occurrences: false, occurrence_id: '5555' });
  });

  it('gets Meeting with only occurrenceId as number', async function () {
    const ret = await testAPI.meeting.get({ meetingId: '12345', occurrenceId: 9841 });
    assert.deepEqual(ret.path, '/meetings/12345');
    assert.deepEqual(ret.method, 'GET');
    // Check if number got converted to string
    assert.deepEqual(ret.params, { show_previous_occurrences: false, occurrence_id: '9841' });
  });

  it('updates Meeting', async function () {
    const ret = await testAPI.meeting.update({ meetingId: 12345, meetingObj: { stubParam: '1' } });
    assert.deepEqual(ret.path, '/meetings/12345');
    assert.deepEqual(ret.method, 'PATCH');
    assert.deepEqual(ret.params, { stubParam: '1' });
  });

  it('updates Meeting with occurrenceId present', async function () {
    const ret = await testAPI.meeting.update({ meetingId: 12345, meetingObj: {}, occurrenceId: 'present' });
    assert.deepEqual(ret.path, '/meetings/12345?occurrence_id=present');
    assert.deepEqual(ret.method, 'PATCH');
    assert.deepEqual(ret.params, {});
  });

  it('deletes Meeting', async function () {
    const ret = await testAPI.meeting.delete({ meetingId: 12345 });
    assert.deepEqual(ret.path, '/meetings/12345');
    assert.deepEqual(ret.method, 'DELETE');
    assert.deepEqual(ret.params, { schedule_for_reminder: false });
  });

  it('deletes Meeting with optional params', async function () {
    const ret = await testAPI.meeting.delete({ meetingId: 12345, notifyHosts: 'yes', occurrenceId: 55 });
    assert.deepEqual(ret.path, '/meetings/12345');
    assert.deepEqual(ret.method, 'DELETE');
    assert.deepEqual(ret.params, { schedule_for_reminder: true, occurrence_id: '55' });
  });

  it('lists Past Meeting Instances', async function () {
    const ret = await testAPI.meeting.listPastInstances({ meetingId: 12345 });
    assert.deepEqual(ret.path, '/past_meetings/12345/instances');
    assert.deepEqual(ret.method, 'GET');
    assert.deepEqual(ret.params, undefined);
  });
});

// TODO: Test without post-processor altering response object
// describe('User Endpoints', async function () {
//   it('gets ZAKToken', async function () {
//     const ret = await testAPI.user.getZAKToken({ userId: 12345 });
//     assert.deepEqual(ret.path, '/users/12345/token');
//     assert.deepEqual(ret.method, 'GET');
//     assert.deepEqual(ret.params, {type: 'zak'});
//   });
// });

describe('Cloud Recording Endpoints', async function () {
  it('lists Meeting Recordings', async function () {
    const ret = await testAPI.cloudRecording
      .listMeetingRecordings({ meetingId: 12345 });
    assert.deepEqual(ret.path, '/meetings/12345/recordings');
    assert.deepEqual(ret.method, 'GET');
    assert.deepEqual(ret.params, undefined);
  });

  it('lists Meeting Recordings with double encoding needed (Test 1)', async function () {
    const ret = await testAPI.cloudRecording.listMeetingRecordings({ meetingId: '/12345' });
    assert.deepEqual(ret.path, '/meetings/%252F12345/recordings');
    assert.deepEqual(ret.method, 'GET');
    assert.deepEqual(ret.params, undefined);
  });

  it('lists Meeting Recordings with double encoding needed (Test 2)', async function () {
    const ret = await testAPI.cloudRecording.listMeetingRecordings({ meetingId: '123//45' });
    assert.deepEqual(ret.path, '/meetings/123%252F%252F45/recordings');
    assert.deepEqual(ret.method, 'GET');
    assert.deepEqual(ret.params, undefined);
  });

  // TODO : Test without post processor altering response object
  // it('lists User Recordings with only required params', async function () {
  //   const ret = await testAPI.cloudRecording
  //     .listUserRecordings({ userId: '12345' });
  //   assert.deepEqual(ret.path, '/users/12345/recordings');
  //   assert.deepEqual(ret.method, 'GET');
  //   assert.deepEqual(ret.params, { page_size: 300, trash: false, from: defaultDate });
  // });

  // it('lists User Recordings with pagesize', async function () {
  //   const ret = await testAPI.cloudRecording
  //     .listUserRecordings({ userId: '12345', pageSize: '39' });
  //   assert.deepEqual(ret.path, '/users/12345/recordings');
  //   assert.deepEqual(ret.method, 'GET');
  //   assert.deepEqual(ret.params, { page_size: 39, trash: false, from: defaultDate });
  // });

  // it('lists User Recordings with start and end dates', async function () {
  //   const ret = await testAPI.cloudRecording.listUserRecordings({ userId: '12345', startDate: '2020/08/20', endDate: '2020-10/5' });
  //   assert.deepEqual(ret.path, '/users/12345/recordings');
  //   assert.deepEqual(ret.method, 'GET');
  //   assert.deepEqual(ret.params, {
  //     page_size: 300, trash: false, from: '2020-08-20', to: '2020-10-05',
  //   });
  // });

  // it('lists User Recordings with invalid date', async function () {
  //   try {
  //     await testAPI.cloudRecording.listUserRecordings({ userId: '12345', startDate: 'invalid' });
  //   } catch (err) {
  //     assert.deepEqual(
  //       err.message,
  //       'startDate needs to be a JS Date instance or a string accepted by the Date constructor',
  //       'Wrong error message thrown'
  //     );
  //   }
  // });

  // it('lists User Recordings with invalid pageSize', async function () {
  //   try {
  //     await testAPI.cloudRecording.listUserRecordings({ userId: '12345', pageSize: 'invalid' });
  //   } catch (err) {
  //     assert.deepEqual(
  //       err.message,
  //       'pageSize is not a valid number',
  //       'Wrong error message thrown'
  //     );
  //   }
  // });
});
