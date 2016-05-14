import { diffJson } from 'diff'
import fs from 'fs'

export function readFile(filename, enc){
  return new Promise((accept, reject) => {
    fs.readFile(filename, enc, (err, res) => {
      if (err) reject(err);
      else accept(res);
    });
  });
}


export function updateFile(file, data) {
  return new Promise((accept, reject) => {
    fs.writeFile(file, JSON.stringify(data, null, 4), err => {
      if (err) reject(err)
      else accept('Done writing new data json file!')
    })
  })
}

export function diff(oldData, newData) {
  let liveData = oldData
  let potentiallyUpdatedData = newData
  let difference = diffJson(liveData, potentiallyUpdatedData)
  for (let part of difference) {
    // images change in a weird way, so we're going to ignore updates to images unless there's a different change
    if (part.value.indexOf('image') == -1 && (part.added || part.removed)) {
      return true
    }
  }
  return false
}