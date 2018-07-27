/**
 * Created by dionid on 09.07.2018.
 */

console.log("Env started")

export default class Env {
  get(propName, def) {
    return process.env[propName] || def
  }
}
