
const createTestJobs = require('./helpers').createTestJobs;
const toSeconds = require('./helpers').toSeconds;

// A javascript object to contain global list of jobs
let queue = {};

// Adds a job to the global list
const addJob = ({ id, time }) => {
  if (queue[time]){
    queue[time].push(id);
  } else {
    queue[time] = [id];
  }
  console.log(`new job || id: ${id}  time: ${time} `);
};

// Add an array of jobs to queue
const addJobs = jobs => {
  jobs.forEach( job => {
    addJob(job);
  })
}

// Returns array of jobs for a tick
const getJobsForTick = tick => {
  let jobs = queue[toSeconds(tick).toString()];
  return jobs ? jobs : [];
}

// Execute the jobs for a tick
const tick = time => {

  console.log(`tick: ${toSeconds(time)}`);

  let jobs = getJobsForTick(time);

  jobs.forEach( job => {
    console.log(`Executing job || job id : ${job}`);
  })
}

// Main function for scheduler
// - populates queue
// - executes a tick ever 1 second
const main = () => {

  // stick some dummy data into the job queue
  const testJobs = createTestJobs();
  console.log(testJobs)
  addJobs(testJobs);

  // log the contents of the job queue
  console.log('queue: ', queue);

  // Perform a tick every second
  setInterval( function(){

    const tickTime = Date.now().valueOf();
    tick(tickTime);

  }, 1000)
}

// Start the scheduler
main();
