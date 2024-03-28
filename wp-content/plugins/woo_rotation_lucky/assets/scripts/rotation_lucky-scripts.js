const _hiddenClassVongQuay = 'd-none';
const _activeClassVongQuay = 'active';

function openLowerModal(id) {
  const modalOverlay = document.querySelector('.overlay');
  const modalLowerLevel = document.querySelector(`.modal-lower-level-${id}`);

  modalOverlay.classList.remove(_hiddenClassVongQuay);
  modalLowerLevel.classList.remove(_hiddenClassVongQuay);
}

function closeLowerModal(id) {
  const modalOverlay = document.querySelector('.overlay');
  const modalLowerLevel = document.querySelector(`.modal-lower-level-${id}`);
  const lvName = document.querySelectorAll('.level-name');
  const trLv1 = document.querySelectorAll('.parent-lv1');
  const trLv2 = document.querySelectorAll('.child-lv2');

  lvName.length && lvName.forEach((item) => {
    item.innerHTML = 'Cấp 1';
  });

  trLv1.length && trLv1.forEach((item) => {
    item.classList.remove(_hiddenClassVongQuay);
  });

  trLv2.length && trLv2.forEach((item) => {
    item.classList.add(_hiddenClassVongQuay);
  });

  modalOverlay.classList.add(_hiddenClassVongQuay);
  modalLowerLevel.classList.add(_hiddenClassVongQuay);
}

function changeUrl(tabId) {
  if (tabId == 1) {
    window.history.pushState('', '', '?page=vong-quay&paged=1&tab=setting1');
  }
  if (tabId == 2) {
    window.history.pushState('', '', '?page=vong-quay&paged=1&tab=setting2');
  }
  if (tabId == 3) {
    window.history.pushState('', '', '?page=vong-quay&paged=1&tab=setting3');
  }
  if (tabId == 4) {
    window.history.pushState('', '', '?page=vong-quay&paged=1&tab=setting4');
  }
  if (tabId == 5) {
    window.history.pushState('', '', '?page=vong-quay&paged=1&tab=setting5');
  }
}


function handleSubmit() {
  const arraySelect = ['dateFrom', 'monthFrom', 'yearFrom', 'dateTo', 'monthTo', 'yearTo'];
  const arrayTest = [];
  arraySelect.forEach((item) => {
    arrayTest.push(document.querySelector(`select[name="${item}"]`).value);
  });
  const check = arrayTest.every((item) => item !== '');

  if (check) {
    document.querySelector('.submitFilter').removeAttribute('disabled');
  } else {
    document.querySelector('.submitFilter').setAttribute('disabled', '');
  }
}

function showLevel2(userId, childId) {
  const modalLv1 = document.querySelector(`.modal-lower-level-${userId}`);
  const lvName = modalLv1.querySelector('.level-name');
  const trLv1 = modalLv1.querySelectorAll('.parent-lv1');
  const trLv2 = document.querySelectorAll(`.child-lv2-${childId}`);

  lvName.innerHTML = 'Cấp 2';
  trLv1.forEach((item) => {
    item.classList.add(_hiddenClassVongQuay);
  });
  trLv2.forEach((item) => {
    item.classList.remove(_hiddenClassVongQuay);
  });
}

function hideLevel2(userId, childId) {
  const modalLv1 = document.querySelector(`.modal-lower-level-${userId}`);
  const lvName = modalLv1.querySelector('.level-name');
  const trLv1 = modalLv1.querySelectorAll('.parent-lv1');
  const trLv2 = document.querySelectorAll(`.child-lv2-${childId}`);

  lvName.innerHTML = 'Cấp 1';
  trLv1.forEach((item) => {
    item.classList.remove(_hiddenClassVongQuay);
  });
  trLv2.forEach((item) => {
    item.classList.add(_hiddenClassVongQuay);
  });
}

function showTopCommission(id) {
  const modalLv1 = document.querySelector(`.modal-lower-level-${id}`);
  const tdCommission = modalLv1.querySelectorAll('.tdCommission');
  const lvName = modalLv1.querySelector('.level-name');

  lvName.innerHTML = 'Cấp 1';

  let max = Number(tdCommission[0].innerHTML);
  let maxTd = tdCommission[0];
  tdCommission.forEach((item) => {
    if (Number(item.innerHTML) >= max) {
      max = Number(item.innerHTML);
      maxTd = item;
    }
  });

  const trLv1 = modalLv1.querySelectorAll('.parent-lv1');
  trLv1.forEach((item) => {
    item.classList.add(_hiddenClassVongQuay);
  });
  maxTd.parentElement.classList.remove(_hiddenClassVongQuay);

  const childLv2 = modalLv1.querySelectorAll('.child-lv2');
  childLv2.forEach((item) => {
    item.classList.add(_hiddenClassVongQuay);
  });
}

function showTopIntroduce(id) {
  const modalLv1 = document.querySelector(`.modal-lower-level-${id}`);
  const tdIntroduce = modalLv1.querySelectorAll('.parent-lv1');
  let max = Number(tdIntroduce[0].getAttribute('data-number-lv2'));
  let maxTd = tdIntroduce[0];
  const lvName = modalLv1.querySelector('.level-name');

  lvName.innerHTML = 'Cấp 1';

  tdIntroduce.forEach((item) => {
    if (Number(item.getAttribute('data-number-lv2')) >= max) {
      max = Number(item.getAttribute('data-number-lv2'));
      maxTd = item;
    }
  });

  tdIntroduce.forEach((item) => {
    item.classList.add(_hiddenClassVongQuay);
  });
  maxTd.classList.remove(_hiddenClassVongQuay);

  const childLv2 = modalLv1.querySelectorAll('.child-lv2');
  childLv2.forEach((item) => {
    item.classList.add(_hiddenClassVongQuay);
  });
}

window.addEventListener('load', function() {
  /* Common */
  const removeMessageBtn = document.getElementById('remove-message');
  removeMessageBtn && removeMessageBtn.addEventListener('click', function() {
    document.getElementById('message').classList.add(hiddenClass);
  });
  /* Tabs */
  const _sPageURL = window.location.search.substring(1);
  const _params = _sPageURL.split('&');
  
  const tabSetting1 = document.getElementById('tabSetting1');
  const tabSetting2 = document.getElementById('tabSetting2');
  const tabSetting3 = document.getElementById('tabSetting3');
  const tabSetting4 = document.getElementById('tabSetting4');
  const tabSetting1Content = document.getElementById('tab-setting-1-content');
  const tabSetting2Content = document.getElementById('tab-setting-2-content');
  const tabSetting3Content = document.getElementById('tab-setting-3-content');
  const tabSetting4Content = document.getElementById('tab-setting-4-content');

  function clickChangeTab(tabIndex) {
    const listTab = [tabSetting1, tabSetting2, tabSetting3, tabSetting4];
    const listContentTab = [tabSetting1Content, tabSetting2Content, tabSetting3Content, tabSetting4Content];
    listTab.forEach((tab, index) => {
      Number(tabIndex) === Number(index + 1) ? tab.classList.add(_activeClassVongQuay) : tab.classList.remove(_activeClassVongQuay);
    });
    listContentTab.forEach((tabContent, index) => {
      Number(tabIndex) === Number(index + 1) ? tabContent.classList.add(_activeClassVongQuay) : tabContent.classList.remove(_activeClassVongQuay);
    });
  }

  if (tabSetting1) {
    if (_params.length === 1 || _params[2].split('=')[1] === 'setting1') {
      clickChangeTab(1);
    } else if (_params[2].split('=')[1] === 'setting2') {
      clickChangeTab(2);
    } else if (_params[2].split('=')[1] === 'setting3') {
      clickChangeTab(3);
    } else if (_params[2].split('=')[1] === 'setting4') {
      clickChangeTab(4);
    }
  }
  
  const _tabs = document.querySelectorAll('ul.nav-tabs-rotation_lucky > li');
  for (i = 0; i < _tabs.length; i++) {
    _tabs[i].addEventListener('click', _switchTab);
  }

  function _switchTab(event) {
    event.preventDefault();
    document.querySelector('ul.nav-tabs-rotation_lucky li.active').classList.remove(_activeClassVongQuay);
    document.querySelector('.tab-pane-rotation_lucky.active').classList.remove(_activeClassVongQuay);
    const clickedTab = event.currentTarget;
    const anchor = event.target;
    const activePaneID = anchor.getAttribute('href');
    clickedTab.classList.add(_activeClassVongQuay);
    document.querySelector(activePaneID).classList.add(_activeClassVongQuay);
  }
});
