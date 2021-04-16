(function() {
    const stageElem = document.querySelector('.stage');
    // 현재 활성화된 아이템을 저장
    let currentItem;

    //활성화
    function activate(elem) {
        elem.classList.add('door_opened');
        currentItem = elem;
    }

    //비활성화
    function inactivate(elem) {
        elem.classList.remove('door_opened');
    }

    function doorHandler(e) {
        const targetElem = e.target;        

        if (currentItem) {
            inactivate(currentItem);
        }
        
        if (targetElem.classList.contains('door_body')){
            activate(targetElem.parentNode);
        }
    }

    stageElem.addEventListener('click', doorHandler)

    //몇 번째 문이 열린채 시작 가능
    activate(document.querySelector('.door:nth-child(2)'));
})();