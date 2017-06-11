
// generates a series of job for testing
const createTestJobs = () => {
  const now = new Date();
  let jobs = [];

  for ( let i = 0; i < 1000; i++){

    const id = i;
    const time = now.valueOf() + 200 * i;

    const timeInSeconds = toSeconds(time)

    jobs.push({
      id,
      time : timeInSeconds
    });
  }

  return jobs;
}


// helper function to round milliseconds to seconds
const toSeconds = timeInMilliseconds => Math.round( timeInMilliseconds /1000);

module.exports = {
  createTestJobs,
  toSeconds
}
