/**
 *  Simple Scheduler manages a set of jobs to be executed in the future
 **/

const toSeconds = require("./helpers").toSeconds;
const displaySeconds = require("./helpers").displaySeconds;

// A javascript object to contain global list of jobs
let queue = {};

// Number of milliseconds to wait between processing each tick
const TICK_MILLISECONDS = 1000;

const LOG_PREFIXES = {
  start :   "START SCHEDULER",
  addJob:   "ADD JOB ",
  execJob:  "EXEC JOB",
  tick:     "TICK    "
};

// Starts a scheduler with optional initial jobs
const init = (jobs = []) => {

  const startTime = Date.now().valueOf();

  addJobsByTime(jobs);

  let displayTime = displaySeconds(toSeconds(startTime));

  // log the contents of the job queue
  console.log(`${LOG_PREFIXES.start} || intial jobs: ${jobs}, start time: ${displayTime}`);

  // Perform a tick every second
  setInterval( function(){
    const tickTime = Date.now().valueOf();
    tick(tickTime);
  }, TICK_MILLISECONDS);

  tick(startTime);

};

// Adds a job to the global list
const addJob = ({ id, time }) => {
  if (queue[time]){
    queue[time].push(id);
  } else {
    queue[time] = [id];
  }
  console.log(`${LOG_PREFIXES.addJob} || id: ${id}  time: ${displaySeconds(time)} `);

  if(time <= toSeconds(Date.now().valueOf())) {
    executeJob(id);
  }
};

// Add an array of jobs to queue
const addJobsByTime = jobs => {
  jobs.forEach( job => {
    addJob(job);
  });
};

// Add an array of jobs where time is defined as an offset from now
const addJobsByOffset = jobs => {
  jobs.forEach( (job) => {
    const id = job.id;
    const time = toSeconds(Date.now().valueOf() + job.offset * 1000);
    addJob({
      id,
      time
    });
  });
};

const executeJob = (jobId) => {
  console.log(`${LOG_PREFIXES.execJob} || job id : ${jobId}`);
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
    executeJob(job);
  });

  let displayTime = displaySeconds(toSeconds(time));

  console.log(`${LOG_PREFIXES.tick} || time:  ${displayTime}`);
};

module.exports = {
  addJobsByTime,
  addJobsByOffset,
  init
};
