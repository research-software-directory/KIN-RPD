# Contributing to the KIN Research Project Directory

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

The following is a set of guidelines for contributing to the Research Project Directory (as a Service), which is hosted on [GitHub](https://github.com/research-software-directory/KIN-RPD).
These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document.
We welcome any kind of contribution to our software, from simple comments or questions to a full fledged [pull request](https://help.github.com/articles/about-pull-requests/).

## Code of conduct

Help us keep the Research Project Directory open and inclusive. Please read and follow our [Code of Conduct](https://github.com/research-software-directory/KIN-RPD/blob/main/CODE_OF_CONDUCT.md).

## How to contribute

A contribution can be one of the following cases:

1. you have a question, suggestion, comment, etc.;
1. you have found a bug (including unexpected behavior, errors in documentation, etc.)
1. you want to request a feature;
1. you want to make some kind of change to the code base yourself (e.g. to fix a bug, to add a new feature, to update documentation).
1. you wish to contribute in some other way.

The sections below outline the steps in each case.

## You have a question, suggestion, comment, etc.

For general questions (not directly related to the development of the software) you can send an email to rsd@esciencecenter.nl. Alternatively, you can also submit an issue:

1. use the search functionality [here](https://github.com/research-software-directory/KIN-RPD/issues) to see if someone already filed the same issue;
1. if you find a similar issue, you can add your own comments to this issue;
1. if your issue search did not yield any relevant results, make a new issue;
1. apply the "question" label; apply other labels when relevant.

## You have found a bug

If you find a bug or experience unexpected behaviour, you can submit an issue:

1. use the search functionality [here](https://github.com/research-software-directory/KIN-RPD/issues) to see if someone already filed the same issue;
1. if you find a similar issue, you can add your own comments to this issue;
1. if your issue search did not yield any relevant results, make a new issue, making sure to provide enough information to the rest of the community to understand the cause and context of the problem. Depending on the issue and your technical expertise, you may want to include:
   - the [SHA hashcode](https://help.github.com/articles/autolinked-references-and-urls/#commit-shas) of the commit that is causing your problem;
   - some identifying information (name and version number) for the version you're using;
   - information about the operating system and browser you are using;
1. apply the "bug" label; apply other labels when relevant.

## You want to request a feature

To request a feature you can submit an issue on GitHub. Please keep in mind that our development resources are limited, so we may not be able to honor your request.

1. use the search functionality [here](https://github.com/research-software-directory/KIN-RPD/issues) to see if someone already filed the same issue;
1. if you find a similar issue, you can add your own comments and suggestions to this issue (having more people request the same feature may increase its priority);
1. if your issue search did not yield any relevant results, make a new issue, making sure to provide enough information to the rest of the community to understand the feature you are requesting. We may get back to you with further questions.
1. apply the "feature" label; apply other labels when relevant.

## You want to make some kind of change to the code base youself

Contributions to the code base are very welcome. Keep in mind, however, that this also requires a good interaction with the community to ensure that your contribution is adopted.

1. (**important**) announce your plan to the rest of the community _before you start working_. This announcement should be in the form of a (new) issue;
1. (**important**) wait until some kind of concensus is reached about your idea being a good idea;
1. (**important**) we are applying the [REUSE specification](https://reuse.software/) in order to keep track of copyright and licenses in this repository. See the [section below](#license-and-copyright-information-according-to-the-reuse-specification) for an example. We run a REUSE linter job upon every pull request to make sure all files have at least license information attached. To automate the task of adding REUSE compliant headers you can optionally use our [pre-commit hook template](#automatically-updating-headers-using-a-pre-commit-hook).
1. if needed, fork the repository to your own Github profile and create your own feature branch off of the latest master commit. While working on your feature branch, make sure to stay up to date with the master branch by pulling in changes, possibly from the 'upstream' repository (follow the instructions [here](https://help.github.com/articles/configuring-a-remote-for-a-fork/) and [here](https://help.github.com/articles/syncing-a-fork/));
1. make sure the existing unit tests still work;
1. make sure that the existing integration tests still work;
1. add your own unit tests and integration tests (if necessary);
1. update or expand the documentation;
1. [push](http://rogerdudler.github.io/git-guide/) your feature branch to (your fork of) the repository on GitHub;
1. create a pull request, e.g. following the instructions [here](https://help.github.com/articles/creating-a-pull-request/).

In case you feel like you've made a valuable contribution, but you don't know how to write or run tests for it, or how to generate the documentation: don't let this discourage you from making the pull request; we can help you! Just go ahead and submit the pull request, but keep in mind that you might be asked to append additional commits to your pull request (have a look at some of our old pull requests to see how this works).

## You want to contribute in some other way

Contributions to the code are by no means the only way to contribute to the Research Project Directory. If you wish to contribute in some other way, please contact us at rsd@esciencecenter.nl.
