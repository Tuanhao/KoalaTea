export let removeTeaMsg = (teaId) => {
  return {
    "msgId": 10,
    "teaId": teaId,
  }
}

export let startBrewing = (teaName, steepTime, temp, alarmName, fileLocation) => {
  return {
    "msgId": 4,
    "tea": {
        "name": teaName,
        "steepTime": steepTime,
        "temp": temp
    },
    "alarm": {
        "name": alarmName,
        "fileLocation": fileLocation
    }
  }
}