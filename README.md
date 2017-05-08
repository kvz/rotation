# rotation
Generate filenames suitable for backup rotation/re

## Intro

You're probably backing up something. If you're backing up big things, every day, storage quickly
gets expensive. One way to combat that is to expire old archives, perhaps via some algorithm. 
A second way to combat that is to generate backup filenames that overwrite previous archives. 
Sounds scary? Maybe. Yes. But so does automatically purging old archives. You decide. Here's how it works.

If you had [Rotation](https://github.com/kvz/rotation) generate a filename for you every day, starting from `2017-01-01`, ending on `2019-01-01`,
you end up with [this](https://github.com/kvz/rotation/blob/master/src/__snapshots__/rotation.test.js.snap#L4) 
list of files:

```bash
./db-daily-1-sunday.tar.gz      # contains a backup from: 2018-12-30
./db-daily-2-monday.tar.gz      # contains a backup from: 2018-12-31
./db-daily-3-tuesday.tar.gz     # contains a backup from: 2018-12-25
./db-daily-4-wednesday.tar.gz   # contains a backup from: 2018-12-26
./db-daily-5-thursday.tar.gz    # contains a backup from: 2018-12-27
./db-daily-6-friday.tar.gz      # contains a backup from: 2018-11-30
./db-daily-7-saturday.tar.gz    # contains a backup from: 2018-12-29
./db-monthly-01-january.tar.gz  # contains a backup from: 2019-01-01
./db-monthly-02-february.tar.gz # contains a backup from: 2018-02-01
./db-monthly-04-april.tar.gz    # contains a backup from: 2018-04-01
./db-monthly-05-may.tar.gz      # contains a backup from: 2018-05-01
./db-monthly-07-july.tar.gz     # contains a backup from: 2018-07-01
./db-monthly-08-august.tar.gz   # contains a backup from: 2018-08-01
./db-monthly-10-october.tar.gz  # contains a backup from: 2018-10-01
./db-monthly-11-november.tar.gz # contains a backup from: 2018-11-01
./db-quarterly-2017-1.tar.gz    # contains a backup from: 2017-03-01
./db-quarterly-2017-2.tar.gz    # contains a backup from: 2017-06-01
./db-quarterly-2017-3.tar.gz    # contains a backup from: 2017-09-01
./db-quarterly-2017-4.tar.gz    # contains a backup from: 2017-12-01
./db-quarterly-2018-1.tar.gz    # contains a backup from: 2018-03-01
./db-quarterly-2018-2.tar.gz    # contains a backup from: 2018-06-01
./db-quarterly-2018-3.tar.gz    # contains a backup from: 2018-09-01
./db-quarterly-2018-4.tar.gz    # contains a backup from: 2018-12-01
./db-weekly-1.tar.gz            # contains a backup from: 2018-12-07
./db-weekly-2.tar.gz            # contains a backup from: 2018-12-14
./db-weekly-3.tar.gz            # contains a backup from: 2018-12-21
./db-weekly-4.tar.gz            # contains a backup from: 2018-12-28
```

Let's say your backups on average are `10GB`. With [Rotation](https://github.com/kvz/rotation)'s algorithm we only retain 26 files over these two years of the above exampple. So we're consuming `260GB`. If we had written a new filename every day it would have been `(2 years x 365 days x 10GB) = 7300GB`. So you realized a 2700% saving in storage costs, while maintaining the following retention properties:

| Up until      | You get to restore with a granularity of |
|:--------------|:-----------------------------------------|
| `1 week` ago  | `1 day`                                  |
| `1 month` ago | `7 days`                                 |
| `1 year` ago  | ~`30 days`                               |
| `>1 year` ago | ~`90 days`                               |

In short, if something went wrong in November 2010 but you discover 7 years later :thinking:, you could access the backup from September 1st 2010. If something went wrong today, you could access yesterday's backup.

## Install

If you intend to use on the CLI:

```bash
npm install rotation --global
```

If you intend to use programmatically in Node.js:

```bash
npm install rotation --save
```

## Use

[Rotation](https://github.com/kvz/rotation) is a simple JavaScript project that just returns a proposed filename based on the current (or specified) time. 

Usage on the CLI:

```bash
$ rotation
daily-0-sunday
```

If you intend to use programmatically in Node.js:

```javascript
const rotation = require('rotation')
console.log(rotation())
// daily-0-sunday
```

## Options

[Rotation](https://github.com/kvz/rotation) supports the following options:

| cli                   | API                                | Default | Description                                              |
|:----------------------|:-----------------------------------|:--------|:---------------------------------------------------------|
| `--prefix "<string>"` | `rotation({ prefix: "<string>" })` | `""`    | Prepend the proposed filename with `<string>`            |
| `--suffix "<string>"` | `rotation({ suffix: "<string>" })` | `""`    | Append the proposed filename with `<string>`             |
| `--date "<string>"`   | `rotation({ date: "<string>" })`   | NOW     | Use a different date than current time (not recommended) |

## Examples

### CLI

```bash
$ rotation --date "2017-05-13" --prefix "s3://backups.transloadit.com/database/" --suffix ".tar.gz"
s3://backups.transloadit.com/database/daily-6-saturday.tar.gz
```

### Bash scripts

This is a more likely scenario than plain manual execution on the shell of course

```bash
set -eu
s3target=$(rotation --date "2017-05-13" --prefix "s3://backups.transloadit.com/database/" --suffix ".tar.gz")
mysqldump --opt transloadit | gzip -c | aws s3 cp - "${s3target}"
```

### Node.js API

```javascript
const rotation = require('rotation')
let s3target   = rotation({
  date  : new Date().setDate(-7), // just to show rotation accepts js dates
  prefix: 's3://backups.transloadit.com/database/'
  suffix: '.tar.gz'
})
```

## Good to know

- All dates are in UTC
- When recovering a file, it's good if your storage platform can support sorting by modification date in descending order, so that you never overlook yesterday's backup if it happens to have been written as a `quarterly` backup.
- [Rotation](https://github.com/kvz/rotation) does make backups, and does not not interface with storage or the outside world, it only generates a filename that you can use in your actual backups

## Todo

- Add Travis CI support
- Add `--help` or similar for CLI users

## License

MIT
