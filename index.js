const fetch = require('node-fetch')
const moment = require('moment')

// 'https://api.gymhuntr.com/api/check?latitude=59.91404177272732&longitude=10.743888616561891&hashCheck=57b34b3eca72eed3178b785dcca4289g4&monster=83jhs&timeUntil=1520068031&time=1520065803'
// 'https://api.gymhuntr.com/api/check?latitude=59.91404177272732&longitude=10.743888616561891&hashCheck=57b34b3eca72eed3178b785dcca4289g4&monster=83jhs&timeUntil=1520068988&time=1520066760'
const interestingGyms = ['Tinius', 'Dyrefontene', 'Little Green Men']

function getDesiredGyms (gyms) {
  return gyms
    .map(JSON.parse)
    .filter(({ gym_name: name }) => interestingGyms.includes(name))
}

function getGymIds (gyms) {
  return gyms.map(({gym_id: id}) => id)
}

function getRaidsByGymIds (raids, gymsIds) {
  return raids.map(JSON.parse).filter(({ gym_id: id }) => gymsIds.includes(id))
}

async function checkArea () {
  // console.log(moment().unix())
  // console.log(moment().add(37, 'minutes').unix())
  const checkUrl = 'https://api.gymhuntr.com/api/check?latitude=59.91404177272732&longitude=10.743888616561891' +
    '&hashCheck=57b34b3eca72eed3178b785dcca4289g4' +
    '&monster=83jhs' +
    '&timeUntil=' + moment().add(37, 'minutes').unix() +
    '&time=' + moment().unix()
  const response = await fetch(checkUrl)
  const result = await response.json()
  console.log(result)
}

async function fetchData () {
  const url = 'https://api.gymhuntr.com/api/gyms?latitude=59.91404177272732&longitude=10.743888616561891' +
    '&hashCheck=57b34b3eca72eed3178b785dcca4289g4' +
    '&monster=83jhs' +
    '&timeUntil=21613187834.634033' +
    '&time=1520056012'
  const response = await fetch(url)
  return await response.json()
}

async function main () {
  // not working properly
  await checkArea()

  const { gyms, raids } = await fetchData()
  const requiredGyms = getDesiredGyms(gyms)
  const requiredGymIds = getGymIds(requiredGyms)
  const interestingRaids = getRaidsByGymIds(raids, requiredGymIds)

  // console.log(requiredGyms)
  // console.log(requiredGymIds)
  // console.log(raids)
  console.log(interestingRaids)
}

main()
