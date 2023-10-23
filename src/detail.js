import zodiacData from '../assets/zodiacFeature.js';

const urlParams = new URLSearchParams(window.location.search);
const zodiacName = urlParams.get('zodiac');

const data = zodiacData[zodiacName];

const $h1 = document.querySelector('h1');
const $emoji = document.querySelector('.info__emoji');
const $krName = document.querySelector('.info__kr');
const $engName = document.querySelector('.info__eng');
const $date = document.querySelector('.info__day');
const $featureList = document.querySelectorAll('.content__list');
const $backBtn = document.querySelector('.back-btn');
const $shareBtn = document.querySelector('.share-btn');

const $positiveList = $featureList[0];
const $negativeList = $featureList[1];

const defaultUrl = 'https://kr-zodiac-sign.netlify.app/';

const { start, end } = data;
const range = dateRangeFormat(start, end);
const positiveTraits = data.traits.positive;
const negativeTraits = data.traits.negative;

function dateRangeFormat(start, end) {
  const range = `${start} ~ ${end}`;
  return range;
}

positiveTraits.forEach((trait) => {
  const listItem = document.createElement('li');
  listItem.textContent = `❤️  ${trait}`;
  $positiveList.appendChild(listItem);
});

negativeTraits.forEach((trait) => {
  const listItem = document.createElement('li');
  listItem.textContent = `🥲 ${trait}...`;
  $negativeList.appendChild(listItem);
});

$h1.innerText = zodiacName;
$emoji.innerText = data.emoji;
$krName.innerText = data.kr;
$engName.innerText = data.name;
$date.innerText = range;

$backBtn.addEventListener('click', () => {
  window.history.back();
});

const shareData = {
  title: '당신의 별자리 성격의 장단점을 알아봐요!',
  text: '당신의 별자리와 성격의 장단점을 알아보고, 새로운 당신의 모습을 알아보세요!',
  url: defaultUrl,
};

// share기능을 사용하지 못한다면 링크 복사 처리
$shareBtn.addEventListener('click', async () => {
  if (typeof navigator.share === 'undefined') {
    navigator.clipboard.writeText(defaultUrl);
    alert('링크가 복사되었습니다!');
  } else {
    try {
      await navigator.share(shareData);
    } catch (err) {
      alert(err);
    }
  }
});
