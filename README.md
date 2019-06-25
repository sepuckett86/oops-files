# oops-files

## Steps

1. Determine what information your friend can give you to solve the problem
      * Assume that they can give you the directory name **OR** that you can put your code inside their directory **OR** they give you a folder with the files. The last way is the easiest, so say you are given a folder of unknown files names.
1. Set up a basic file structure with index.js and index.test.js
1. Write tests that do the following:
      * beforeEach: write a few files
      * afterEach: delete those files
      * get the names of all the files in a directory
      * get the name of a file with a function
      * get the content of a file with a function
      * get the date-modified of a file with a function
      * renames a file with a function and removes that file
1. Write functions for all of the tests to pass tests
1. Write a function that incorporates the other functions and loops through all files in a directory to rename them
