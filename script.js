// 이미지 경로 동적 생성 함수
function generateImagePaths(prefix, start, end, extension = 'jpg') {
    const images = [];
    for (let i = start; i <= end; i++) {
        // 3자리 숫자 포맷 (예: photo001.jpg, photo002.jpg)
        const paddedNumber = i.toString().padStart(3, '0');
        images.push(`images/${prefix}${paddedNumber}.${extension}`);
    }
    return images;
}

// 이미지 경로 배열 생성 (photo000.jpg부터 photo100.jpg까지)
const images = generateImagePaths('photo', 0, 100);

let currentPage = 0;
const leftPage = document.getElementById('leftPage');
const rightPage = document.getElementById('rightPage');
const leftImage = document.getElementById('leftImage');
const rightImage = document.getElementById('rightImage');
const pageCounter = document.getElementById('pageCounter');

function updatePages() {
    // PC 모드: 2페이지씩 보기
    if (window.innerWidth > 768) {
        leftImage.src = images[currentPage];
        rightImage.src = images[currentPage + 1] || '';
        pageCounter.textContent = `${currentPage + 1}-${currentPage + 2} / ${images.length}`;
    }
    // 모바일 모드: 1페이지씩 보기
    else {
        leftImage.src = images[currentPage];
        rightImage.src = '';
        pageCounter.textContent = `${currentPage + 1} / ${images.length}`;
    }
}

// PC 모드 페이지 이동
function pcPageNavigation(event) {
    if (window.innerWidth > 768) {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const width = rect.width;

        // 왼쪽 페이지 클릭 시 이전 페이지로
        if (event.currentTarget.id === 'leftPage' && x < width / 2 && currentPage > 0) {
            currentPage -= 2;
            updatePages();
        }
        // 오른쪽 페이지 클릭 시 다음 페이지로
        else if (event.currentTarget.id === 'rightPage' && x > width / 2 && currentPage < images.length - 2) {
            currentPage += 2;
            updatePages();
        }
    }
}

// 모바일 모드 페이지 이동
function mobilePageNavigation(event) {
    if (window.innerWidth <= 768) {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const width = rect.width;

        // 좌측 50% 클릭 시 이전 페이지로
        if (x < width / 2 && currentPage > 0) {
            currentPage--;
            updatePages();
        }
        // 우측 50% 클릭 시 다음 페이지로
        else if (x > width / 2 && currentPage < images.length - 1) {
            currentPage++;
            updatePages();
        }
    }
}

// 이벤트 리스너 추가
leftPage.addEventListener('click', pcPageNavigation);
rightPage.addEventListener('click', pcPageNavigation);
leftPage.addEventListener('click', mobilePageNavigation);

// 창 크기 변경 시 페이지 업데이트
window.addEventListener('resize', updatePages);

// 초기 페이지 로드
updatePages();