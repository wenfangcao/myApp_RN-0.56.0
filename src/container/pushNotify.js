import { PushNotificationIOS } from "react-native"

function push () {
    PushNotificationIOS.checkPermissions(res => {
        console.log(res)
        if (res.alert == '0') {
        PushNotificationIOS.requestPermissions()
        }
    })
    PushNotificationIOS.presentLocalNotification({
        alertBody: 'ok',
        applicationIconBadgeNumber: 1
    })
    PushNotificationIOS.scheduleLocalNotification({
        alertTitle: "111",
        alertBody: 'ok',
        fireDate: new Date().getTime() + 1000
    })
    PushNotificationIOS.getScheduledLocalNotifications(res => {
        console.log(res)
    })
}