const $monthInput = document.getElementById('month');
const $dayInput = document.getElementById('day');
const $submitBtn = document.querySelector('.date-submit');

const dateToZodiacMapping = {
  '01-20~02-18': 'aquarius',
  '02-19~03-20': 'pisces',
  '03-21~04-19': 'aries',
  '04-20~05-20': 'taurus',
  '05-21~06-21': 'gemini',
  '06-22~07-22': 'cancer',
  '07-23~08-22': 'leo',
  '08-23~09-22': 'virgo',
  '09-23~10-23': 'libra',
  '10-24~11-21': 'scorpius',
  '11-22~12-21': 'sagittarius',
  '12-22~01-19': 'capricornus',
};

// date input validate
function validateInput($element, min, max) {
  $element.addEventListener('input', () => {
    let value = parseInt($element.value, 10);
    if (isNaN(value)) {
      $element.value = '';
    } else {
      $element.value = Math.max(min, Math.min(max, value));
    }
  });
}

// 알맞은 detail 페이지로 이동 로직
function getDateToZodiac(month, day) {
  for (const dateRange of Object.keys(dateToZodiacMapping)) {
    const [start, end] = dateRange.split('~');
    const [startMonth, startDay] = start.split('-');
    const [endMonth, endDay] = end.split('-');
    console.log(startMonth, month, endDay, day);

    if (
      (Number(startMonth) === month && Number(startDay) <= day) ||
      (Number(endMonth) === month && Number(endDay) >= day)
    ) {
      const zodiac = dateToZodiacMapping[dateRange];
      window.location.href = `./detail.html?zodiac=${zodiac}`;
    } else {
      console.log(`${month}-${day} 에 맞는 구간이 없습니다.`);
    }
  }
}

// 실행
validateInput($monthInput, 1, 12);
validateInput($dayInput, 1, 31);

$submitBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const $month = document.getElementById('month');
  const $day = document.getElementById('day');

  const month = parseInt($month.value, 10);
  const day = parseInt($day.value, 10);

  if (
    isNaN(month) ||
    isNaN(day) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    alert('올바른 날짜를 입력해 주세요!');
    return;
  }

  getDateToZodiac(month, day);
});
