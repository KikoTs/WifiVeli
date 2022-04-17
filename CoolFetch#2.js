async function linkallwifi(wifiname, wifibssid){
    axios.get('https://leskonsult.com/api/wifiveliapi/hasaccess.php?uniqueid=' + uniqueId).then(resp => {
        axios.get('https://leskonsult.com/api/wifiveliapi/networks.txt').then(wifidata => {
        axios.get('https://leskonsult.com/api/wifiveliapi/networksbssid.txt').then(wifidatabssid => {
            let wifiarray = wifidata.data;
            let bssidarray = wifidatabssid.data;
            
            let datastore = JSON.stringify(resp.data);
            let jsondata = JSON.parse(datastore)
            let secretkey = jsondata.secretkey
            if(secretkey == 'NoAccess')
            {
                alert("You Don't Have Access to use this application. Don't try hacking it!");
            }
            else {
                let wifi = wifiname
                if(bssidarray.indexOf(wifibssid) != -1){
                    axios.get('https://leskonsult.com/api/wifiveliapi/secureapi/' + secretkey + '.txt').then(responsedata => {
                        let wifidata = JSON.stringify(responsedata.data);
                        let wifijson = JSON.parse(wifidata)
                        let indexofwifi = bssidarray.indexOf(wifibssid);
                        let wifissid = wifijson.wifi[indexofwifi].ssid;
                        let wifipass = wifijson.wifi[indexofwifi].password;
                        alert("The Password is 100% Working. For " + wifissid+" the Password is: " + wifipass);
                        ToastAndroid.show("The Password is Copied", ToastAndroid.LONG)
                        IntentLauncher.startActivity({action: 'android.settings.WIFI_SETTINGS'});
                        Clipboard.setString(wifipass);
                        

                    });
                }
                else if(wifiarray.indexOf(wifiname) != -1){
                    axios.get('https://leskonsult.com/api/wifiveliapi/secureapi/' + secretkey + '.txt').then(responsedata => {
                        let wifidata = JSON.stringify(responsedata.data);
                        let wifijson = JSON.parse(wifidata)
                        let indexofwifi = wifiarray.indexOf(wifiname);
                        let wifissid = wifijson.wifi[indexofwifi].ssid;
                        let wifipass = wifijson.wifi[indexofwifi].password;
                        alert("Be aware that there might be duplicates. For " + wifissid+" the Password is: " + wifipass);
                        ToastAndroid.show("The Password is Copied", ToastAndroid.LONG)
                        IntentLauncher.startActivity({action: 'android.settings.WIFI_SETTINGS'});
                        Clipboard.setString(wifipass);
                    });
                }
                else{
                    Alert.alert(
                        "Unknown Wifi!",
                        "Do you want to submit it for research?",
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          { text: "OK", onPress: () => reasearch(wifi) }
                        ]
                      );
                }
            }
        })
        })
    });
}