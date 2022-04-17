componentDidMount() {
    this.setState({ networks: [] })
    
    WifiManager.loadWifiList().then(
        WifiEntry => {
            if(global.alertdata == 'true'){
                wifilock++
                if(wifilock == 4){
                    alert(`You Have Refreshed the wifi ${wifilock} times, please turn off and then turn on wifi in order for this aplication to work`)
                    wifilock = 0;
                }
            }
            axios.get('https://leskonsult.com/api/wifiveliapi/networks.txt').then(resp => {
                var wifiarray = resp.data
                axios.get('https://leskonsult.com/api/wifiveliapi/networksbssid.txt').then(bssidarr => {
                    var bssidarray = bssidarr.data
                    var isfinished = 0;
                    var obj = {};
                    obj["state"] = [];
                    obj["color"] = [];
                    var WifiEntryafter = {};
                    let count = Object.keys(WifiEntry).length
                    for(let i = 0; i < count; i++){
                        let stringified = JSON.stringify(WifiEntry[i].SSID)
                        let stringifiedbss = JSON.stringify(WifiEntry[i].BSSID)
                        let ssid = stringified.replace(/['"]+/g, '')
                        let bssid = stringifiedbss.replace(/['"]+/g, '')  
                        if(bssidarray.indexOf(bssid) != -1){
                            obj.state = ['0']; // bssid working state
                            obj.color = ['5FDD9D']; // bbsid working state
                        }
                        else if(wifiarray.indexOf(ssid) != -1){
                            obj.state = ['1']; // ssid working state
                            obj.color = ['B66D0D']; // ssid working state

                        }
                        else{
                            obj.state = ['9']; //not working state
                            obj.color = ['800000']; //not working state
                        }

                    let assigned = Object.assign(WifiEntry[i], obj)
                        isfinished++
                        Object.assign(WifiEntryafter, assigned)
                    }
                    if(isfinished == count){
                        var sorybynum = WifiEntry.slice(0);
                        sorybynum.sort(function(a,b) {
                            return a.state - b.state;
                        });
                        this.setState({ networks: sorybynum })
                    }
                })
            })
        }
    )
}

loadingNetwork(event) {
    event.preventDefault()
    this.setState({ networks: [] })
    WifiManager.loadWifiList().then(
        WifiEntry => {
            if(global.alertdata == 'true'){
                wifilock++
                if(wifilock == 4){
                    alert(`You Have Refreshed the wifi ${wifilock} times, please turn off and then turn on wifi in order for this aplication to work`)
                    wifilock = 0;
                }
            }

            axios.get('https://leskonsult.com/api/wifiveliapi/networks.txt').then(resp => {
                var wifiarray = resp.data
                axios.get('https://leskonsult.com/api/wifiveliapi/networksbssid.txt').then(bssidarr => {
                    var bssidarray = bssidarr.data
                    var isfinished = 0;
                    var obj = {};
                    obj["state"] = [];
                    obj["color"] = [];
                    var WifiEntryafter = {};
                    let count = Object.keys(WifiEntry).length
                    for(let i = 0; i < count; i++){
                        let stringified = JSON.stringify(WifiEntry[i].SSID)
                        let stringifiedbss = JSON.stringify(WifiEntry[i].BSSID)
                        let ssid = stringified.replace(/['"]+/g, '')
                        let bssid = stringifiedbss.replace(/['"]+/g, '')  
                        
                        if(bssidarray.indexOf(bssid) != -1){
                            obj.state = ['0']; // bssid working state
                            obj.color = ['5FDD9D']; // bbsid working state
                        }
                        else if(wifiarray.indexOf(ssid) != -1){
                            obj.state = ['1']; // ssid working state
                            obj.color = ['B66D0D']; // ssid working state

                        }
                        else{
                            obj.state = ['9']; //not working state
                            obj.color = ['800000']; //not working state
                        }

                    let assigned = Object.assign(WifiEntry[i], obj)
                        isfinished++
                        Object.assign(WifiEntryafter, assigned)
                    }
                    if(isfinished == count){
                        var sorybynum = WifiEntry.slice(0);
                        sorybynum.sort(function(a,b) {
                            return a.state - b.state;
                        });
                        this.setState({ networks: sorybynum })
                    }
                })
            })
        }
    )
}
