// 自动填写 安装向导
const user = "admin";
const password = "Admin123";
const gateway_addr = "192.168.117.1";

const rasServer = "192.168.117.133"
const jiraServer = "jira.dev-rs.com"
const licenseTestServer = "lm-test.dev-rs.com"
// const testWebdriver = "10.10.69.130"

var currentHost = window.location.host;
var currentPath = window.location.pathname;

if (currentHost.includes(rasServer) && currentPath.includes('/wizard/wizard_home/')) {
    // 故意不处理异常，以便程序自动停止。因为contentscript没有return
    document.getElementsByName("startBtn")[0].click();
    document.getElementsByName("next")[0].click();

    var event = new Event('input', {
        bubbles: true,
        cancelable: true,
    });

    document.getElementsByName("default_gateway")[0].value = gateway_addr;
    document.getElementsByName("default_gateway")[0].dispatchEvent(event);
    // next
    document.getElementsByName("next")[0].click();

    // set password
    setTimeout(function () {
        document.getElementsByName("cluster_password")[0].value = password;
        document.getElementsByName("cluster_password")[0].dispatchEvent(event);
        document.getElementsByName("cluster_password_confirm")[0].value = password;
        document.getElementsByName("cluster_password_confirm")[0].dispatchEvent(event);

        //apply
        document.getElementsByName("next")[0].click();

    },
        500);
}

if (currentHost.includes(rasServer) && currentPath.includes("/user/login/")) {
    var event = new Event('input', {
        bubbles: true,
        cancelable: true,
    });

    document.getElementsByName("username")[0].value = user;
    document.getElementsByName("username")[0].dispatchEvent(event);

    document.getElementsByName("password")[0].value = password;
    document.getElementsByName("password")[0].dispatchEvent(event);

    document.querySelectorAll('[rsid="bt_login"]')[0].click();
}

if (currentHost.includes(jiraServer)) {
    if (currentPath.includes("/login.jsp")) {
        chrome.runtime.sendMessage("getpd", function (response) {
            if (response) {
                $("#login-form-username").val("matt_ma");
                $("#login-form-password").val(response);
                $("#login-form-submit").click();
            }
        })
    } else {
        var element = document.querySelector(".login-link");
        if (element) {
            element.click();
        }
    }
}

// 半自动填写test licence创建form
if (currentHost.includes(licenseTestServer)) {
    if (currentPath.includes("/account/login")) {
        $("#id_username").val("test");
        $("#id_password").val("Riversec@cd");
        $("#submit-id-submit").click();
    } else if (currentPath.includes("/license_admin/license/create")) {
        // slow page response
        setTimeout(function () {
            document.querySelector("#div_id_customer > div > div > div > ul > li:nth-child(2) > a").click();
            document.querySelector("#div_id_sku > div > div > div > ul > li:nth-child(16) > a").click();
            $("#id_cluster").val("1");
        }, 500);
    } else if (currentPath.includes("/license_admin/license")) {
        // slow page response
        setTimeout(function () {
            document.querySelector("body > div.container-fluid > div > div.col-sm-9.col-sm-offset-3.col-md-10.col-md-offset-2.main > div.form-row > div > div:nth-child(2) > button").click();
        }, 500);
    } else {

    }
} 