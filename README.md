[![codecov](https://codecov.io/gh/csc-324-sga-assisting-tool/csc-324-sga-assisting-tool/branch/main/graph/badge.svg)](https://codecov.io/gh/csc-324-sga-assisting-tool/csc-324-sga-assisting-tool)

# GBudget

An application for Grinnell College Registered Student Organizations (RSOs) and Student Educational Policy Committees (SECPs) to submit budget requests to the Student Goverment Association (SGA) Treasurer.

Students will create an account using their RSO or SECP email address.  The SGA treasurer and assistant treasurers will be able to create an account using their respective email addresses.

Students can create a budget request for their RSO or SECP events.  They can add details about the event, including a description, date, time, and location information, and more.  They can also add budget items to their event.  Once submitted, the SGA treasurer can review the budget and either approve or deny the budget.  If there are items that need to be changed, such as a disallowed item, the treasurer can mark which items need to be changed and the student can resubmit the budget.


## Repo Layout

- `src/` : contains the source code for the app
- `test/` : contains tests for our app

The `src/` and `test/` folders are forther divided as follows:

- `app/` : contains front-end code or test for front-end.
  - Each subfolder is a different page
- `lib/` : contains back-end code or test for back-end

## Style

We will be following Google's TypeScript Style Guide for this repo. See more details on the [wiki](https://github.com/csc-324-sga-assisting-tool/csc-324-sga-assisting-tool/wiki) which includes instructions on how to set up and use the automated linter
