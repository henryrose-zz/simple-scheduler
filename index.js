
const createTestJobs = require("./helpers").createTestJobs;
const toSeconds = require("./helpers").toSeconds;

// Our Scheduler
const scheduler = require("./simpleScheduler");

// Main function - determines which test scenario to run
// Defaults to AddJobsByOffset scenario
const main = () => {

  const testMode = process.argv[2];

  console.log(`Starting Simple Scheduler || testMode: ${testMode}`);
  console.log("CTRL + C to stop");

  switch (testMode) {
  case "addJobs" : {
    addJobsWhileRunning();
    break;
  }
  case "manyJobs" : {
    runWithThousandsOfJobs();
    break;
  }
  default : {
    addJobsByOffset();
  }
  }
};

// A test scenario that demonstrates adding two batches of jobs by offset
const addJobsByOffset = () => {
  // create a batch of test jobs
  // Initialize scheduler
  scheduler.init();

  const jobsBatch1 = [{
    id : 1,
    offset : 0
  }, {
    id : 2,
    offset : 3
  }, {
    id : 3,
    offset: 3
  }, {
    id : 4,
    offset: 1
  }];
  const jobsBatch2 = [{
    id: 5,
    offset: 3
  }];

  scheduler.addJobsByOffset(jobsBatch1);

  setTimeout(() => {
    scheduler.addJobsByOffset(jobsBatch2);
  }, 2000);
};

// A test scenario demonstrating the scheduler running thoursands of jobs
const runWithThousandsOfJobs = () => {
  // create a batch of test jobs
  const testJobs = createTestJobs();
  console.log(`test jobs created || jobs: ${testJobs}`);

  // Initialize scheduler
  scheduler.init(testJobs);
};

// A test scenario demonstrating the ability to add jobs by execution time
const addJobsWhileRunning = () => {

  scheduler.init();

  const now = new Date();

  // After one second, add a batch of jobs
  const job1startTime = toSeconds(now.valueOf() + 2000);
  const job2startTime = toSeconds(now.valueOf() + 4000);
  const job3startTime = toSeconds(now.valueOf() + 4000);
  setTimeout( () => {
    scheduler.addJobsByTime([{
      id : "test job 1",
      time: job1startTime
    },
    {
      id : "test job 2",
      time: job2startTime
    },
    {
      id : "test job 3",
      time: job3startTime
    }
    ]);
  }, 1000);


  // After three seconds, add a second batch of jobs
  const job4startTime = toSeconds(now.valueOf() + 4000);
  const job5startTime = toSeconds(now.valueOf() + 5000);
  setTimeout( () => {
    scheduler.addJobsByTime([{
      id : "test job 4",
      time: job4startTime
    },
    {
      id : "test job 5",
      time: job5startTime
    }
    ]);
  }, 3000);

};

// Start the scheduler
main();
