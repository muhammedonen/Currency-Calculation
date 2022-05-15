const url =
  "https://www.akbank.com/_vti_bin/AkbankServicesSecure/FrontEndServiceSecure.svc/GetExchangeData?_=1649283941521";
var soon;
var Buy;
var Name; 

fetch("https://www.akbank.com/_vti_bin/AkbankServicesSecure/FrontEndServiceSecure.svc/GetExchangeData?_=1649283941521", {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
    "cache-control": "max-age=0",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1"
  },
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
})
  .then((res) => res.json())
  .then((response) => {
    soon = JSON.parse(response.GetExchangeDataResult);

    let html = "";
    html += `<option>Choose!!</option>`;
    soon.Currencies.forEach((element, index) => {
      html += `<option value="${index}">${element.Name}</option>`;
    });

    document.getElementById("sel").innerHTML = html;
  });

function degerGoster() {
  //değeri sıfırla
  document.getElementById("data").value = "";

  var sel = document.getElementById("sel");
  var selectkutu_value = sel.options[sel.selectedIndex].value;

  if (selectkutu_value == "Choose") {
    document.getElementById("ul").innerHTML = "";
    document.getElementById("date").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    Name = null;
    Buy = null;
    return;
  }
  Name = soon.Currencies[selectkutu_value].Name
    ? soon.Currencies[selectkutu_value].Name
    : false;
  Buy = soon.Currencies[selectkutu_value].Buy
    ? soon.Currencies[selectkutu_value].Buy
    : false;

  var date = soon.ServiceDate;

  document.getElementById("result").innerText = "";

  if (Buy) {
    document.getElementById(
      "ul"
    ).innerHTML = `<b>Seçilen Paranın Fiyatı :<br><font color="red">${Buy}</font></b>`;
    document.getElementById(
      "date"
    ).innerHTML = `<b>Güncelleme Saati :<br><font color="red">${date}</font></b>`;
  } else {
    alert("Buy yok");
  }
}

function onk() {
  var y = document.getElementById("data").value;

  if (y * 0 != 0) {
    alert("Sadece sayı girin!");
    return;
  } else if (!Buy) {
    return;
  }

  document.getElementById("result").innerHTML = `<b>${(
    y / Buy.replace(",", ".")
  ).toFixed(3)} <span style="color:purple">${Name}</span></b>`;
}
//end..
