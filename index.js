
const createTestJobs = require("./helpers").createTestJobs;
const toSeconds = require("./helpers").toSeconds;

// Our Scheduler
const scheduler = require("./simpleScheduler");

const main = () => {

  const testMode = process.argv[2];

  console.log(`Starting Simple Scheduler || testMode: ${testMode}`);
  console.log("CTRL + C to stop");

  switch (testMode) {
  case "addJobs" : {
    addJobsWhileRunning();
    break;
  }
  default : {
    runWithThousandsOfJobs();
  }
  }


};

const runWithThousandsOfJobs = () => {
  // create a batch of test jobs
  const testJobs = createTestJobs();
  console.log(`test jobs created || jobs: ${testJobs}`);

  // Initialize scheduler
  scheduler.init(testJobs);
};

const addJobsWhileRunning = () => {

  scheduler.init();

  const now = new Date();

  // After one second, add a batch of jobs
  const job1startTime = toSeconds(now.valueOf() + 2000);
  const job2startTime = toSeconds(now.valueOf() + 4000);
  const job3startTime = toSeconds(now.valueOf() + 4000);
  setTimeout( () => {
    scheduler.addJobs([{
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
    scheduler.addJobs([{
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
