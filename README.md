# rotation
Generate filenames suitable for backup rotation/re

## Intro

You're probably backing up something. If you're backing up big things, every day, storage quickly
gets expensive. One way to combat that is to expire old archives, perhaps via some algorithm. 
A second way to combat that is to generate backup filenames that overwrite previous archives. 
Sounds scary? Maybe. Yes. But so does automatically purging old archives. You decide. Here's how it works.

If you had Rotation generate a filename for you every day, starting from `2017-01-01`, ending on `2019-01-01`,
you end up with [this](https://github.com/kvz/rotation/blob/master/src/__snapshots__/rotation.test.js.snap#L4) 
list of files:

```bash
"daily-0-sunday": "2018-12-30",
"daily-1-monday": "2018-12-31",
"daily-2-tuesday": "2018-12-25",
"daily-3-wednesday": "2018-12-26",
"daily-4-thursday": "2018-12-27",
"daily-5-friday": "2018-11-30",
"daily-6-saturday": "2018-12-29",
"monthly-01-january": "2019-01-01",
"monthly-02-february": "2018-02-01",
"monthly-03-march": "2018-03-01",
"monthly-05-may": "2018-05-01",
"monthly-06-june": "2018-06-01",
"monthly-07-july": "2018-07-01",
"monthly-09-september": "2018-09-01",
"monthly-10-october": "2018-10-01",
"monthly-11-november": "2018-11-01",
"quarterly-2017-0": "2017-04-01",
"quarterly-2017-1": "2017-08-01",
"quarterly-2017-2": "2017-12-01",
"quarterly-2018-0": "2018-04-01",
"quarterly-2018-1": "2018-08-01",
"quarterly-2018-2": "2018-12-01",
"weekly-1": "2018-12-07",
"weekly-2": "2018-12-14",
"weekly-3": "2018-12-21",
"weekly-4": "2018-12-28",
```

Let's say your backup archive on average is 1GB. With Rotation's algorithm we've 26 files, so `26GB`, vs if we just wrote a new file every day `(2 years x 365 days x 1GB) = 730GB`, so you've kept your storage requirements in check by having saving `704GB` less data a 2700% saving in storage costs, while 
maintaining the following retention guarantees:

| Up until    | You have a restore-granularity of |
|:------------|:----------------------------------|
| 1 week ago  | 1 day                             |
| 1 month ago | 1 week                            |
| 1 year ago  | 1 month                           |
| >1 year ago | 1 quarter year                    |

In short, if something went wrong in February 2010 but you discover 7 years later :thinking:, you could still access the backup from January 2010. If something went wrong today, you can access yesterday's backup.

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

Rotation is a simple JavaScript project that just returns a proposed filename based on the time right now. 

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

Rotation supports the following options:

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

### Node.js API

```javascript
const rotation = require('rotation')
console.log(rotation({
  date: new Date().setDate(-7),
  prefix: 's3://backups.transloadit.com/database/'
  suffix: '.tar.gz'
}))
// s3://backups.transloadit.com/database/monthly-11-november.tar.gz
```

## Good to know

- All dates assume/use UTC
- Rotation does not interface with storage or the outside world, it only generates a filename that you can use in your scripts

## License

MIT
