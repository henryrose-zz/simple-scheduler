
const createTestJobs = require("./helpers").createTestJobs;
const scheduler = require("./simpleScheduler");

const main = () => {

  // create a batch of test jobs
  const testJobs = createTestJobs();
  console.log(`test jobs created || jobs: ${testJobs}`);

  // Initialize scheduler
  scheduler.init(testJobs);
};

// Start the scheduler
main();
