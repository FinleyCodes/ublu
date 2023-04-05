const fs = require('fs')
const { join } = require('path')

const express = require('express')
const app = express()
const port = 3000

const files = fs.readdirSync(join(__dirname + '/routes')).filter(fi => fi.endsWith(".js") || fi.endsWith('.ts'))
files.forEach((route) => {
    route = require(join(__dirname + `/routes/${route}`))
    app.get(route.path, (req, res) => {
        route.execute(req, res)
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})