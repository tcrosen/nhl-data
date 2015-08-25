# NHL Data Utilities

* Downloads various datasets from NHL.com
* Scrapes raw data out of NHL.com HTML files
* Parses raw data into logical MongoDB collections

## Datasets

* Schedules: Full list of games
* Players: Basic player profiles
* Teams: Team profiles
* Games: High-level game info
* Game Logs: Official play-by-play logs

## Quick Start

1. Download source code

  ```sh
  $ git clone https://github.com/tcrosen/nhl-data
  $ cd nhl-data
  $ npm install
  ```

1. Start MongoDB (in a new terminal)

  ```sh
  $ mongod
  ```

1. Run the app

  ```sh
  $ node index [option]
  ```

## CLI

```sh
Usage: index [options]

Options:

  -h, --help      output usage information
  -V, --version   output the version number
  -s, --schedule  Import schedule
  -t, --teams     Import teams
  -p, --players   Import players
  -l, --logs      Import game logs

```
