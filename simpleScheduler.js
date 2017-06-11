/**
 *  Simple Scheduler manages a set of jobs to be executed in the future
 **/

const toSeconds = require("./helpers").toSeconds;

// A javascript object to contain global list of jobs
let queue = {};

// Starts a scheduler with optional initial jobs
const init = (jobs = []) => {

  addJobs(jobs);

  // log the contents of the job queue
  console.log(`starting scheduler ||  intial jobs: ${jobs}`);

  // Perform a tick every second
  setInterval( function(){
    const tickTime = Date.now().valueOf();
    tick(tickTime);

  }, 1000);

};

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
  });
};

// Returns array of jobs for a tick
const getJobsForTick = tick => {
  let jobs = queue[toSeconds(tick).toString()];
  return jobs ? jobs : [];
};

// Execute the jobs for a tick
const tick = time => {

  let jobs = getJobsForTick(time);

  jobs.forEach( job => {
    console.log(`Executing job || job id : ${job}`);
  });

  let jobsLog = jobs.length > 0 ? jobs : "no jobs found for this tick";

  console.log(`tick || time:  ${toSeconds(time)}, jobs : ${jobsLog}`);
};

module.exports = {
  addJobs,
  init
};
