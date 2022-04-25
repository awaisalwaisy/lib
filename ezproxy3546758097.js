/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* ids of elements needed */

console.log('hey');

const div_name = 'continue_div';

const input_textarea_name = 'proxy_list';

const button_name = 'proxy_button';

/* Table config */

const table_id = 'table_checking';

const table_class = 'table table-hover';

const Rows = ['Status', 'IP', 'Port', 'Country', 'Proxy Type'];

/* Config */

const download_button = true;

const debug = false;

const span_working_id = 'working_proxies';

const span_dead_id = 'dead_proxies';

const api_url = 'https://api.proxyscrape.com/v2/online_check.php';

/* Vars */

const proxies = [];

let DownloadBtn_Text = document.getElementById('download_btn_text').value;

let InvalidList_Text = document.getElementById('invalid_list_text').value;

let NotFinished_Text = document.getElementById('not_finished_text').value;

let CheckerStatus_Text = document.getElementById('checker_status_text').value;

let ProxyDead_Text = document.getElementById('proxy_dead_text').value;

let ProxyWorking_Text = document.getElementById('proxy_working_text').value;

let DeadProxies_Text = document.getElementById('dead_proxies_text').value;

let WorkingProxies_Text = document.getElementById('working_proxies_text').value;

let TotalProxies_Text = document.getElementById('total_proxies_text').value;

function Lang() {
  if (!DownloadBtn_Text) {
    DownloadBtn_Text = 'Download Proxies';
  }

  if (!InvalidList_Text) {
    InvalidList_Text = 'No proxies could be loaded. The list is invalid';
  }

  if (!NotFinished_Text) {
    NotFinished_Text = 'The checker has not finished yet';
  }

  if (!CheckerStatus_Text) {
    CheckerStatus_Text = 'Checker status';
  }

  if (!ProxyDead_Text) {
    ProxyDead_Text = 'Dead';
  }

  if (!ProxyWorking_Text) {
    ProxyWorking_Text = 'Working';
  }

  if (!DeadProxies_Text) {
    DeadProxies_Text = 'Dead proxies';
  }

  if (!WorkingProxies_Text) {
    WorkingProxies_Text = 'Working proxies';
  }

  if (!TotalProxies_Text) {
    TotalProxies_Text = 'Total proxies';
  }
}

function DebugLog(log) {
  if (debug) {
    console.log(`[EzProxy.js] ${log}`);
  }
}

function ErrorMsg(msg) {
  try {
    const error_msg_ = document.getElementById('error_msg');
    const error_msg = document.createElement('div');

    if (error_msg) {
      error_msg_.remove();
    }
    DebugLog('Ups! Creating a error message...');
    error_msg.className = 'alert aler-dismissible alert-danger';

    error_msg.innerHTML = `<strong>Error</strong> ${msg}`;

    error_msg.id = 'error_msg';

    document.getElementById(div_name).appendChild(error_msg);

    DebugLog('Done!');
  } catch (err) {
    DebugLog(`An error ocurred (${err.message})`);
  }
}

/* function UnHiddeElement(id) {
  try {
    DebugLog(`Unhidding the element with id=${id}`);

    document.getElementById(id).style.display = 'block';

    DebugLog('Done!');
  } catch (err) {
    DebugLog(`An error ocurred (${err.message})`);
  }
} */

function HiddeElement(id) {
  try {
    DebugLog(`Hidding element with id=${id}`);

    document.getElementById(id).style.display = 'none';

    DebugLog('Done!');
  } catch (err) {
    DebugLog(`An error ocurred (${err.message})`);
  }
}

function DeleteItems() {
  try {
    DebugLog('Deleting the button and the input...');

    const button = document.getElementById(button_name);

    const input_textarea = document.getElementById(input_textarea_name);

    const title = document.getElementById('title');

    const error_msg = document.getElementById('error_msg');

    if (download_button) {
      HiddeElement(button_name);
    } else {
      button.remove();
    }

    title.remove();

    input_textarea.remove();

    if (error_msg) {
      error_msg.remove();
    }

    DebugLog('Done!');
  } catch (err) {
    DebugLog(`An error ocurred (${err.message})`);
  }
}

function AddProxy(ip, port, ix) {
  try {
    DebugLog(`Adding proxy ${ip}:${port} to the table`);

    const table = document.getElementById(table_id);

    const tr = document.createElement('tr');
    tr.id = `${ip}:${port}-${ix}`;

    const status_td = document.createElement('td');

    const ip_td = document.createElement('td');

    const port_td = document.createElement('td');

    const country_td = document.createElement('td');

    const type_td = document.createElement('td');

    status_td.innerHTML = "<div class='proxy_loader'></div>";

    ip_td.innerText = ip;

    port_td.innerText = port;

    tr.appendChild(status_td);

    tr.appendChild(ip_td);

    tr.appendChild(port_td);

    tr.appendChild(country_td);

    tr.appendChild(type_td);

    table.appendChild(tr);

    DebugLog('Done!');
  } catch (err) {
    DebugLog(`An error ocurred (${err.message})`);
  }
}

function CreateTable() {
  try {
    DebugLog('Creating the table...');

    if (document.getElementById(table_id)) {
      return;
    }

    const new_table = document.createElement('table');

    new_table.id = table_id;

    new_table.className = table_class;

    document.getElementById(div_name).appendChild(new_table);

    const table_body = document.createElement('tbody');

    new_table.appendChild(table_body);

    const tr = document.createElement('tr');

    for (let i = 0; i < Rows.length; i++) {
      const temp_th = document.createElement('th');

      temp_th.innerText = Rows[i];

      tr.appendChild(temp_th);
    }

    table_body.appendChild(tr);

    DebugLog('Done!');
  } catch (err) {
    DebugLog(`An error ocurred (${err.message})`);
  }
}

function Spaces(id2add, n) {
  const element = document.getElementById(id2add);

  for (let i = 0; i < n; i++) {
    const temp_br = document.createElement('br');

    element.appendChild(temp_br);
  }
}

function CreateCount() {
  try {
    const container = document.createElement('div');

    container.id = 'counters';

    container.align = 'left';

    document.getElementById(div_name).appendChild(container);

    const title = document.createElement('h3');

    title.innerText = CheckerStatus_Text;

    title.align = 'center';

    const br_fucking_pepe = document.createElement('br');

    const listgroup = document.createElement('ul');

    listgroup.className = 'list-group';

    const li_working_proxies = document.createElement('li');

    li_working_proxies.className = 'list-group-item d-flex justify-content-between align-items-center';

    li_working_proxies.innerText = WorkingProxies_Text;

    const working_span = document.createElement('span');

    working_span.className = 'badge badge-success badge-pill';

    working_span.id = span_working_id;

    working_span.innerText = 0;

    const li_dead_proxies = document.createElement('li');

    li_dead_proxies.className = 'list-group-item d-flex justify-content-between align-items-center';

    li_dead_proxies.innerText = DeadProxies_Text;

    const dead_span = document.createElement('span');

    dead_span.id = span_dead_id;

    dead_span.className = 'badge badge-danger badge-pill';

    dead_span.innerText = 0;

    const li_total_proxies = document.createElement('li');

    li_total_proxies.className = 'list-group-item d-flex justify-content-between align-items-center';

    li_total_proxies.innerText = TotalProxies_Text;

    const total_span = document.createElement('span');

    total_span.className = 'badge badge-secondary badge-pill';

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

    Spaces(container.id, 2);
  } catch (err) {
    DebugLog(`An error ocurred (${err.message})`);
  }
}

function Increment(span_id) {
  const span = document.getElementById(span_id);

  span.innerText = parseInt(span.innerText) + 1;
}

function ApiRequest(ip) {
  try {
    const Data = new FormData();
    console.log(Data, 'Data');
    ip.forEach((i) => {
      console.log(i, 'i');
      Data.append('ip_addr[]', i);
      // console.log(Data.append('ip_addr[]', i), '|');
    });

    // Data.append("port", port.replace(" ", ""));

    console.log(Data, 'now Data');
    fetch(api_url, {

      method: 'post',
      body: Data,

    }).then((response) => {
      console.log(response, 'in api block -response');
      if (response.status === 200) {
        try {
          response.json().then((data) => {
            console.log(data, '***');
            data.forEach((response_json) => {
              setTimeout(() => {
                // AddProxy(response_json["ip"], response_json["port"], rx);
                const row = document.getElementById(`${response_json.ip}:${response_json.port}-${response_json.ind}`);
                if (response_json.country) {
                  if (response_json.country === '') {
                    row.cells[3].innerHTML = 'Unknown';
                  } else {
                    row.cells[3].innerHTML = `<img src="https://www.countryflags.io/${response_json.country}/flat/16.png">`;
                  }
                } else {
                  row.cells[3].innerHTML = 'Unknown';
                }

                if (response_json.msg) {
                  row.cells[0].innerHTML = ProxyDead_Text;

                  row.cells[3].innerHTML = response_json.country;

                  row.cells[4].innerText = response_json.msg;

                  row.className = 'table-danger';

                  Increment(span_dead_id);

                  return;
                }

                if (response_json.working === 'rate_limit') {
                  row.cells[0].innerHTML = 'Rate Limit';

                  row.cells[4].innerText = 'Unknown';

                  row.className = 'table-warning';

                  Increment(span_dead_id);
                }

                if (response_json.working) {
                  row.cells[0].innerHTML = ProxyWorking_Text;

                  row.cells[4].innerText = response_json.type;

                  row.className = 'table-success';

                  Increment(span_working_id);
                } else {
                  row.cells[0].innerHTML = ProxyDead_Text;

                  row.cells[4].innerText = 'Unknown';

                  row.className = 'table-danger';

                  Increment(span_dead_id);
                }
              }, (Math.random() * 10) * 1000);
            });
          });
        } catch (err) {
          console.log(`An error ocurred (${err.message})`);

          row.cells[0].innerHTML = ProxyDead_Text;

          row.cells[3].innerHTML = 'Unknown';

          row.cells[4].innerText = 'Unknown';

          row.className = 'table-danger';

          Increment(span_dead_id);
        }
        // eslint-disable-next-line eqeqeq
      } else if (response.status == 500) {
        console.log(`An error ocurred (${err.message})`);

        row.cells[0].innerHTML = ProxyDead_Text;

        row.cells[3].innerHTML = 'Unknown';

        row.cells[4].innerText = 'Unknown';

        row.className = 'table-danger';

        Increment(span_dead_id);
      }
    });
  } catch (err) {
    if (err) {
      console.log(`An error ocurred (${err.message})`);
    }

    row.cells[0].innerHTML = 'Dead';

    row.cells[3].innerHTML = 'Unknown';

    row.cells[4].innerText = 'Unknown';

    row.className = 'table-danger';

    Increment(span_dead_id);
  }
}

function CheckTable() {
  try {
    DebugLog('Checking all the table...');

    const table = document.getElementById(table_id);

    const { rows } = table;

    // for (var i = 1; i < rows.length; i++) {

    //     IP = rows[i].cells[1];

    //     Port = rows[i].cells[2];

    // }
    const IP = [];
    for (let i = 0; i < proxies.length; i++) {
      const el = proxies[i];
      IP.push(`${el[0]}:${el[1]}-${i}`);
    }
    ApiRequest(IP);

    DebugLog('Done! All finished');
  } catch (err) {
    DebugLog(`An error ocurred (${err.message})`);
  }
}

function AddAllProxies() {
  try {
    DebugLog(`Adding ${proxies.length} proxies...`);

    for (let i = 0; i < proxies.length; i++) {
      AddProxy(proxies[i][0], proxies[i][1], i);
    }

    DebugLog('Done!');
  } catch (err) {
    DebugLog(`An error ocurred (${err.message})`);
  }
}

function CheckStruct(ip, port) {
  if (ip.split('.').length < 4) {
    return false;
  }

  if (port === parseInt(port, 10)) {
    return true;
  }

  return false;
}

function LoadList() {
  try {
    DebugLog('Loading your list...');

    const input = document.getElementById(input_textarea_name);

    if (input) {
      const data = input.value;

      const lines = data.replace(/ /g, '').split('\n');

      if (lines.length === 0) {
        ErrorMsg(InvalidList_Text);

        return false;
      }

      for (let i = 0; i < lines.length; i++) {
        const pr = lines[i];

        const line = pr.split(':');

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

      DebugLog('Done!');

      return true;
    }

    return false;
  } catch (err) {
    DebugLog(`An error ocurred (${err.message})`);

    return false;
  }
}

function DownloadBtn() {
  try {
    DebugLog('Creating the download button...');

    document.getElementById(button_name).style.display = 'inline';

    const button = document.getElementById(button_name);

    if (button) {
      button.onclick = function () {
        DownloadFile('checked_proxies.txt');
      };

      button.innerHTML = DownloadBtn_Text;

      DebugLog('Done!');
    } else {
      DebugLog('An error ocurred in DownloadBtn (404)');
    }
  } catch (err) {
    DebugLog(`An error ocurred (${err.message})`);
  }
}

function DownloadFile(filename) {
  try {
    DebugLog('Generating download....');

    if (document.getElementById('error_msg')) {
      document.getElementById('error_msg').remove();
    }

    let error = false;

    let string = '';

    const table = document.getElementById(table_id);

    const { rows } = table;

    for (let i = 1; i < rows.length; i++) {
      const class_name = rows[i].className;

      if (class_name == 'table-success') {
        string += `${rows[i].cells[1].innerText}:${rows[i].cells[2].innerText}\r\n`;
      } else if (class_name == '') {
        error = true;

        console.log(i);

        break;
      }
    }

    if (error) {
      ErrorMsg('The checker has not finished');

      return;
    }

    const temp_element = document.createElement('a');

    temp_element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(string)}`);

    temp_element.setAttribute('download', filename);

    temp_element.style.display = 'none';

    document.body.appendChild(temp_element);

    temp_element.click();

    document.body.removeChild(temp_element);

    DebugLog('Done!');

    location.reload();
  } catch (err) {
    DebugLog(`An error ocurred (${err.message})`);
  }
}

function StartCheck() {
  // ApiRequest();
  console.log('bye');
  Lang();

  if (LoadList()) {
    DeleteItems();

    CreateCount();

    CreateTable();

    AddAllProxies();

    CheckTable();

    DownloadBtn();
  }
}
