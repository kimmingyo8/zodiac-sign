const $sky = document.querySelector('.bg__star');

// 랜덤한 별 생성
const makeStars = () => {
  const maxSize = 3000;

  const getRandomX = () => Math.random() * maxSize;
  const getRandomY = () => Math.random() * maxSize;

  const randomRadius = () => Math.random() * 1.3 + 0.6;

  const htmlDummy = new Array(maxSize)
    .fill()
    .map(() => {
      return `<circle class='star'
      cx=${getRandomX()}
      cy=${getRandomY()}
      r=${randomRadius()}
      className="star" />`;
    })
    .join('');

  $sky.innerHTML = htmlDummy;
};

// 화면 조절 시 별 새로 위치 렌더링
window.onresize = () => {
  makeStars();
};

makeStars();
