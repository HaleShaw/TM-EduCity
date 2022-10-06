// ==UserScript==
// @name               EduCity
// @name:zh-CN         希赛
// @description        Optimize the website of educity.cn.
// @description:zh-CN  希赛页面优化
// @namespace          https://github.com/HaleShaw
// @version            1.3.7
// @author             HaleShaw
// @copyright          2021+, HaleShaw (https://github.com/HaleShaw)
// @license            AGPL-3.0-or-later
// @homepage           https://github.com/HaleShaw/TM-EduCity
// @supportURL         https://github.com/HaleShaw/TM-EduCity/issues
// @downloadURL        https://github.com/HaleShaw/TM-EduCity/raw/main/EduCity.user.js
// @updateURL          https://github.com/HaleShaw/TM-EduCity/raw/main/EduCity.user.js
// @contributionURL    https://www.jianwudao.com/
// @icon               https://www.educity.cn/favicon.ico
// @match              https://www.educity.cn/wangxiao2/*
// @match              http://www.educity.cn/wangxiao2/*
// @match              https://uc.educity.cn/personalCenter/studyCenter.html
// @match              https://uc.educity.cn/tiku/testReport.html*
// @match              https://uc.educity.cn/tiku/examinationMode.html*
// @match              https://uc.educity.cn/tiku/examinationModeCopy.html*
// @match              https://wangxiao.xisaiwang.com/wangxiao2/*
// @match              https://wangxiao.xisaiwang.com/tiku2/exam*
// @match              https://wangxiao.xisaiwang.com/tiku2/ctjx*
// @compatible	       Chrome
// @grant              GM_addStyle
// @grant              GM_info
// ==/UserScript==

// ==OpenUserJS==
// @author             HaleShaw
// @collaborator       HaleShaw
// ==/OpenUserJS==

(function () {
  "use strict";

  const mainStyle = `
    /* Footer */
    .ecv2_footer {
      display: none !important;
    }
  `;

  const zhiBoStyle = `
/* 左上角标题 */
#mainVid > div.vid_head > div.vid_hleft > a:not(:last-child),

/* 右上角“返回旧版、视频课程” */
#mainVid > div.vid_head > div.vid_hright > a,

/* 离线观看 */
#mainVid > div.vid_mid > div.vid_midL > div.vid_midL_top,

/* 右侧笔记、提问 */
#mainVid > div.vid_mid > div.vid_midR > div.vid_midR_tab > div > a:nth-child(2),
#mainVid > div.vid_mid > div.vid_midR > div.vid_midR_tab > div > a:nth-child(3),

/* 鼠标混入视频时的浮标按钮“新建笔记” */
.vid_bj_new,

/* 顶部横条 */
.vid_head {
	display: none !important;
}

.vid_head .vid_hright {
  padding-top: 0 !important;
}

.vid_mid .vid_midL {
  padding: 0 !important;
}

.vid_midR_tab,
.vid_midR_tab > a,
.vid_midR_tab > a > i,
.vid_midR_tab > .vid_midR_ul,
.vid_midR_tab > .vid_midR_ul > a,
.vid_midR_tab > .vid_midR_ul > a > i,
.tabhide .vid_midR{
	width: 28px !important;
}

.tabhide .vid_mid {
  padding-right: 28px;
}
.vid_mid {
	padding-right: 439px;
}

.vid_midR {
	width: 439px;
}

.vid_tab_content {
	padding-bottom: 0;
}

/* 进度条上的时间 */
.time-span {
  margin: 0 10px;
}
`;

  const testReportStyle = `
.side.rightfixside,
.cbox,
.review,
.doPane.note,
.doPane.question,
.notes,
.advise,
.answerTitle,
.six.clearfix>span,
.pull-right.clearfix,
li.one, li.two, li.four, li.five,
.tsbody,
footer {
display: none !important;
}

.wrong,
.wrong + .clearfix.dajx,
.analysisAnswer.none,
li.one.bt{
display: block !important;
}

.tsbody {
padding: 5px 0 !important;
}

.answerEnd>span {
  color: #51cb65;
}

.answerEnd>div {
  color: #a3a3af;
  text-decoration: line-through;
}
`;

  // 错题解析
  const ctjxStyle = `
  /* 顶部图片Header */
  #accountSettingsHeader,

  /* 右上角二维码 */
  div.zt_top_right,

  /* 正确答案与错误答案选项 */
  .analysisAnswer>div.bg-fff.box-shadow.mgt10:first-child,

  /* “查看答案与解析”按钮 */
  #exeModeMsg > div.col-md-4.center.bottomCenter.bp20 > span {
    display: none !important;
  }

  /* 选项前的CheckBox */
  div.answerContentList> span.cbox {
    display: inline-block !important;
  }
  `;

  const examStyle = `
div.col-md-12 > div > div.zt_top_right,
div.doPane.note,
div.doPane.question,
div.shitiDesp.pdt15 > div.jiexinew:nth-child(3),
div.answerTitle,
#ztsetWrap > div.bg-fff.box-shadow,
#scantronWrap > div > div.dtklist > div.cbnWrap > h5,
#scantronWrap > div > div.spanExplain{
	display: none !important;
}

.right-title {
	padding: 0 20px !important;
	margin-bottom: 0px !important;
}

.zt_top_zong {
	height: 65px !important;
	background: none !important;
}

div.col-md-9 > div.bg-fff.box-shadow.mgt10.subject-content {
	background: none !important;
}

.bp20 {
	padding: 6px !important;
}

#ztsetWrap {
	margin-top: -96px !important;
}

.dtklist>.cbnWrap {
    max-height: 837px !important;
    padding: 5px 20px 0px 20px !important;
}

.col-md-3 {
    width: 19% !important;
}

.pdb20 {
    padding-bottom: 0px !important;
}

.subjectBody {
    padding-bottom: 0px !important;
}

.ISpan {
    margin-bottom: 2px !important;
    margin-right: 0 !important;
}

.pdt15 {
	padding-top: 0px !important;
}

.answerEnd {
	padding: 0 10px !important;
	margin-top: 0px !important;
}
.subject-content {
	padding: 0px 30px !important;
	background: none !important;
}
.answerWrap {
	padding: 0px 30px !important;
}

.jiexinew {
	padding: 5px 30px !important;
}

div.analysisAnswer > div.bg-fff.box-shadow.mgt10:nth-child(2) {
	padding-bottom: 0 !important;
}

.mgb20 {
	margin-bottom: 0px !important;
}
.answerList {
	padding: 0 15px !important;
}

.lh2 {
	margin-bottom: 5px !important;
}

.countTime {
	padding: 0 !important;
}
#ztsetWrap > div.bg-fff.box-shadow {
	margin-bottom: 0 !important;
}

.mgt10 {
	margin-top: 0px !important;
}

.swal-footer {
	text-align: center !important;
}

.lh2 {
	font-weight: bolder !important;
	color: #337ab7 !important;
	font-size: 1.125em !important;
}

.lh2 > span {
	display: none !important;
}
.shitiText.lh2 {
	font-weight: normal !important;
	color: #333 !important;
	font-size: 14px !important;
}

#accountSettingsHeader,
.center.answerCard,
.doPane,
.pull-right > span:not(:first-child),
.answerTitle {
	display: none !important;
}

#paperTitleWrap {
	display: none !important;
}

.center {
	margin-top: 0px !important;
	margin-bottom: 0px !important;
}

.modeTitle {
	padding-bottom: 0px !important;
}

.right-title {
	padding: 0 0 !important;
	margin-bottom: 0px !important;
}

.mgt {
	margin-top: 0px !important;
}

.subject-content {
	background: none !important;
}

header {
	height: 0px;
}

#navigation {
	height: 0px !important;
	line-height: 2rem !important;
}

.spanExplain {
	padding: 5px 20px !important;
}

.exBtn {
	margin-top: 5px !important;
}

.answerWrap {
	padding: 0px 30px !important;
}

.mgb20 {
	margin-bottom: 0px !important;
}

.singleR {
    font-size: 16px;
}
`;

  setTimeout(() => { main(); }, 1500);

  function main() {
    logInfo(GM_info.script.name, GM_info.script.version);
    GM_addStyle(mainStyle);

    let url = window.location.href;
    // 个人中心添加播放按钮
    if ("https://uc.educity.cn/personalCenter/studyCenter.html" == url) {
      updatePlayTitle();
    } else if (
      url.startsWith("https://www.educity.cn/wangxiao2") ||
      url.startsWith("http://www.educity.cn/wangxiao2") ||
      url.startsWith('https://wangxiao.xisaiwang.com/wangxiao2/')
    ) {
      // 直播回放调节播放速度
      updateSpeed();
      removeListener();
    } else if (url.startsWith("https://uc.educity.cn/tiku/testReport.html") ||
      url.startsWith("https://wangxiao.xisaiwang.com/tiku2/ctjx")) {
      // 测试报告中，自动填充答案
      GM_addStyle(testReportStyle);
      GM_addStyle(ctjxStyle);
      autoFillAnswer();
    } else if (
      url.startsWith("https://uc.educity.cn/tiku/examinationModeCopy.html") ||
      url.startsWith("https://uc.educity.cn/tiku/examinationMode.html") ||
      url.startsWith("https://wangxiao.xisaiwang.com/tiku2/exam")
    ) {
      // 添加键盘监听事件，按键答题
      GM_addStyle(examStyle);
      addKeyListener();
    }
  }

  // 个人中心，学习列表添加播放按钮，修改标题描述
  function updatePlayTitle() {
    setTimeout(function () {
      document.getElementById("loadStuWrap").lastElementChild.click();
      setTimeout(function () {
        addPlayBotton();
        adjustDes();
      }, 1000);
    }, 1500);
  }

  // 个人中心，学习列表添加播放按钮
  function addPlayBotton() {
    const urlPrefix = "https://www.educity.cn/courseCenter/zhibo.html?gsver=2&id=";
    if (document.getElementsByClassName("enterStudy")) {
      let spans = document.getElementsByClassName("enterStudy");
      console.log(spans.length);
      for (let i = 0; i < spans.length; i++) {
        let dataId = spans[i].getAttribute("data-id");
        let url = urlPrefix + dataId;
        let aEle = document.createElement("a");
        aEle.setAttribute("href", url);
        aEle.setAttribute("target", "_blank");
        aEle.innerHTML = '<i class="icon_index_login_me inline-block icon-st"> </i>';
        spans[i].parentElement.append(aEle);
        spans[i].style.display = "none";
      }
    }
  }

  // 将描述移动到标题上
  function adjustDes() {
    let titleDivs = document.querySelectorAll("div.cMenuTitle.clearfix");
    for (let i = 0; i < titleDivs.length; i++) {
      let content = "";
      let aEle = titleDivs[i].nextElementSibling.querySelector("h4.panel-title>a");
      if (aEle) {
        content = aEle.innerText;
      }
      let childEle = document.createElement("div");
      childEle.setAttribute("class", "pull-left");
      childEle.innerHTML = "<span>" + content + "</span>";
      titleDivs[i].append(childEle);
      titleDivs[i].nextElementSibling.style.display = "none";
    }
  }

  function updateSpeed() {
    GM_addStyle(zhiBoStyle);

    addRemainingTime();
    addRateButton();
    addRateListener();
    updateSideHeight();
    addPersonalCenter();
  }


  /**
   * 添加倍速按钮
   */
  function addRateButton() {
    if (!$('.pv-rate-select') || $('.pv-rate-select').length == 0) {
      return;
    }
    $('<div data-rate="4">4x</div><div data-rate="3.5">3.5x</div><div data-rate="3">3x</div><div data-rate="2.5">2.5x</div>').insertBefore($('.pv-rate-select').children().eq(0));
  }

  // 获取当前倍速
  function getCurrentRate() {
    let rate = 1.0;
    let rateEle = document.querySelector('button.pv-rate-btn>span');
    if (!rateEle) {
      return rate;
    }
    rate = rateEle.textContent.replace("x", "");

    return rate;
  }

  /**
   * 添加控制播放速度的监听事件，仅用于更新显示当前速度，速度控制通过其他通用三方脚本实现。
   */
  function addRateListener() {
    let rateEle = document.querySelector('button.pv-rate-btn>span');

    document.onkeyup = function (e) {
      var theEvent = e || window.event;
      var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
      if (code == 88) {
        // X，减速
        let rate = getCurrentRate();
        let newRate = (new Number(rate) - new Number(0.1)).toFixed(1);
        let rateStr = newRate + "x";
        rateEle.textContent = rateStr;
        updateRate(rateStr);
      }
      if (code == 67) {
        // C，加速
        let rate = getCurrentRate();
        let newRate = (new Number(rate) + new Number(0.1)).toFixed(1);
        let rateStr = newRate + "x";
        rateEle.textContent = rateStr;
        updateRate(rateStr);
      }
      if (code == 90) {
        // Z，恢复正常速度
        rateEle.textContent = "1x";
        updateRate("1x");
      }
    };
  }

  /**
   * 更新右侧边栏上的播放倍率
   * @param {String} rate 播放倍率
   */
  function updateRate(rate) {
    let rateEle = document.querySelector('span.rateRight');
    if (rateEle) {
      rateEle.textContent = rate;
    } else {
      document.querySelector('.vid_midR_tab').appendChild($(`<span class="rateRight">${rate}</span>`)[0]);
    }
  }

  /**
   * 更新右侧侧边栏高度
   */
  function updateSideHeight() {
    let sideBar = document.querySelector('.vid_midR_tab');
    if (!sideBar) {
      return;
    }
    sideBar.style.height = sideBar.parentElement.previousElementSibling.offsetHeight + 'px';
    document.querySelector('.vid_midR_wrap').style.height = sideBar.parentElement.previousElementSibling.offsetHeight + 'px';
  }

  /**
   * 添加个人中心按钮
   */
  function addPersonalCenter() {
    $('<a href="/ucenter2/personal/index.html" target="_blank">个人中心</a>').insertBefore($('.vid_midR_tab').children().eq(0));
  }

  // 自动填充答案
  function autoFillAnswer() {
    setTimeout(function show() {
      var aa = document.getElementsByClassName("chak zhank");
      var bb = document.getElementsByClassName("ckjx");
      const answers = document.getElementsByClassName("answerEnd");
      for (let i = 0; i < answers.length; i++) {
        var ans = answers[i].children[0].innerText.replace("参考答案：", "").replace(/\s+/g, "");
        var your = answers[i].children[1].innerText.replace("你的答案：", "").replace(/\s+/g, "");
        if (ans != your) {
          aa[i].click();
          bb[i].click();
          var ansId;
          let yourId;
          switch (ans) {
            case "A":
              ansId = 0;
              break;
            case "B":
              ansId = 1;
              break;
            case "C":
              ansId = 2;
              break;
            case "D":
              ansId = 3;
              break;
            default:
              console.warn("error");
              break;
          }
          switch (your) {
            case "A":
              yourId = 0;
              break;
            case "B":
              yourId = 1;
              break;
            case "C":
              yourId = 2;
              break;
            case "D":
              yourId = 3;
              break;
            default:
              console.warn("Error: There's no your answer.");
              break;
          }
          var ansList =
            answers[i].parentElement.previousElementSibling.previousElementSibling.children[0]
              .children[1].children;
          ansList[ansId].style.fontWeight = "bold";
          ansList[ansId].style.color = "#51cb65";
          ansList[ansId].children[1].style.fontWeight = "bold";
          // ansList[ansId].children[0].children[0].checked = true;
          if (yourId != undefined) {
            ansList[yourId].style.color = "rgba(128, 128, 145,0.7)";
            ansList[yourId].style.textDecoration = "line-through";
          }
        }
      }
    }, 6000);
  }

  // 添加键盘监听事件，按键答题
  function addKeyListener() {
    document.onkeyup = function (e) {
      var theEvent = e || window.event;
      var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
      // 	Spacebar. 查看答案解析
      if (code == 32) {
        document.getElementsByClassName("col-md-4 center bottomCenter bp20")[0].click();
      }
      // Left Arrow.
      if (code == 37) {
        document.getElementsByClassName("col-md-4 center bp20 bLeftWrap")[0].click();
      }
      // Right Arrow.
      if (code == 39) {
        document.getElementsByClassName("col-md-4 center bp20 bRightWrap")[0].click();
      }
      // A,1.
      if (code == 49 || code == 65 || code == 97) {
        document.getElementById("slec0A").click();
      }
      // B,2.
      if (code == 50 || code == 66 || code == 98) {
        document.getElementById("slec0B").click();
      }
      // C,3.
      if (code == 51 || code == 67 || code == 99) {
        document.getElementById("slec0C").click();
      }
      // D,4.
      if (code == 52 || code == 68 || code == 100) {
        document.getElementById("slec0D").click();
      }
      // J. 标记
      if (code == 74 && document.getElementsByClassName("bj_icon addBiaoji")[0]) {
        document.getElementsByClassName("bj_icon addBiaoji")[0].click();
        setTimeout(function () {
          if (document.getElementsByClassName("swal-button swal-button--confirm")[0]) {
            document.getElementsByClassName("swal-button swal-button--confirm")[0].click();
            document.getElementsByClassName("col-md-4 center bp20 bRightWrap")[0].click();
          }
        }, 300);
      }
      // P.暂停
      if (code == 80 && document.getElementsByClassName("inline-block zanTing")[0]) {
        document.getElementsByClassName("inline-block zanTing")[0].click();
      }
    };
  }

  // ---------------------------------------------------
  // 添加剩余时间
  function addRemainingTime() {
    document.querySelector(".pv-time-current").addEventListener(
      "DOMSubtreeModified",
      function () {
        let remainingSeconds = getRemainingSeconds();
        let remainingTime = remainingSeconds > 0 ? formatSeconds(remainingSeconds) : "";
        let realRemainingSeconds = (new Number(remainingSeconds) / new Number(getCurrentRate())).toFixed(0);
        let realRemainingTime = formatSeconds(realRemainingSeconds);
        let overTime = getOverTime(realRemainingSeconds);

        let currentEle = document.querySelector('.pv-time-current');
        if (currentEle) {
          let parent = currentEle.parentElement;

          let remainingTimeSpan = document.querySelector('.pv-time-remaining.time-span');
          if (!remainingTimeSpan) {
            remainingTimeSpan = document.createElement("span");
            remainingTimeSpan.setAttribute("class", "pv-time-remaining time-span");
            parent.append(remainingTimeSpan);
          }
          remainingTimeSpan.textContent = '剩余时间：' + remainingTime;

          let realRemainingTimeSpan = document.querySelector('.pv-time-remaining-real.time-span');
          if (!realRemainingTimeSpan) {
            realRemainingTimeSpan = document.createElement("span");
            realRemainingTimeSpan.setAttribute("class", "pv-time-remaining-real time-span");
            parent.append(realRemainingTimeSpan);
          }
          realRemainingTimeSpan.textContent = '真实剩余时间：' + realRemainingTime;

          let overTimeSpan = document.querySelector('.pv-time-over.time-span');
          if (!overTimeSpan) {
            overTimeSpan = document.createElement("span");
            overTimeSpan.setAttribute("class", "pv-time-over time-span");
            parent.append(overTimeSpan);
          }
          overTimeSpan.textContent = '结束时间：' + overTime;
        }
        document.querySelector('.pv-video-wrap').nextElementSibling.setAttribute("class", "pv-skin-blue pv-video-bottom pv-subtitle-hide pv-show-fullscreen-page pv-base-control pv-first-h pv-first-hh");
      },
      false
    );
  }

  // 获取当前时间
  function getNowSeconds() {
    let nowSeconds = 0;
    let currentEle = document.querySelector('.pv-time-current');
    if (!currentEle) {
      return nowSeconds;
    }

    let nowTime = currentEle.textContent;
    let nowArr = nowTime.split(":");
    if (nowArr.length == 2) {
      nowSeconds = parseInt(nowArr[0]) * 60 + parseInt(nowArr[1]);
    } else if (nowArr.length == 3) {
      nowSeconds = parseInt(nowArr[0]) * 60 * 60 + parseInt(nowArr[1]) * 60 + parseInt(nowArr[2]);
    }

    return nowSeconds;
  }

  // 获取总时长
  function getAllSeconds() {
    let allSeconds = 0;
    let durationEle = document.querySelector(".pv-time-duration");
    if (!durationEle) {
      return allSeconds;
    }

    let allTime = durationEle.textContent;
    let allArr = allTime.split(":");
    if (allArr.length == 2) {
      allSeconds = parseInt(allArr[0]) * 60 + parseInt(allArr[1]);
    } else if (allArr.length == 3) {
      allSeconds = parseInt(allArr[0] * 60 * 60) + parseInt(allArr[1]) * 60 + parseInt(allArr[2]);
    }

    return allSeconds;
  }

  // 获取剩余时间
  function getRemainingSeconds() {
    let allSeconds = getAllSeconds();
    let nowSeconds = getNowSeconds();
    return allSeconds - nowSeconds;
  }

  // 获取结束时间
  function getOverTime(seconds) {
    let timestamp = new Date().getTime() + seconds * 1000;
    return dateFormat('HH:MM:SS', new Date(timestamp));
  }

  // 将秒格式化为时间格式
  function formatSeconds(value) {
    let result = parseInt(value);
    let h =
      Math.floor(result / 3600) < 10 ? "0" + Math.floor(result / 3600) : Math.floor(result / 3600);
    let m =
      Math.floor((result / 60) % 60) < 10
        ? "0" + Math.floor((result / 60) % 60)
        : Math.floor((result / 60) % 60);
    let s = Math.floor(result % 60) < 10 ? "0" + Math.floor(result % 60) : Math.floor(result % 60);

    let res = "";
    if (h !== "00") res += `${h}:`;
    if (m !== "00") res += `${m}:`;
    res += `${s}`;
    return res;
  }

  /**
   * Format date.
   * @param fmt format standard.
   * @param date date.
   * @returns {Time formatted string}
   */
  function dateFormat(fmt, date) {
    let ret;
    let opt = {
      'Y+': date.getFullYear().toString(),
      'm+': (date.getMonth() + 1).toString(),
      'd+': date.getDate().toString(),
      'H+': date.getHours().toString(),
      'M+': date.getMinutes().toString(),
      'S+': date.getSeconds().toString()
    };
    for (let k in opt) {
      ret = new RegExp('(' + k + ')').exec(fmt);
      if (ret) {
        fmt = fmt.replace(
          ret[1],
          ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
        );
      }
    }
    return fmt;
  }

  /**
   * Log the title and version at the front of the console.
   * @param {String} title title.
   * @param {String} version script version.
   */
  function logInfo(title, version) {
    console.clear();
    const titleStyle = 'color:white;background-color:#606060';
    const versionStyle = 'color:white;background-color:#1475b2';
    const logTitle = ' ' + title + ' ';
    const logVersion = ' ' + version + ' ';
    console.log('%c' + logTitle + '%c' + logVersion, titleStyle, versionStyle);
  }
})();
