#!/usr/bin/env node

const Command = require('xcm').default
const fs = require('fs')
const axios = require('axios')

/* logging mock */
const log = (...args) => console.log(...args)

new Command('raspi-http-post-button')
  .action(([gpio, url]) =>
    setInterval(() => {
      fs.readFile(`/sys/gpio${gpio}`, (err, data) => {
        if (err) {
          log(err)
        } else if (data.toString() === '1') {
          axios.post(url).catch(log)
        }
      })
    }, 30)
  )
  .parse()
