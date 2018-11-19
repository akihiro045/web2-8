//時間
var separate_time = function (time)
{
    var sec   = Math.floor((time / 1000) % 60);
    var min   = Math.floor((time / 1000 / 60) % 60);
    var hours = Math.floor((time / 1000 / 60 / 60) % 24);
    var days  = Math.floor(time / 1000 / 60 / 60 / 24);
    return [sec, min, hours, days];
}

var update = function()
{
    var now = new Date();
    var target = new Date(2020,7,24,0,0,0,0); 
    var diff = target.getTime() - now.getTime();
    var counter = separate_time(diff);
    document.getElementById('countdown').textContent = 
        '東京オリンピックまであと　' + 
        counter[3] + '日' + 
        counter[2] + '時間' + 
        counter[1] + '分' +
        counter[0] + '秒';
    refresh();
}

var refresh = function()
{
    setTimeout(update, 1000);
}
update();

//画面遷移
function getFileName()
{
    return window.location.href.split('/').pop();
}

var filename = getFileName();
var opt;
if (filename === 'other.html')
{
    opt = document.querySelector('option[value="other.html"]');
}
else
{
    opt = document.querySelector('option[value="index.html"]');
}
opt.select = true;

document.getElementById('form').select.onchange = function()
{
    location.href = document.getElementById('form').select.value;
}

//クッキー保存 (クッキー名、クッキーの値、クッキーの有効日数)
function setCookie(c_name, c_value, c_expirdays)
{
    //有効期限の日付
    var extime = new Date().getTime();
    var cltime = new Date(extime + (60 * 60 * 1000 * c_expirdays));
    var exdate = cltime.toUTCString();

    //クッキーに保存する文字列を作成
    var s = "";
    s += c_name + "=" + escape(c_value);    //値はエンコードしておく
    s += "; path =" + exdate + "; ";
    if (c_expirdays)
    {
        s += "; expires =" + exdate + "; ";
    }
    else
    {
        s += "; ";
    }

    //クッキーに保存
    document.cookie = s;
}

//クッキーの値を取得
function getCookie(c_name)
{
    var st = "";
    var ed = "";

    if (0 < document.cookie.length)
    {
        //クッキーの値を取り出す
        st = document.cookie.indexOf(c_name + "=");

        if (st != -1)
        {
            st = st + c_name.length + 1;
            ed = document.cookie.indexOf(";", st);
            if (ed == -1) ed = document.cookie.length;

            //値をでコードして返す
            return unescape(document.cookie.substring(st, ed));
        }
    }
    return "";
}

var last_date = getCookie('lastDate');
if (last_date)
{
    document.getElementById('cookie').textContent = '前回訪れた時間：' + last_date;
}
else
{
    document.getElementById('cookie').textContent = '初めまして';
}

var current_time = new Date();
setCookie('lastDate', current_time.toString(), 7);

document.getElementById(remove_cookie).onsubmit = function()
{
    setCookie('lastDate',"",0);
};
