const populateTestJobs = () => {
  const now = new Date();

  for ( let i = 0; i < 10; i++){

    const id = i;
    const time = now.valueOf() + 500 * i;

    const timeInSeconds = toSeconds(time)

    console.log(`new job || id: ${id}  time: ${timeInSeconds} `);

    addJob({
      id,
      time : timeInSeconds
    })
  }
}

const toSeconds = timeInMilliseconds => Math.round( timeInMilliseconds /1000);

//========================================================

// A javascript object to contain global list of jobs
let queue = {};


// Adds a job to the global list
const addJob = ({ id, time }) => {
  if (queue[time]){
    queue[time].push(id);
  } else {
      queue[time] = [id];
  }
};

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

const main = () => {

  // stick some dummy data into the job queue
  populateTestJobs();

  // log the contents of the job queue
  console.log('queue: ', queue);

  // Perform a tick every second
  setInterval( function(){

    const tickTime = Date.now().valueOf();
    tick(tickTime);

  }, 1000)
}

main();
