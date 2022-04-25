var ispremium = false;

var usedserialkey = "";



function getCookie(name) {

    var dc = document.cookie;

    var prefix = name + "=";

    var begin = dc.indexOf("; " + prefix);

    if (begin == -1) {

        begin = dc.indexOf(prefix);

        if (begin != 0) return null;

    } else {

        begin += 2;

        var end = document.cookie.indexOf(";", begin);

        if (end == -1) {

            end = dc.length;

        }

    }

    return decodeURI(dc.substring(begin + prefix.length, end));

}





var slide1 = document.getElementById("slide1");

var mslide1 = document.getElementById("mslide1");


var mslide2 = document.getElementById("mslide2");

var mslide3 = document.getElementById("mslide3");

var mslide4 = document.getElementById("mslide4");

var login = document.getElementById("login");

var buy = document.getElementById("buy");

var msgbox = document.getElementById("msgcontainer");

var keybox = document.getElementById("serialbox");

var msgtext = document.getElementById("msgtext");

var colorcontainer = document.getElementById("colorcontainer");















function toggle(className, displayState) {

    var elements = document.getElementsByClassName(className)

    for (var i = 0; i < elements.length; i++) {

        elements[i].style.display = displayState;

    }

}





/* ids of elements needed */

var div_name = "continue_div";

var input_textarea_name = "proxy_list";

var button_name = "proxy_button";



/* Table config */

var table_id = "table_checking";

var table_class = "table table-hover";



var Rows = ["Status", "IP", "Port", "Country", "Proxy Type"];



/* Config */

var download_button = true;

var debug = false;



var span_working_id = "working_proxies";

var span_dead_id = "dead_proxies"



var api_url = "https://api.proxyscrape.com/v2/online_check.php";



/* Vars */

var proxies = [];





var DownloadBtn_Text = document.getElementById("download_btn_text").value;

var InvalidList_Text = document.getElementById("invalid_list_text").value;

var NotFinished_Text = document.getElementById("not_finished_text").value;

var CheckerStatus_Text = document.getElementById("checker_status_text").value;

var ProxyDead_Text = document.getElementById("proxy_dead_text").value;

var ProxyWorking_Text = document.getElementById("proxy_working_text").value;

var DeadProxies_Text = document.getElementById("dead_proxies_text").value;

var WorkingProxies_Text = document.getElementById("working_proxies_text").value;

var TotalProxies_Text = document.getElementById("total_proxies_text").value;



function Lang() {







    if (!DownloadBtn_Text) {

        DownloadBtn_Text = "Download Proxies";

    }



    if (!InvalidList_Text) {

        InvalidList_Text = "No proxies could be loaded. The list is invalid";

    }



    if (!NotFinished_Text) {

        NotFinished_Text = "The checker has not finished yet";

    }



    if (!CheckerStatus_Text) {

        CheckerStatus_Text = "Checker status";

    }



    if (!ProxyDead_Text) {

        ProxyDead_Text = "Dead";

    }



    if (!ProxyWorking_Text) {

        ProxyWorking_Text = "Working";

    }



    if (!DeadProxies_Text) {

        DeadProxies_Text = "Dead proxies"

    }



    if (!WorkingProxies_Text) {

        WorkingProxies_Text = "Working proxies";

    }



    if (!TotalProxies_Text) {

        TotalProxies_Text = "Total proxies";

    }



}



function DebugLog(log) {

    if (debug) {



        console.log("[EzProxy.js] " + log);

    }

    return;

}



function ErrorMsg(msg) {

    try {



        var error_msg_ = document.getElementById("error_msg");



        if (error_msg) {

            error_msg_.remove();

        }



        DebugLog("Ups! Creating a error message...");



        var error_msg = document.createElement("div");

        error_msg.className = "alert aler-dismissible alert-danger";

        error_msg.innerHTML = "<strong>Error</strong> " + msg;

        error_msg.id = "error_msg";



        document.getElementById(div_name).appendChild(error_msg);



        DebugLog("Done!");



    } catch (err) {

        DebugLog("An error ocurred (" + err.message + ")");

    }

}



function UnHiddeElement(id) {

    try {

        DebugLog("Unhidding the element with id=" + id);



        document.getElementById(id).style.display = "block";



        DebugLog("Done!");



    } catch (err) {

        DebugLog("An error ocurred (" + err.message + ")");

    }

}



function HiddeElement(id) {

    try {



        DebugLog("Hidding element with id=" + id);



        document.getElementById(id).style.display = "none";



        DebugLog("Done!")



    } catch (err) {

        DebugLog("An error ocurred (" + err.message + ")")

    }

}



function DeleteItems() {

    try {



        DebugLog("Deleting the button and the input...");



        var button = document.getElementById(button_name);

        var input_textarea = document.getElementById(input_textarea_name);

        var title = document.getElementById("title");



        var error_msg = document.getElementById("error_msg");



        if (download_button) {

            HiddeElement(button_name);

        } else {

            button.remove();

        }



        title.remove();

        input_textarea.remove();;



        if (error_msg) {

            error_msg.remove();

        }



        DebugLog("Done!");

    } catch (err) {

        DebugLog("An error ocurred (" + err.message + ")");

    }



}



function AddProxy(ip, port, ix) {

    try {


        DebugLog("Adding proxy " + ip + ":" + port + " to the table");



        var table = document.getElementById(table_id);



        var tr = document.createElement("tr");
        tr.id = ip + ":" + port + "-" + ix;


        var status_td = document.createElement("td");

        var ip_td = document.createElement("td");

        var port_td = document.createElement("td");

        var country_td = document.createElement("td");

        var type_td = document.createElement("td")



        status_td.innerHTML = "<div class='proxy_loader'></div>";

        ip_td.innerText = ip;

        port_td.innerText = port;



        tr.appendChild(status_td);

        tr.appendChild(ip_td);

        tr.appendChild(port_td);

        tr.appendChild(country_td);

        tr.appendChild(type_td);



        table.appendChild(tr);

        
        DebugLog("Done!");



    } catch (err) {

        DebugLog("An error ocurred (" + err.message + ")");

    }

}



function CreateTable() {

    try {



        DebugLog("Creating the table...")



        if (document.getElementById(table_id)) {

            return;

        }



        var new_table = document.createElement("table");

        new_table.id = table_id;

        new_table.className = table_class;



        document.getElementById(div_name).appendChild(new_table);



        var table_body = document.createElement("tbody");

        new_table.appendChild(table_body);



        var tr = document.createElement("tr");



        for (var i = 0; i < Rows.length; i++) {

            var temp_th = document.createElement("th");

            temp_th.innerText = Rows[i];

            tr.appendChild(temp_th);

        }



        table_body.appendChild(tr);



        DebugLog("Done!");



    } catch (err) {

        DebugLog("An error ocurred (" + err.message + ")");

    }

}



function Spaces(id2add, n) {

    var element = document.getElementById(id2add);

    for (var i = 0; i < n; i++) {

        var temp_br = document.createElement("br");

        element.appendChild(temp_br);

    }

}



function CreateCount() {

    try {



        var container = document.createElement("div");

        container.id = "counters";

        container.align = "left";



        document.getElementById(div_name).appendChild(container);



        var title = document.createElement("h3");

        title.innerText = CheckerStatus_Text;

        title.align = "center";



        var br_fucking_pepe = document.createElement("br");



        var listgroup = document.createElement("ul");

        listgroup.className = "list-group";



        var li_working_proxies = document.createElement("li");

        li_working_proxies.className = "list-group-item d-flex justify-content-between align-items-center";

        li_working_proxies.innerText = WorkingProxies_Text;

        var working_span = document.createElement("span");

        working_span.className = "badge badge-success badge-pill";

        working_span.id = span_working_id;

        working_span.innerText = 0;



        var li_dead_proxies = document.createElement("li");

        li_dead_proxies.className = "list-group-item d-flex justify-content-between align-items-center";

        li_dead_proxies.innerText = DeadProxies_Text;

        var dead_span = document.createElement("span");

        dead_span.id = span_dead_id;

        dead_span.className = "badge badge-danger badge-pill";

        dead_span.innerText = 0;



        var li_total_proxies = document.createElement("li");

        li_total_proxies.className = "list-group-item d-flex justify-content-between align-items-center";

        li_total_proxies.innerText = TotalProxies_Text;

        var total_span = document.createElement("span");

        total_span.className = "badge badge-secondary badge-pill";

        total_span.innerText = proxies.length;



        container.appendChild(title);

        container.appendChild(br_fucking_pepe);

        container.appendChild(listgroup);

        listgroup.appendChild(li_working_proxies);

        li_working_proxies.appendChild(working_span);

        listgroup.appendChild(li_dead_proxies);

        li_dead_proxies.appendChild(dead_span);

        listgroup.appendChild(li_total_proxies);

        li_total_proxies.appendChild(total_span);

        Spaces(container.id, 2)



    } catch (err) {

        DebugLog("An error ocurred (" + err.message + ")");

    }

}



function ApiRequest(ip) {

    try {



        var Data = new FormData();
        ip.forEach(i => {
            Data.append("ip_addr[]", i);
        });

        // Data.append("port", port.replace(" ", ""));



        fetch(api_url, {

            method: 'post',

            body: Data,

        }).then(function (response) {

            if (response.status == 200) {

                try {

                    response.json().then(function (data) {
                        data.forEach((response_json, rx) => {
                            setTimeout(() => {
                                // AddProxy(response_json["ip"], response_json["port"], rx);
                                const row = document.getElementById(response_json["ip"] + ":" + response_json["port"] + "-" + response_json["ind"]);
                                if (response_json["country"]) {

                                    if (response_json["country"] == "") {

                                        row.cells[3].innerHTML = "Unknown";

                                    } else {

                                        row.cells[3].innerHTML = '<img src="https://www.countryflags.io/' + response_json["country"] + '/flat/16.png">';

                                    }

                                } else {

                                    row.cells[3].innerHTML = "Unknown";

                                }



                                if (response_json["msg"]) {

                                    row.cells[0].innerHTML = ProxyDead_Text;

                                    row.cells[3].innerHTML = response_json["country"];

                                    row.cells[4].innerText = response_json["msg"];

                                    row.className = "table-danger";

                                    Increment(span_dead_id);

                                    return;

                                }



                                if (response_json["working"] == "rate_limit") {

                                    row.cells[0].innerHTML = "Rate Limit";

                                    row.cells[4].innerText = "Unknown";

                                    row.className = "table-warning";

                                    Increment(span_dead_id);

                                }



                                if (response_json["working"]) {

                                    row.cells[0].innerHTML = ProxyWorking_Text;

                                    row.cells[4].innerText = response_json["type"];

                                    row.className = "table-success";

                                    Increment(span_working_id);

                                    return;

                                } else {

                                    row.cells[0].innerHTML = ProxyDead_Text;

                                    row.cells[4].innerText = "Unknown";

                                    row.className = "table-danger";

                                    Increment(span_dead_id);

                                    return;

                                }
                            }, (Math.random() * 10) * 1000);
                        });

                    });

                } catch (err) {

                    console.log("An error ocurred (" + err.message + ")");

                    row.cells[0].innerHTML = ProxyDead_Text;

                    row.cells[3].innerHTML = "Unknown";

                    row.cells[4].innerText = "Unknown";

                    row.className = "table-danger";

                    Increment(span_dead_id);

                    return;

                }



            } else if (response.status == 500) {

                console.log("An error ocurred (" + err.message + ")");

                row.cells[0].innerHTML = ProxyDead_Text;

                row.cells[3].innerHTML = "Unknown";

                row.cells[4].innerText = "Unknown";

                row.className = "table-danger";

                Increment(span_dead_id);

                return;

            }

        });





    } catch (err) {

        if (err) {

            console.log("An error ocurred (" + err.message + ")");

        }

        row.cells[0].innerHTML = "Dead";

        row.cells[3].innerHTML = "Unknown";

        row.cells[4].innerText = "Unknown";

        row.className = "table-danger";

        Increment(span_dead_id);

        return;

    }

}



function Increment(span_id) {

    var span = document.getElementById(span_id);

    span.innerText = parseInt(span.innerText) + 1;

}



function CheckTable() {

    try {



        DebugLog("Checking all the table...");



        var table = document.getElementById(table_id);



        var rows = table.rows;



        // for (var i = 1; i < rows.length; i++) {

        //     IP = rows[i].cells[1];

        //     Port = rows[i].cells[2];






        // }
        const IP = [];
        for (let i = 0; i < proxies.length; i++) {
            const el = proxies[i];
            IP.push(el[0] + ':' + el[1] + "-" + i);

        }
        ApiRequest(IP);



        DebugLog("Done! All finished");



    } catch (err) {

        DebugLog("An error ocurred (" + err.message + ")");

    }

}



function AddAllProxies() {

    try {



        DebugLog("Adding " + proxies.length + " proxies...");



        for (var i = 0; i < proxies.length; i++) {

            AddProxy(proxies[i][0], proxies[i][1], i);

        }



        DebugLog("Done!")



    } catch (err) {

        DebugLog("An error ocurred (" + err.message + ")");

    }

}



function CheckStruct(ip, port) {

    if (ip.split(".").length < 4) {

        return false;

    }

    if (port === parseInt(port, 10)) {

        return true;

    } else {

        return false;

    }

}



function LoadList() {

    try {



        DebugLog("Loading your list...");



        var input = document.getElementById(input_textarea_name);



        if (input) {

            var data = input.value;

            var lines = data.replace(/ /g, '').split("\n");



            if (lines.length == 0) {

                ErrorMsg(InvalidList_Text);

                return false;

            }







            for (var i = 0; i < lines.length; i++) {

                var pr = lines[i];

                var line = pr.split(":");



                if (i > 499) {

                    continue;

                }



                if (line.length < 2) {

                    continue;

                }



                proxies.push([line[0], line[1]]);



            }



            if (proxies.length < 1) {

                ErrorMsg(InvalidList_Text);

                return false;

            }



            DebugLog("Done!");



            return true;

        }



        return false;



    } catch (err) {

        DebugLog("An error ocurred (" + err.message + ")");

        return false;

    }

}



function DownloadBtn() {



    try {



        DebugLog("Creating the download button...");



        document.getElementById(button_name).style.display = "inline";



        var button = document.getElementById(button_name);



        if (button) {



            button.onclick = function () {

                DownloadFile("checked_proxies.txt");

            };



            button.innerHTML = DownloadBtn_Text;



            DebugLog("Done!");



        } else {

            DebugLog("An error ocurred in DownloadBtn (404)");

        }



    } catch (err) {

        DebugLog("An error ocurred (" + err.message + ")");

    }



}



function DownloadFile(filename) {

    try {



        DebugLog("Generating download....");



        if (document.getElementById("error_msg")) {

            document.getElementById("error_msg").remove();

        }



        var error = false;



        var string = "";



        var table = document.getElementById(table_id);



        var rows = table.rows;



        for (var i = 1; i < rows.length; i++) {

            var class_name = rows[i].className;

            if (class_name == "table-success") {

                string += "" + rows[i].cells[1].innerText + ":" + rows[i].cells[2].innerText + "\r\n";

            } else if (class_name == "") {

                error = true;

                console.log(i);

                break;

            }

        }



        if (error) {

            ErrorMsg("The checker has not finished");

            return;

        }



        var temp_element = document.createElement("a");



        temp_element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(string));

        temp_element.setAttribute('download', filename);



        temp_element.style.display = 'none';



        document.body.appendChild(temp_element);

        temp_element.click();



        document.body.removeChild(temp_element);



        DebugLog("Done!");



        location.reload();



    } catch (err) {

        DebugLog("An error ocurred (" + err.message + ")");

    }

}



function StartCheck() {


    Lang()

    if (LoadList()) {

        DeleteItems();

        CreateCount();

        CreateTable();

        AddAllProxies();

        CheckTable();

        DownloadBtn();

    }

}
