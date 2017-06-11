# simple scheduler
This is a simple scheduling queue in javascript


## to run
- Clone this repository
- Install nodejs (https://nodejs.org/en/)
- Navigate to the directory where this repository is cloned
- Run ```node index.js```
- ```CRTL + C``` stops the scheduler
- **Note:** There are three test scenarios available to run:
  - ```node index.js``` runs the default scenario which demonstrates adding two batches of jobs defined by offsets
  - ```node index.js addJobs``` demonstrates adding jobs by execution time
  - ```node index.js manyJobs``` demonstrates the scheduler managing a large set of jobs


## code structure
- *simpleScheduler.js* : Contains the implementation of the scheduler.  External API includes:
  - **init(** jobs **)** : where *jobs* is an array of jobs defined as
    - ```{jobId : string, time: UTC seconds at which to execute}```
  - **addJobsByTime(** jobs **)** : where *jobs* is an array of jobs defined as
    - ```{jobId : string, time: UTC seconds at which to execute}```
  - **addJobsByOffset(** jobs **)** : where *jobs* is an array of jobs defined as
    - ```{jobId : string, offset: number (of seconds to delay execution)}```
- *index.js* : Contains code that will run the scheduler in various test modes
- *helpers.js* : Contains helper functions that were factored out for readability in the other files
